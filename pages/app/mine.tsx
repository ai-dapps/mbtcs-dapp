import { useEffect, useState } from "react";

import Image from "next/image";
import SectionLayout from "@components/Layout/SectionLayout";
import { useResize } from "hooks/useResize";

import { GradientButton } from "@components/Layout/Gradient";

import StakeFilter from "@components/stake/StakeFilter";
import MinerFilter from "@components/stake/MinerFilter";
import AppNav from "@components/Layout/AppNav";
import { useWallet } from "hooks/useWallet";
import MineSummary from "@components/app/MineSummary";
import { useStake } from "hooks/useStake";
import NftSelectorForStaking from "@components/modal/NftSelectorForStaking";
import UnstakableFilter from "@components/stake/UnstakableFilter";

const Mine = () => {
  const { isMobile } = useResize();
  const [isWallet, setIsWallet] = useState(false);
  const [isUnstake, setIsUnstake] = useState(false);
  const [token, setToken] = useState<Token[]>([]);
  const [contract, setContract] = useState("");

  // const [stakeTokens, setStakeTokens] = useState<Token[]>(dummyTokens);
  // const [harvestTokens, setHarvestTokens] = useState<Token[]>([]);
  // const [unstakeTokens, setUnstakeTokens] = useState<Token[]>([]);

  const stake = useStake();
  const wallet = useWallet();

  const entry =
    stake.stakedTokenTypes.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    ) +
    stake.unstakableToken.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    ) +
    stake.unstakedTokenTypes.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    );

  useEffect(() => {
    if (wallet.wallet.eoa) stake.init();
  }, [wallet.wallet.eoa]);

  return (
    <>
      <SectionLayout id="mine" className="bg-[#1f1a41]">
        <NftSelectorForStaking
          isUnstake={isUnstake}
          isWallet={isWallet}
          tokenIds={token}
          setToken={setToken}
          contract={contract}
        />
        <div className="w-full after:pb-[73.6%] flex absolute z-[5]">
          <Image
            src="/MBTCs/mine/bg_coins.webp"
            alt="background"
            objectFit="contain"
            layout="fill"
            priority
          />
        </div>
        <div className="w-full font-roboto flex flex-col justify-center relative z-[6] px-12 xs:px-8 2xs:px-8 pt-32 sm:pt-28 xs:pt-24 2xs:pt-24 pb-12 xs:pb-8 2xs:pb-8">
          <div className="flex justify-between items-center my-8 xs:my-4 2xs:my-4">
            <AppNav />
            {/* <MdMenu
              size={isMobile ? 50 : 70}
              onClick={menuToggle.trigger}
              className="text-white"
            /> */}
            <div className="text-4xl xs:text-2xl 2xs:text-2xl font-extrabold py-2 xs:py-1 2xs:py-1 flex justify-center gap-2">
              <p className="text-white">My Bag :</p>
              <span className="text-[#f3ba2c]">{entry}</span>
            </div>
            <div className="w-1/12" />
          </div>
          <MineSummary />
          <div className="mt-8 sm:mt-6 xs:mt-6 flex justify-center">
            <div className="w-full px-6 xs:px-3 py-4 xs:py-3 flex justify-around rounded-full bg-black bg-opacity-40 text-white text-3xl sm:text-2xl xs:text-base 2xs:text-base">
              <div className="w-1/2" onClick={() => setIsWallet(false)}>
                <GradientButton
                  condition={!isWallet}
                  className="w-full rounded-full px-8 xs:px-6 2xs:px-6 py-6 xs:py-2 2xs:py-2"
                >
                  Staked Miners
                </GradientButton>
              </div>
              <div className="w-1/2" onClick={() => setIsWallet(true)}>
                <GradientButton
                  condition={isWallet}
                  className="w-full rounded-full px-8 xs:px-6 2xs:px-6 py-6 xs:py-2 2xs:py-2"
                >
                  Miners in Wallet
                </GradientButton>
              </div>
            </div>
          </div>
          {/* Staked Miners */}
          {!isWallet && (
            <>
              <div className="mt-6 sm:mt-4 xs:mt-4 2xs:mt-4 flex justify-center">
                <div className="w-full px-6 xs:px-3 2xs:px-3 py-4 xs:py-3 2xs:py-3 flex justify-around rounded-full bg-white bg-opacity-10 text-white text-3xl sm:text-2xl xs:text-base 2xs:text-base">
                  <button
                    className={`w-1/2 rounded-full px-8 xs:px-6 2xs:px-6 py-6 xs:py-2 2xs:py-2 ${
                      !isUnstake && "bg-[#aba6ce] text-black"
                    }`}
                    onClick={() => setIsUnstake(false)}
                  >
                    Batch Harvest
                  </button>
                  <button
                    className={`w-1/2 rounded-full px-8 xs:px-6 2xs:px-6 py-6 xs:py-2 2xs:py-2 ${
                      isUnstake && "bg-[#aba6ce] text-black"
                    }`}
                    onClick={() => setIsUnstake(true)}
                  >
                    Unstake Miners
                  </button>
                </div>
              </div>

              {/* Batch Harvest - Active 중인 Dist */}
              {!isUnstake && (
                <StakeFilter
                  tokens={stake.stakedTokenTypes}
                  setToken={setToken}
                  setContract={setContract}
                />
              )}

              {/* Unstake Miners - Ended인 Dist */}
              {isUnstake && (
                <UnstakableFilter
                  name="Unstake"
                  tokens={stake.unstakableToken}
                  setToken={setToken}
                  setContract={setContract}
                />
              )}
            </>
          )}
          {/* Miners in Wallet - 지갑에 있는 리스트 */}
          {isWallet && (
            <MinerFilter
              name="Wallet"
              tokens={stake.unstakedTokenTypes}
              setToken={setToken}
            />
          )}
        </div>
      </SectionLayout>
      <style jsx>{``}</style>
    </>
  );
};

export default Mine;
