import { SocialIcons } from "@components/common/SocialIcons";
import Image from "next/image";
import { useResize } from "hooks/useResize";
import Link from "next/link";

const Footer = () => {
  const { isMobile } = useResize();
  return (
    <div className="bg-[#111111] border-transparent py-[10%] flex flex-col justify-center items-center px-10 xs:px-4 2xs:px-4">
      <Link href="/">
        <a>
          <div
            className="w-[350px] sm:w-[300px] xs:w-[200px] 2xs:w-[200px] after:pb-[20%] flex relative cursor-pointer"
            id="logo"
          >
            <Image
              src="/MBTCs/footer/footer_logo.webp"
              alt="logo"
              objectFit="contain"
              layout="fill"
            />
          </div>
        </a>
      </Link>
      <div className="w-full flex justify-around mt-[8%]">
        <SocialIcons
          size={isMobile ? 40 : 80}
          className="cursor-pointer bg-[#b3b3b3] rounded-full p-4 sm:p-2 xs:p-2 2xs:p-2 sm:scale-150 2xs:scale-75"
        />
      </div>
      <div className="mt-[8%] font-roboto text-[#b3b3b3] text-2xl xs:text-lg 2xs:text-xs text-center">
        ©Copyright MBTCs Co., Ltd. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
