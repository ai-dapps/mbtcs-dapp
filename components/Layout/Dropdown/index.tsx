import Link from "next/link";
import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { RiGlobalLine } from "react-icons/ri";
import Image from "next/image";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useRouter } from "next/router";

const Dropdown = ({
  className,
  dropdownList,
  selectedIndex,
  setSelectedIndex,
}: DropdownProps) => {
  const router = useRouter();
  const currentUrl = router.pathname;
  const dropDownRef =
    useRef<HTMLElement>() as React.MutableRefObject<HTMLUListElement>;
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Component 외부를 클릭 시 dropdown 표시 해제
    const handleOutsideClick = (
      event: React.BaseSyntheticEvent | MouseEvent
    ) => {
      if (dropDownRef.current) {
        if (!dropDownRef.current.contains(event.target)) {
          setIsOpen(false);
        } else {
          onClickHandler();
        }
      }
    };

    // Component rendering 후 이벤트 등록
    document.addEventListener("click", handleOutsideClick, true);
    // Component 제거 시 이벤트 제거
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [dropDownRef, isOpen]);

  return (
    <>
      <div
        className={`dropdown flex flex-col justify-center z-10 relative ${className}`}
      >
        <button
          className="flex justify-center items-center w-full h-full"
          onClick={onClickHandler}
        >
          <p className="pr-2">{dropdownList[selectedIndex].name}</p>
          {dropdownList[selectedIndex].direction ? (
            <BsFillCaretUpFill />
          ) : (
            <BsFillCaretDownFill />
          )}
        </button>
        <ul
          ref={dropDownRef}
          className={isOpen ? "lan-menu active" : "lan-menu"}
        >
          {dropdownList.map((option, i) => {
            return (
              <li
                key={`${i}_up`}
                className="flex justify-center"
                onClick={() => {
                  setSelectedIndex(i);
                }}
              >
                <p className="pr-2">{option.name}</p>
                {option.direction ? (
                  <BsFillCaretUpFill />
                ) : (
                  <BsFillCaretDownFill />
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        .lan-menu {
          border-radius: 8px;
          position: absolute;
          top: 30px;
          width: inherit;
          text-align: center;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-20px);
          transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        @media (max-width: 1023px) {
          .lan-menu {
            top: 15px;
          }
        }

        .active {
          opacity: 1;
          visibility: visible;
          transform: translateY(3rem);
        }
        .dropdown {
          display: flex;
          justify-contents: center;
        }
        li {
          display: flex;
          justify-contents: center;
          align-items: center;
          margin: 0.5rem 0;
        }
        li a {
          color: white;
          display: flex;
          justify-contents: center;
          padding: 0.25rem 0;
        }

        menu {
          width: 120px;
        }
        ul {
          background-color: rgba(26, 26, 26, 0.85);
        }
        .text-shadow-none {
          text-shadow: none;
        }
      `}</style>
    </>
  );
};

export default Dropdown;
