import { readyToast } from "@components/common/toastMessage";
import { useMenu } from "@stores";
import { enterAppNavbar } from "@stores/constant";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalize } from "utils/common";
import { GradientText, GradientBorder } from "../Gradient";
import React, { useEffect, useState } from "react";
import { BsClipboardCheckFill } from "react-icons/bs";
import { AiOutlineDotChart } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { TbPolygon } from "react-icons/tb";
import { useResize } from "hooks/useResize";

const AppNavItem = ({ to, className, colorCSS, onClick }: AppNavItemProps) => {
  const [high, setHigh] = useState(false);
  const { isMobile } = useResize();

  const hook = useMenu();
  const appCondition = enterAppNavbar.includes(to);
  const index = enterAppNavbar.findIndex((el) => el === to);

  const router = useRouter();
  const size = isMobile ? 20 : 30;

  const iconsList = [
    <BsClipboardCheckFill key={0} size={size} />,
    <AiOutlineDotChart key={1} size={size} />,
    <TbPolygon key={2} size={size} />,
    <IoBagOutline key={3} size={size} />,
  ];

  let direction = to;
  const path = to.split("/");
  if (1 < path.length) {
    direction = path[2];
  }

  useEffect(() => {
    console.log(hook.currentMenu, direction);
    if (hook.currentMenu === direction) setHigh(true);
    else setHigh(false);
  }, [hook.currentMenu, direction]);

  function route() {
    onClick && onClick();
    if (!appCondition) return readyToast();
    if (appCondition) return router.push(`/app/${direction}`);
  }

  return (
    <>
      <a
        id={`${direction}_nav`}
        className={`${className || ""} ${
          high ? "text-[#b774ff]" : ""
        } flex justify-center items-center hover:text-[#ee9383] cursor-pointer text-5xl sm:text-4xl xs:text-3xl 2xs:text-2xl
        my-8 xs:my-6 2xs:my-4`}
        onClick={route}
      >
        {iconsList[index]}
        <GradientBorder condition={high} colorCSS={colorCSS} className="ml-4 mt-3">
          <p onClick={onClick}>
            {direction === "market"
              ? "NFT " + capitalize(direction)
              : capitalize(direction)}
          </p>
        </GradientBorder>
      </a>
    </>
  );
};
export default AppNavItem;
