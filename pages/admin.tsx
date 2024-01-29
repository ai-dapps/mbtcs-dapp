import { useEffect } from "react";
import { readyToast } from "@components/common/toastMessage";
import SectionLayout from "@components/Layout/SectionLayout";
import Image from "next/image";
import AdminWallet from "@components/admin/AdminWallet";
import AdminFactory from "@components/admin/AdminFactory";
import { useStake } from "hooks/useStake";
import { useWallet } from "hooks/useWallet";
import { useAdmin } from "hooks/useAdmin";
import AdminPool from "@components/admin/AdminPool";
import AdminERC721 from "@components/admin/AdminERC721";

const Foundation = () => {
  // useEffect(() => {
  //   readyToast();
  // }, []);
  const stake = useStake();
  const admin = useAdmin();
  const wallet = useWallet();

  useEffect(() => {
    stake.init();
    admin.init();
  }, [wallet.wallet.eoa]);

  return (
    <SectionLayout
      id="foundation"
      className="no-scroll min-h-fit overflow-visible relative bg-[#000000] bg-cover"
    >
      <div className="w-full fixed top-0 h-screen">
        <div className="w-full relative h-full">
          <Image
            src="/MBTCs/main/main_bg.webp"
            alt="background"
            objectFit="cover"
            layout="fill"
            className="opacity-25 "
          />
        </div>
      </div>
      <div className="w-full flex relative min-h-[600px] pt-24">
        <div className="flex flex-col w-full">
          <AdminWallet />
          <AdminERC721 />
          <AdminFactory />
          <AdminPool />
        </div>
      </div>
    </SectionLayout>
  );
};

export default Foundation;
