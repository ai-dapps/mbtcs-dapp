import { ERC20FuelService } from "@services/ERC20FuelService";
import { store } from "@stores";
import { useEffect } from "react";

export const useWallet = () => {
  const { wallet, setWallet, initWallet } = store.wallet.WalletStore();

  const faucet = async () => {
    if (wallet.eoa !== "") {
      const cur = ERC20FuelService(wallet);
      if (cur) {
        await cur.mint();
      }
    }
  };

  return {
    wallet,
    setWallet,
    initWallet,
    faucet,
  };
};
