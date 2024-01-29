export function GetERC20Contract(chainId: string | null) {
  switch (chainId) {
    case process.env.NEXT_PUBLIC_CHAIN_ID_TESTNET:
      return process.env.NEXT_PUBLIC_ERC20_CONTRACT_TESTNET;
    case process.env.NEXT_PUBLIC_CHAIN_ID_MAINNET:
      return process.env.NEXT_PUBLIC_ERC20_CONTRACT_MAINNET;
    default:
      console.log(`ether, not supported chain id: ${chainId}`);
  }
}
export function GetERC20FuelContract(chainId: string | null) {
  switch (chainId) {
    case process.env.NEXT_PUBLIC_CHAIN_ID_TESTNET:
      return process.env.NEXT_PUBLIC_ERC20_FUEL_CONTRACT_TESTNET;
    case process.env.NEXT_PUBLIC_CHAIN_ID_MAINNET:
      return process.env.NEXT_PUBLIC_ERC20_FUEL_CONTRACT_MAINNET;
    default:
      console.log(`ether, not supported chain id: ${chainId}`);
  }
}
export function GetERC721Contract(chainId: string | null) {
  switch (chainId) {
    case process.env.NEXT_PUBLIC_CHAIN_ID_TESTNET:
      return process.env.NEXT_PUBLIC_ERC721_CONTRACT_TESTNET;
    case process.env.NEXT_PUBLIC_CHAIN_ID_MAINNET:
      return process.env.NEXT_PUBLIC_ERC721_CONTRACT_MAINNET;
    default:
      console.log(`ether, not supported chain id: ${chainId}`);
  }
}
export function GetERC721FactoryContract(chainId: string | null) {
  switch (chainId) {
    case process.env.NEXT_PUBLIC_CHAIN_ID_TESTNET:
      return process.env.NEXT_PUBLIC_ERC721_FACTORY_TESTNET;
    case process.env.NEXT_PUBLIC_CHAIN_ID_MAINNET:
      return process.env.NEXT_PUBLIC_ERC721_FACTORY_MAINNET;
    default:
      console.log(`ether, not supported chain id: ${chainId}`);
  }
}
