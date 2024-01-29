import { useEffect } from "react";
import { readyToast } from "@components/common/toastMessage";
import SectionLayout from "@components/Layout/SectionLayout";
import Image from "next/image";
import AppNav from "@components/Layout/AppNav";

const Market = () => {
  useEffect(() => {
    readyToast();
  }, []);

  return (
    <SectionLayout
      id="market"
      className="no-scroll min-h-screen overflow-visible relative bg-[#040213] bg-cover"
    >
      <div className="w-full after:pb-[119%] flex z-[5] absolute">
        <Image
          src="/MBTCs/main/main_bg.webp"
          alt="background"
          objectFit="contain"
          layout="fill"
          unoptimized={true}
        />
      </div>
      <div className="relative z-[6] px-12 xs:px-8 2xs:px-8 pt-40 sm:pt-36 xs:pt-32 2xs:pt-32 pb-12 xs:pb-8 2xs:pb-8">
        <AppNav />
      </div>
    </SectionLayout>
  );
};

export default Market;
