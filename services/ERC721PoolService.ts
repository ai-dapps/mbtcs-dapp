import { POOL_ABI } from "./POOL_ABI";
import { contractHelper } from "./serviceHelper";

export function ERC721PoolService(wallet: Wallet, contract: string) {
  // console.log(_contractAddress);

  const helper = contractHelper(wallet, POOL_ABI as ABI[], contract);

  const stake = (_token: string[] | number[]) => {
    return helper.Send("stake", _token);
  };
  const claimAll = (_addr: string) => {
    return helper.Send("claimAll", _addr);
  };
  const withdraw = (_token: string[] | number[]) => {
    return helper.Send("withdraw", _token);
  };
  const claimableRewards = (_addr: string) => {
    return helper.Call("claimableRewards", _addr);
  };
  const getReceiptIDsOf = (_addr: string) => {
    return helper.Call("getReceiptIDsOf", _addr);
  };
  const getReceipt = (_receipt: string) => {
    return helper.Call("getReceipt", _receipt);
  };
  const earnedRewardsOf = (_addr: string) => {
    return helper.Call("earnedRewardsOf", _addr);
  };
  const stakedTokensOf = (_addr: string) => {
    return helper.Call("stakedTokensOf", _addr);
  };
  const setFuelFee = (_fuelFee: string) => {
    return helper.Send("setFuelFee", _fuelFee);
  };
  const fuelFee = () => {
    return helper.Call("fuelFee");
  };
  const totalStakedTokensAmount = () => {
    return helper.Call("totalStakedTokensAmount");
  };
  const hashRate = (_tokenId: string | number) => {
    return helper.Call("hashRate", _tokenId);
  };
  const getClaimedRewards = (_claimer: string) =>
    helper.Call("getClaimedRewards", _claimer);

  const rewardAmount = (_token: string) => helper.Call("rewardAmount", _token);

  const startingTimestamp = () => helper.Call("startingTimestamp");
  const endingTimestamp = () => helper.Call("endingTimestamp");

  return {
    stake,
    claimAll,
    withdraw,
    claimableRewards,
    getReceiptIDsOf,
    getReceipt,
    earnedRewardsOf,
    stakedTokensOf,
    totalStakedTokensAmount,
    setFuelFee,
    fuelFee,
    hashRate,
    startingTimestamp,
    endingTimestamp,
    getClaimedRewards,
    rewardAmount,
  };
}
