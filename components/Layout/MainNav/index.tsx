import { useState, useEffect } from "react";
import { useFadeToggle } from "hooks/useFadeToggle";
import { mainNavbar, enterAppNavbar } from "@stores/constant";
import Image from "next/image";
import MainNavItem from "./MainNavItem";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { GradientBorder } from "../Gradient";
import { useRouter } from "next/router";
import Link from "next/link";

const MainNav = () => {
  const menuToggle = useFadeToggle(100);
  const enterAppToggle = useFadeToggle(100);

  return (
    <>
      <div
        id="nav"
        className="fixed top-0 left-1/2 -translate-x-1/2 z-[11] h-[80px] xs:h-[60px] 2xs:h-[60px] w-[767px] sm:w-full xs:w-full 2xs:w-full"
      >
        <div
          className={`${
            menuToggle.visible ? "bg-black" : "bg-[#111111]"
          } flex justify-between py-8 px-6 z-20`}
        >
          <Link href="/">
            <a>
              <div
                className="w-[300px] sm:w-[250px] xs:w-[150px] 2xs:w-[120px] after:pb-[20%] flex relative cursor-pointer"
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
          <div
            className={`block w-1/12 h-1/12 relative hamburg cursor-pointer ml-8 sm:ml-1 ${
              (menuToggle.visible && menuToggle.visibleEffect) ||
              menuToggle.visible
                ? "close"
                : ""
            }`}
            id="hamburg"
            onClick={menuToggle.trigger}
          >
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
        </div>
        {menuToggle.visible && (
          <div
            className={`fixed z-[-1] top-0 left-0 transition-opacity flex justify-center items-start w-full duration-300 bg-black bg-cover  ${
              menuToggle.visibleEffect ? "opacity-90" : "opacity-0"
            }`}
          >
            <div className="font-Gotham text-white flex-col justify-center items-center mt-24 xs:mt-16 2xs:mt-16 text-center">
              <div className="text-4xl xs:text-3xl 2xs:text-2xl font-extrabold">
                {mainNavbar.map((d, i) => {
                  return (
                    <MainNavItem
                      to={d}
                      key={d}
                      onClick={() => {
                        menuToggle.setVisible(false);
                      }}
                    />
                  );
                })}
                <div
                  className="cursor-pointer mt-12 xs:mt-10 2xs:mt-8 mb-8 xs:mb-6 2xs:mb-4 flex justify-center items-stretch gap-4"
                  onClick={enterAppToggle.trigger}
                >
                  <GradientBorder
                    className={`transition-colors duration-300 ${
                      !enterAppToggle.visibleEffect && "bg-none"
                    }`}
                    condition={enterAppToggle.visible}
                    colorCSS="bg-black"
                  >
                    <p>ENTER APP</p>
                  </GradientBorder>
                  {enterAppToggle.visible && <GoChevronUp />}
                  {!enterAppToggle.visible && <GoChevronDown />}
                </div>
              </div>
              {enterAppToggle.visible && (
                <div
                  className={`text-3xl xs:text-2xl 2xs:text-xl transition-colors duration-300 ${
                    enterAppToggle.visibleEffect
                      ? "text-white"
                      : "text-transparent"
                  }`}
                >
                  {enterAppNavbar.map((d, i) => {
                    return (
                      <MainNavItem
                        to={d}
                        key={d}
                        className="!my-8 xs:!my-6 2xs:!my-4"
                        onClick={() => menuToggle.setVisible(false)}
                      />
                    );
                  })}
                </div>
              )}
              {/* <WalletConnect
              size={30}
              className="flex flex-col items-center mx-5 xl:mx-3 lg:mx-3 cursor-pointer"
              textClass=" text-lg md:text-2xl sm:text-xl hover:text-[#e2784e]"
            />
            <div className="flex flex-col mt-5 fixed bottom-10 left-[50%] translate-x-[-50%] w-full">
              <div className="flex flex-row items-center justify-center">
                <SocialIcons
                  size={30}
                  className="mx-2 hover:scale-[1.25] hover:text-[#e2784e] transition-transform text-white cursor-pointer ease-in-out duration-300"
                />
              </div>
              <h1 className="text-black text-[10px] mt-8 text-center">
                © Copyright 2023 HYPEBOY. All Rights Reserved.
              </h1>
            </div> */}
            </div>
          </div>
        )}
      </div>
      <style>{`
.hamburg span {
  transition: all cubic-bezier(0.25, 0.1, 0.28, 1.54) 0.32s;
  position: absolute;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: white;
}
.line1 {
  top: 19%;
}
.line2 {
  top: 49%;
}
.line3 {
  top: 79%;
}
.close .line1 {
  top: 49%;
  transform: rotate(45deg);
}
.close .line2 {
  transform: rotate(-45deg);
}
.close .line3 {
  top: 49%;
  transform: rotate(-45deg);
}
`}</style>
    </>
  );
};

export default MainNav;
