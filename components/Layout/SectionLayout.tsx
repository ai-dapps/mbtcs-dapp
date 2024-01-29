import { WaypointArea } from "@components/common/WayPointArea";
import { useMenu } from "@stores";
import { useEffect } from "react";
import { mainNavbar, enterAppNavbar } from "@stores/constant";
import { useRouter } from "next/router";

const SectionLayout = ({
  id,
  className,
  children,
  shadow,
}: SectionLayoutProps) => {
  // const router = useRouter();
  const hook = useMenu();
  useEffect(() => {
    // console.log(id);
    hook.setCurrentMenu(id);
  }, [id]);
  // useEffect(() => {
  //   // console.log(id);
  //   console.log(router);
  //   const path = router.pathname.split("/");
  //   if (path.length > 1) {
  //     if (mainNavbar.includes(path[1])) hook.setCurrentMenu(path[1]);
  //     else if (enterAppNavbar.includes(path[2])) hook.setCurrentMenu(path[2]);
  //     else hook.setCurrentMenu("MBTCs");
  //   } else hook.setCurrentMenu("MBTCs");
  // }, []);
  return (
    <>
      <div className={`w-full relative z-[10] ${className}`}>
        <WaypointArea id={id}>
          <div className="">{children}</div>
        </WaypointArea>
        {shadow && (
          <>
            <div className="absolute w-full h-full wrap-shadow-tl top-0 left-0 z-[0]" />
            <div className="absolute w-full h-full wrap-shadow-br top-0 left-0 z-[0]" />
          </>
        )}
      </div>

      <style jsx>{`
        .wrap-shadow-top {
          box-shadow: inset 0px 150px 100px black;
        }
        .wrap-shadow-bottom {
          box-shadow: inset 0px -150px 100px black;
        }
        .wrap-shadow-tl {
          box-shadow: inset 100px 100px 100px black;
        }
        .wrap-shadow-br {
          box-shadow: inset -100px -100px 100px black;
        }
        @media (max-width: 1023px) {
          .wrap-shadow-tl {
            box-shadow: inset 0px 20px 50px black;
          }
          .wrap-shadow-br {
            box-shadow: inset 0px -20px 50px black;
          }
        }
      `}</style>
    </>
  );
};

export default SectionLayout;
