import { useState } from "react";
import { useWallet } from "./useWallet";
import { store } from "@stores";
import { ERC721Service } from "@services/ERC721Service";
import { ERC721FactoryService } from "@services/ERC721FactoryService";
import { ERC721PoolService } from "@services/ERC721PoolService";
import {
  getImageUrl,
  hexToNumber,
  maxAmount,
  setTokenInfo,
  weiToEther,
} from "@utils/crypto";
import { BigNumber, ethers } from "ethers";
import moment from "moment";
import { isBetween } from "@utils/common";
import { ERC20FuelService } from "@services/ERC20FuelService";
import { ERC20CService } from "@services/ERC20Service";

export const useStake = () => {
  const { wallet } = useWallet();
  const {
    distributions,
    stakedToken,
    stakedTokenTypes,
    unstakedToken,
    unstakedTokenTypes,
    unstakableToken,
    hashRate,
    mbtcBalance,
    fuelBalance,
    setBalance,
    setDistributions,
    setUnstakedToken,
    setHashRate,
  } = store.stake.stakeStore();
  const { execute, setExecute, loading, setLoading } = store.modal.modalStore();

  const init = async () => {
    const erc721 = ERC721Service(wallet);
    const factory = ERC721FactoryService(wallet);
    const reward = ERC20CService(wallet);
    const fuel = ERC20FuelService(wallet);
    if (erc721 && factory && reward && fuel && wallet.eoa) {
      setLoading(true);
      /* get hashRates */
      const hashRates: HashRate[] = [];
      const hashNumber = parseInt(await factory.hashCounter());
      const hashPromises = new Array(hashNumber)
        .fill(0)
        .map((_, i) => i)
        .map(
          async (index) =>
            await factory.hashRate(index.toString()).then((res: BigNumber[]) =>
              hashRates.push({
                startAt: hexToNumber(res[0]._hex),
                endAt: hexToNumber(res[1]._hex),
                hashRate: hexToNumber(res[2]._hex),
                index,
              })
            )
        );
      await Promise.all(hashPromises);

      const images = await getImageUrl(
        hashRates.sort((a, b) => a.index - b.index)
      );
      // console.log(images);
      /* get unstaked token */
      const unstakedToken: Token[] = [];
      const totalSupply = (
        (await erc721.totalSupply()) as BigNumber
      ).toNumber();
      let tempToken: BigNumber[] = [];
      const tokenNum = Math.ceil(totalSupply / 10000);

      const tokenArr = new Array(tokenNum)
        .fill(null)
        .map((_, i) => i)
        .map(
          async (index) =>
            await erc721
              .tokensOfOwnerIn(
                wallet.eoa ?? "",
                (index * 10000).toString(),
                ((index + 1) * 10000).toString()
              )
              .then((res: BigNumber[]) => (tempToken = tempToken.concat(res)))
        );

      await Promise.all(tokenArr);

      tempToken.sort((a, b) => a.toNumber() - b.toNumber());

      // const unstaked = (await erc721.tokensOfOwner(wallet.eoa)) as BigNumber[];
      console.log(tempToken);
      for (let i = 0; i < tempToken.length; i++)
        unstakedToken.push(
          setTokenInfo(hexToNumber(tempToken[i]._hex), hashRates, images)
        );

      /* get pool contract list */
      const distAmount = (await factory.getDistributionsAmount()) as BigNumber;
      const distribution: Distribution[] = [];
      const promises = new Array(hexToNumber(distAmount._hex))
        .fill(0)
        .map((_, i) => i)
        .map(async (index) => {
          if (wallet.eoa) {
            const contract = await factory.distributions(index.toString());
            const pool = ERC721PoolService(wallet, contract);
            const tvl = (await pool.totalStakedTokensAmount()) as BigNumber;
            const fuelFee = (await factory.fuelFee()) as BigNumber;

            const start = (await pool.startingTimestamp()) as BigNumber;
            const end = (await pool.endingTimestamp()) as BigNumber;

            const receiptOf = (await pool.getReceiptIDsOf(
              wallet.eoa
            )) as BigNumber[];
            console.log(receiptOf);
            const claim = (await pool.claimableRewards(
              wallet.eoa
            )) as BigNumber[];
            const claimDone = (await pool.getClaimedRewards(
              wallet.eoa
            )) as BigNumber[];
            const rewards = (await pool.rewardAmount(
              reward.contractAddress
            )) as BigNumber;

            const claimable = weiToEther(claim[0]._hex);
            const claimed = weiToEther(claimDone[0]._hex);
            const rewardAmount = weiToEther(rewards._hex);

            return distribution.push({
              contract,
              TVL: hexToNumber(tvl._hex),
              fuelFee: fuelFee.toNumber(),
              claimable,
              claimed,
              rewardAmount,
              stakedToken: [],
              receipt: receiptOf.map((x) => hexToNumber(x._hex)),
              startingTimestamp: hexToNumber(start._hex) * 1000,
              endingTimestamp: hexToNumber(end._hex) * 1000,
              index: index,
            });
          }
        });
      await Promise.all(promises);

      /* get token ids in each staking pool */
      const getEachInfo = distribution.map(async (dist, index) => {
        console.log(dist);
        if (wallet.eoa) {
          const pool = ERC721PoolService(wallet, dist.contract);
          const tokens: Token[] = [];
          const tokenIds: number[] = [];
          if (dist.receipt) {
            const tokenPromises = dist.receipt?.map(
              async (receipt) =>
                await pool
                  .getReceipt(receipt.toString())
                  .then((res: Receipt) => {
                    tokenIds.push(hexToNumber(res.tokenID._hex));
                  })
            );
            await Promise.all(tokenPromises);
          }
          console.log(tokenIds);

          for (let i = 0; i < tokenIds.length; i++)
            tokens.push(setTokenInfo(tokenIds[i], hashRates, images));

          distribution[index].stakedToken = tokens;
        }
      });

      await Promise.all(getEachInfo);
      distribution.sort((a, b) => b.index - a.index);
      const mbtc = (await reward.balanceOf(wallet.eoa)) as BigNumber;
      const fuels = (await fuel.balanceOf(wallet.eoa)) as BigNumber;
      console.log(fuels.toString());
      /* store setter */
      console.log(hashRates);
      setDistributions(
        distribution,
        hashRates.sort((a, b) => a.index - b.index)
      );
      console.log(unstakedToken);
      setUnstakedToken(unstakedToken);
      setHashRate(hashRates.sort((a, b) => a.index - b.index));
      setBalance(weiToEther(mbtc._hex), weiToEther(fuels._hex));
      setLoading(false);
    }
  };

  const getHashRates = async () => {
    const factory = ERC721FactoryService(wallet);
    if (factory && wallet.eoa) {
      /* get hashRates */
      setLoading(true);
      const hashRates: HashRate[] = [];
      const hashNumber = parseInt(await factory.hashCounter());
      console.log(hashNumber);
      const hashPromises = new Array(hashNumber)
        .fill(0)
        .map((_, i) => i)
        .map(
          async (index) =>
            await factory.hashRate(index.toString()).then((res: BigNumber[]) =>
              hashRates.push({
                startAt: hexToNumber(res[0]._hex),
                endAt: hexToNumber(res[1]._hex),
                hashRate: hexToNumber(res[2]._hex),
                index,
              })
            )
        );
      await Promise.all(hashPromises);
      const dist = [...distributions];
      console.log(dist);
      const myToken = [...unstakedToken];
      const images = await getImageUrl(hashRate);

      for (let i = 0; i < dist.length; i++) {
        dist[i].stakedToken.map((x) =>
          setTokenInfo(x.tokenId, hashRates, images)
        );
      }
      dist.sort((a, b) => b.index - a.index);
      const newMyToken = myToken.map((x) =>
        setTokenInfo(x.tokenId, hashRates, images)
      );

      setHashRate(hashRates.sort((a, b) => a.index - b.index));
      setDistributions(
        dist,
        hashRates.sort((a, b) => a.index - b.index)
      );
      console.log(newMyToken);
      // setStakedToken(dist[0].stakedToken);
      setUnstakedToken(newMyToken);
      setLoading(false);
    }
  };

  const stake = async (tokenIds: string[]) => {
    const active = distributions.filter(
      (dist) =>
        isBetween(dist.startingTimestamp, dist.endingTimestamp) === "Active"
    );
    console.log(active);
    if (active.length > 0) {
      const pool = ERC721PoolService(wallet, active[0].contract);
      const erc721 = ERC721Service(wallet);
      if (pool && erc721 && wallet.eoa) {
        try {
          setExecute("pending");
          const allowance = (await erc721.isApprovedForAll(
            wallet.eoa,
            active[0].contract
          )) as boolean;
          if (!allowance)
            await erc721.setApprovalForAll(active[0].contract, "true");
          await pool.stake(tokenIds);
          setExecute("success");
          await init();
        } catch (err) {
          console.log(err);
          setExecute("fail");
        }
      }
    } else alert("Not exists available contract.");
  };
  const unStake = async (tokenIds: string[], contract: string) => {
    const pool = ERC721PoolService(wallet, contract);
    const fuel = ERC20FuelService(wallet);
    if (pool && wallet.eoa && fuel) {
      try {
        setExecute("pending");
        const allowance = await fuel.allowance(
          wallet.eoa,
          distributions[0].contract
        );
        // console.log(parseInt(ethers.utils.formatEther(allowance)));
        if (parseInt(ethers.utils.formatEther(allowance)) < 10 ** 15)
          await fuel.approve(distributions[0].contract, maxAmount);

        await pool.withdraw(tokenIds);
        setExecute("success");
        await init();
      } catch (err) {
        console.log(err);
        setExecute("fail");
      }
    }
  };
  const claimAll = async () => {
    const pool = ERC721PoolService(wallet, distributions[0].contract);
    const fuel = ERC20FuelService(wallet);
    if (pool && fuel && wallet.eoa) {
      try {
        setExecute("pending");
        const allowance = await fuel.allowance(
          wallet.eoa,
          distributions[0].contract
        );
        // console.log(parseInt(ethers.utils.formatEther(allowance)));
        if (parseInt(ethers.utils.formatEther(allowance)) < 10 ** 15)
          await fuel.approve(distributions[0].contract, maxAmount);
        await pool.claimAll(wallet.eoa);
        setExecute("success");
        await init();
      } catch (err) {
        console.log(err);
        setExecute("fail");
      }
    }
  };

  return {
    distributions,
    stakedToken,
    unstakedToken,
    init,
    getHashRates,
    hashRate,
    stakedTokenTypes,
    unstakedTokenTypes,
    unstakableToken,
    stake,
    unStake,
    claimAll,
    mbtcBalance,
    fuelBalance,
  };
};
