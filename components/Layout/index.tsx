// import MintModal from "@components/modal/MintModal";
// import WalletModal from "@components/modal/WalletModal";
import { ToastContainer, Slide } from "react-toastify";
import MainNav from "./MainNav";
import Footer from "./Footer";
import LoadingModal from "@components/modal/LoadingModal";
import ExecuteModal from "@components/modal/ExecuteModal";
import { store } from "@stores";
import { useEffect } from "react";

export const Layout = ({ children }: childrenProps) => {
  const { setWallet } = store.wallet.WalletStore();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const provider =
        window.ethereum.providers?.find(
          (provider: any) => provider.isMetaMask
        ) || window.ethereum;
      if (provider) {
        if (provider?.isConnected()) {
          setWallet();
        }
      }
    }
  }, []);
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        pauseOnFocusLoss={false}
        // hideProgressBar={true}
        theme="dark"
        className="font-roboto font-bold"
        transition={Slide}
      />
      <div className={`max-w-[767px] mx-auto`}>
        <MainNav />
        <LoadingModal />
        <ExecuteModal />
        {children}
        <Footer />
      </div>
      {/* <WalletModal /> */}
      {/* <MintModal /> */}
    </>
  );
};
