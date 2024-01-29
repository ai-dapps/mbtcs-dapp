import { GetERC721Contract as contractAddress } from "./etherContractConfig";
import { ERC721_ABI } from "./ERC721_ABI";
import { contractHelper } from "./serviceHelper";

export function ERC721Service(wallet: Wallet) {
  const _contractAddress = contractAddress(wallet.chainId);
  // console.log(_contractAddress);
  if (_contractAddress) {
    const helper = contractHelper(
      wallet,
      ERC721_ABI as ABI[],
      _contractAddress
    );

    function setApprovalForAll(_operator: string, _approved: string) {
      return helper.Send("setApprovalForAll", _operator, _approved);
    }
    function isApprovedForAll(_owner: string, _operator: string) {
      return helper.Call("isApprovedForAll", _owner, _operator);
    }
    function tokensOfOwner(_owner: string) {
      return helper.Call("tokensOfOwner", _owner);
    }
    function tokensOfOwnerIn(_owner: string, _start: string, _end: string) {
      return helper.Call("tokensOfOwnerIn", _owner, _start, _end);
    }
    function airdrop(_to: string, _amount: string) {
      return helper.Send("airdrop", _to, _amount);
    }
    function totalSupply() {
      return helper.Call("totalSupply");
    }
    function transferFrom(_from: string, _to: string, _tokenId: string) {
      return helper.Send("transferFrom", _from, _to, _tokenId);
    }
    return {
      setApprovalForAll,
      isApprovedForAll,
      tokensOfOwner,
      airdrop,
      totalSupply,
      transferFrom,
      tokensOfOwnerIn,
    };
  }
}
