import { useResize } from "hooks/useResize";
import { useFadeToggle } from "hooks/useFadeToggle";
import { MdMenu, MdClose } from "react-icons/md";
import { enterAppNavbar } from "@stores/constant";
import { GradientText, GradientBorder } from "../Gradient";
import AppNavItem from "./AppNavItem";

const AppNav = () => {
  const menuToggle = useFadeToggle(100);
  const { isMobile } = useResize();

  return (
    <>
      <MdMenu
        size={isMobile ? 50 : 70}
        onClick={menuToggle.trigger}
        className="text-white"
      />
      {menuToggle.visible && (
        <div
          id="enterApp"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[12] w-[767px] sm:w-full xs:w-full 2xs:w-full"
        >
          <div
            className={`fixed z-[-1] top-24 sm:top-20 xs:top-16 2xs:top-16 left-0 transition-opacity flex justify-center items-start w-2/3 h-screen duration-300 bg-black bg-cover  ${
              menuToggle.visibleEffect ? "opacity-90" : "opacity-0"
            } font-Gotham text-white`}
          >
            <div className="flex flex-col justify-start items-start mt-24 xs:mt-16 2xs:mt-16 text-center">
              <div className="text-6xl sm:text-5xl xs:text-4xl 2xs:text-3xl font-extrabold mb-8">
                <GradientText condition>ENTER APP</GradientText>
              </div>
              {enterAppNavbar.map((d, i) => {
                return (
                  <AppNavItem
                    to={d}
                    key={d}
                    colorCSS="bg-black"
                    onClick={() => menuToggle.setVisible(false)}
                  />
                );
              })}
            </div>
          </div>
          <MdClose
            className="text-white fixed z-[-1] left-2/3 top-24 xs:top-16 2xs:top-16 m-6 xs:m-4 2xs:m-4"
            size={isMobile ? 50 : 70}
            onClick={menuToggle.trigger}
          />
        </div>
      )}
    </>
  );
};

export default AppNav;
