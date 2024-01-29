import { FACTORY_ABI } from "./FACTORY_ABI";
import { GetERC721FactoryContract as contractAddress } from "./etherContractConfig";
import { contractHelper } from "./serviceHelper";

export function ERC721FactoryService(wallet: Wallet) {
  const _contractAddress = contractAddress(wallet.chainId);
  if (_contractAddress) {
    const helper = contractHelper(
      wallet,
      FACTORY_ABI as ABI[],
      _contractAddress
    );

    const setFuelFee = (_fuelFee: string) => {
      return helper.Send("setFuelFee", _fuelFee);
    };
    const fuelFee = () => helper.Call("fuelFee");

    const setHashRate = (
      _index: string,
      _startAt: string,
      _endAt: string,
      _hashRate: string
    ) => {
      return helper.Send("setHashRate", _index, _startAt, _endAt, _hashRate);
    };
    const hashRate = (_index: string) => {
      return helper.Call("getHashRate", _index);
    };
    const hashCounter = () => helper.Call("hashCounter");
    const distributions = (_index: string) =>
      helper.Call("distributions", _index);

    const getDistributionsAmount = () => helper.Call("getDistributionsAmount");

    const createDistribution = (
      _reward: string[],
      _stake: string,
      _fuel: string,
      _amount: string[],
      _start: string,
      _end: string,
      _locked: boolean,
      _cap: string
    ) =>
      helper.Send(
        "createDistribution",
        _reward,
        _stake,
        _fuel,
        _amount,
        _start,
        _end,
        _locked,
        _cap
      );

    return {
      setFuelFee,
      fuelFee,
      setHashRate,
      hashRate,
      hashCounter,
      distributions,
      getDistributionsAmount,
      createDistribution,
      contractAddress: _contractAddress,
    };
  }
}
