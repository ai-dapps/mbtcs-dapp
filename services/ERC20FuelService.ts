import { ERC20_ABI } from "./ERC20_ABI";
import { GetERC20FuelContract as contractAddress } from "./etherContractConfig";
import { contractHelper } from "./serviceHelper";

export function ERC20FuelService(wallet: Wallet) {
  const _contractAddress = contractAddress(wallet.chainId);

  if (_contractAddress) {
    const helper = contractHelper(wallet, ERC20_ABI as ABI[], _contractAddress);

    function approve(_spender: string, _amount: string) {
      return helper.Send("approve", _spender, _amount);
    }
    function allowance(_owner: string, _spender: string) {
      return helper.Call("allowance", _owner, _spender);
    }
    function balanceOf(_owner: string) {
      return helper.Call("balanceOf", _owner);
    }
    function mint() {
      return helper.Send("mint", "100000000000000000000");
    }

    const contractAddress = _contractAddress;

    return {
      approve,
      allowance,
      balanceOf,
      mint,
      contractAddress,
    };
  }
}
