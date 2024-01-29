// import Web3 from "web3";
import { ethers } from "ethers";
import { promiseWrapper } from "./serviceHelper";

export function etherService() {
  const node =
    process.env.NEXT_PUBLIC_IS_TESTNET === "TESTNET"
      ? process.env.NEXT_PUBLIC_NODE_ENDPOINT_TESTNET
      : process.env.NEXT_PUBLIC_NODE_ENDPOINT_MAINNET;

  const provider = new ethers.providers.JsonRpcProvider(
    window.ethereum.providers?.find((provider: any) => provider.isMetaMask) ||
      window.ethereum
  );

  function ViewAccountEther(eoa: string) {
    return promiseWrapper(provider.getBalance, eoa);
  }

  function ViewBlockNumber() {
    return promiseWrapper(provider.getBlockNumber);
  }

  return {
    ViewAccountEther,
    ViewBlockNumber,
  };
}
