import { useEffect } from "react";
import { readyToast } from "@components/common/toastMessage";
import SectionLayout from "@components/Layout/SectionLayout";
import Image from "next/image";

const Foundation = () => {
  useEffect(() => {
    readyToast();
  }, []);

  return (
    <SectionLayout
      id="foundation"
      className="no-scroll min-h-fit overflow-visible relative bg-[#040213] bg-cover"
    >
      <div className="w-full after:pb-[119%] flex relative">
        <Image
          src="/MBTCs/main/main_bg.webp"
          alt="background"
          objectFit="contain"
          layout="fill"
          unoptimized={true}
        />
      </div>
    </SectionLayout>
  );
};

export default Foundation;
