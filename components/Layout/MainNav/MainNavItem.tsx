import { readyToast } from "@components/common/toastMessage";
import { useMenu } from "@stores";
import { mainNavbar, enterAppNavbar } from "@stores/constant";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalize } from "utils/common";
import React, { useEffect, useState } from "react";

export default function MainNavItem({
  to,
  className,
  onClick,
}: MainNavItemProps) {
  const [high, setHigh] = useState(false);

  const hook = useMenu();
  const mainNavCondition = mainNavbar.includes(to);
  const appCondition = enterAppNavbar.includes(to);
  const router = useRouter();

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
    if (!mainNavCondition && !appCondition) return readyToast();
    if (direction === "MBTCs") return router.push("/");
    if (mainNavCondition) return router.push(`/${direction}`);
    if (appCondition) return router.push(`/app/${direction}`);
  }

  return (
    <>
      <div
        className={`${className || ""} cursor-pointer hover:text-[#ee9383] ${
          high ? "text-[#b774ff]" : ""
        } 
          my-12 xs:my-10 2xs:my-8`}
      >
        <a id={`${direction}_nav`} onClick={route}>
          {direction === "market"
            ? "NFT " + capitalize(direction)
            : capitalize(direction)}
        </a>
      </div>
    </>
  );
}
