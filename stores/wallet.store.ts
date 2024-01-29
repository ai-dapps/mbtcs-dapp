import { ERC721Service } from "@services/ERC721Service";

import {
  etherToHex,
  getNeworkInfo,
  hexToNumber,
  weiToEther,
} from "@utils/crypto";
import { create } from "zustand";

type WalletStores = {
  wallet: Wallet;
  setWallet: () => void;
  initWallet: () => void;
};

export const WalletStore = create<WalletStores>((set, get) => ({
  wallet: {
    metamask: false,
    balance: 0,
    chainId: null,
    eoa: null,
  },
  setWallet: async () => {
    const provInfo = getNeworkInfo();
    let result = "";
    if (
      typeof window.ethereum === "undefined" ||
      !(
        window.ethereum.isMetaMask ||
        window.ethereum.providers?.find((provider: any) => provider.isMetaMask)
      )
    ) {
      const userAgent = window.navigator.userAgent;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      if (isMobile) {
        const params = {
          // url: "https://fluxxlabs.io",
          url: window.origin.split("://")[1],
          chain: "BNB",
        };
        return window.open(
          `tpdapp://open?params=${encodeURI(JSON.stringify(params))}`
        );
        // return window.open(
        //   `https://tokenpocket.github.io/applink?dappUrl=${
        //     window.origin.split("://")[1]
        //   }`
        // );
      } else {
        alert("wallet installation is required.");
        return window.open("https://metamask.io/download.html");
      }
    }

    if (provInfo) {
      const provider =
        window.ethereum.providers?.find(
          (provider: any) => provider.isMetaMask
        ) || window.ethereum;

      const param_chainId = {
        chainId: etherToHex(parseInt(provInfo?.chainId)),
      };
      const param_networkInfo = {
        ...param_chainId,
        chainName: provInfo.name,
        nativeCurrency: {
          symbol: provInfo.symbol,
          decimals: 18,
        },
        rpcUrls: [provInfo.rpc],
        blockExplorerUrls: [provInfo.explorer],
      };

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [param_chainId],
        });
      } catch {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [param_networkInfo],
        });
      }

      const eoa = await provider.request({
        method: "eth_requestAccounts",
        params: [],
      });
      result = eoa[0] as string;

      if (result !== "") {
        const wallet: Wallet = {
          metamask: true,
          chainId: provInfo.chainId,
          eoa: result,
          balance: 0,
        };

        const onDone = () => {
          set((state) => ({
            ...state,
            wallet: { ...wallet },
          }));
        };

        provider.on("accountsChanged", onDone);

        onDone();
      }
    }
  },

  initWallet: () => {
    const provider =
      window.ethereum.providers?.find((provider: any) => provider.isMetaMask) ||
      window.ethereum;

    if (provider) {
      function removeEventListener() {
        provider?.removeAllListeners();
      }
      removeEventListener();
    }
    set((state) => ({
      ...state,
      wallet: {
        metamask: false,
        chainId: null,
        eoa: null,
        balance: 0,
      },
    }));
  },
}));
