import { store } from "@stores";
import { useWallet } from "./useWallet";
import { ERC721FactoryService } from "@services/ERC721FactoryService";
import { etherToWei, hexToNumber, maxAmount, weiToEther } from "@utils/crypto";
import { useEffect, useState } from "react";
import { useStake } from "./useStake";
import {
  GetERC20Contract,
  GetERC20FuelContract,
  GetERC721Contract,
  GetERC721FactoryContract,
} from "@services/etherContractConfig";
import { ERC20CService } from "@services/ERC20Service";
import { BigNumber, ethers } from "ethers";
import { ERC721Service } from "@services/ERC721Service";
import moment from "moment";

const createDistInit: FactoryCreateDistProps = {
  reward: "",
  stake: "",
  fuel: "",
  amount: "",
  start: "",
  end: "",
  locked: false,
  cap: "0",
};
const airdropInit: AirdropProps = {
  to: "",
  amount: "",
};
const tranferInit: TransferFromProps = {
  from: "",
  to: "",
  tokenId: "",
};

export const useAdmin = () => {
  const [CRDinput, setCRDInput] =
    useState<FactoryCreateDistProps>(createDistInit);
  const [ADInput, setADInput] = useState<AirdropProps>(airdropInit);
  const [TRInput, setTRInput] = useState<TransferFromProps>(tranferInit);

  const { wallet } = useWallet();
  const {
    fuelFee,
    setFuelFee,
    hashCounter,
    setHashCounter,
    totalSupply,
    setTotalSupply,
  } = store.admin.adminStore();
  const stake = useStake();
  const { setExecute } = store.modal.modalStore();

  const ADInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setADInput({ ...ADInput, [name]: value });
  };
  const TRInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTRInput({ ...TRInput, [name]: value });
  };
  const CRDInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCRDInput({ ...CRDinput, [name]: value });
  };

  useEffect(() => {
    console.log(CRDinput.start);
  }, [CRDinput]);
  const init = async () => {
    const factory = ERC721FactoryService(wallet);
    const erc721 = ERC721Service(wallet);
    if (factory && erc721) {
      // setLoading(true);
      const fuel = (await factory.fuelFee()) as BigNumber;
      const hashCounter = await factory.hashCounter();
      const supply = (await erc721.totalSupply()) as BigNumber;

      setFuelFee(fuel.toNumber());
      setTotalSupply(hexToNumber(supply._hex));
      setHashCounter(parseInt(hashCounter));
      // setLoading(false);
    }
  };

  const setFuelFees = async (_fuelFee: string) => {
    const factory = ERC721FactoryService(wallet);
    if (factory) {
      setExecute("pending");
      try {
        await factory.setFuelFee(etherToWei(parseFloat(_fuelFee)));
        setExecute("success");
        setFuelFee(parseFloat(_fuelFee));
      } catch (err) {
        setExecute("fail");
        console.log(err);
      }
    }
  };

  const setHashRates = async (
    _index: string,
    _startAt: string,
    _endAt: string,
    _hashRate: string
  ) => {
    const factory = ERC721FactoryService(wallet);
    if (factory) {
      setExecute("pending");
      try {
        await factory.setHashRate(_index, _startAt, _endAt, _hashRate);

        setExecute("success");
        await stake.getHashRates();
      } catch (err) {
        setExecute("fail");
        console.log(err);
      }
    }
  };
  const createDistributions = async () => {
    const factory = ERC721FactoryService(wallet);
    const erc20 = ERC20CService(wallet);
    const fuel = GetERC20FuelContract(wallet.chainId);
    const erc721 = GetERC721Contract(wallet.chainId);
    if (factory && erc20 && fuel && erc721 && wallet.eoa) {
      setExecute("pending");
      try {
        const allowance = await erc20.allowance(
          wallet.eoa,
          factory.contractAddress
        );
        console.log(parseInt(ethers.utils.formatEther(allowance)));
        if (parseInt(ethers.utils.formatEther(allowance)) < 10 ** 15)
          await erc20.approve(factory.contractAddress, maxAmount);
        // console.log((moment(CRDinput.start).valueOf() / 1000).toFixed(0));
        // const start = moment(CRDinput.start).valueOf() / 1000).toFixed(0);
        // const end =
        // moment(CRDinput.end).valueOf() / 1000).toFixed(0),
        await factory.createDistribution(
          [erc20.contractAddress],
          erc721,
          fuel,
          [etherToWei(parseInt(CRDinput.amount))],
          (moment(CRDinput.start).valueOf() / 1000).toFixed(0),
          (moment(CRDinput.end).valueOf() / 1000).toFixed(0),
          CRDinput.locked,
          CRDinput.cap
        );
        setExecute("success");
        await stake.init();
      } catch (err) {
        setExecute("fail");
        console.log(err);
      }
    }
  };
  const nftTransfer = async () => {
    const erc721 = ERC721Service(wallet);
    if (erc721 && wallet.eoa) {
      setExecute("pending");
      try {
        await erc721.transferFrom(wallet.eoa, TRInput.to, TRInput.tokenId);
        setExecute("success");
        await init();
      } catch (err) {
        setExecute("fail");
        console.log(err);
      }
    }
  };
  const nftAirdrop = async () => {
    const erc721 = ERC721Service(wallet);
    if (erc721 && wallet.eoa) {
      setExecute("pending");
      try {
        await erc721.airdrop(ADInput.to, ADInput.amount);
        setExecute("success");
        await init();
      } catch (err) {
        setExecute("fail");
        console.log(err);
      }
    }
  };

  const factoryContract = GetERC721FactoryContract(wallet.chainId);
  const erc721Contract = GetERC721Contract(wallet.chainId);

  return {
    fuelFee,
    hashCounter,
    init,
    setHashRates,
    setFuelFees,
    createDistributions,
    CRDInputHandler,
    CRDinput,
    factoryContract,
    erc721Contract,
    adInput: ADInput,
    TRInput,
    ADInputHandler,
    TRInputHandler,
    totalSupply,
    nftTransfer,
    nftAirdrop,
  };
};
