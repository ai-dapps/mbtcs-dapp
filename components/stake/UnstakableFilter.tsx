import { useState } from "react";
import Filter from "/public/icon/filter.svg";
import Dropdown from "@components/Layout/Dropdown";

import { IoFileTray } from "react-icons/io5";
import { useResize } from "hooks/useResize";
import UnstakableCard from "./UnstakableCard";

const UnstakableFilter = ({
  name,
  tokens,
  setToken,
  setContract,
}: UnstakableFilterProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isMobile } = useResize();
  const HASHRATE = 2;

  const UP = true;
  const DOWN = false;

  const filterList = [
    { value: HASHRATE, name: "HashRate", direction: UP },
    { value: HASHRATE, name: "HashRate", direction: DOWN },
  ];

  if (1 < tokens.length) {
    tokens.sort((a, b) => {
      if (filterList[selectedIndex].value === HASHRATE) {
        if (filterList[selectedIndex].direction === UP)
          return b.hashRate - a.hashRate;
        return a.hashRate - b.hashRate;
      }

      return a.hashRate - b.hashRate;
    });
  }

  let tokenContent = (
    <div className="w-full h-[418px] sm:h-[406px] xs:h-[270px] 2xs:h-[218px] mb-8 xs:mb-6 2xs:mb-6 px-8 xs:p-6 2xs:p-6 py-16 rounded-3xl bg-black bg-opacity-40 text-[#aba6ce] flex flex-col justify-evenly items-center">
      <IoFileTray size={isMobile ? 50 : 100} />
      <div className="text-3xl sm:text-2xl xs:text-lg 2xs:text-xs">
        No Miners in the {name}
      </div>
    </div>
  );

  if (tokens.length !== 0)
    tokenContent = (
      <>
        {tokens.map((token, i) => (
          <UnstakableCard
            key={i}
            token={token}
            onStake={() => {
              setContract(token.contract);
              setToken(token.tokenIds);
            }}
          />
        ))}
      </>
    );

  return (
    <>
      <div className="mx-2 my-10 sm:my-8 xs:my-6 2xs:my-6 grid grid-cols-12 items-center h-10">
        <p className="col-span-6 2xs:col-span-5 text-4xl sm:text-3xl xs:text-xl 2xs:text-xl font-extrabold text-white">
          Unstake Miners
        </p>
        <div className="col-span-1 2xs:col-span-2 p-1">
          <Filter fill="#aba6ce" />
        </div>
        <Dropdown
          className="col-span-5 h-full text-[#aba6ce] mx-4 w-full rounded-full border-[#aba6ce] border-[1px] text-2xl sm:text-xl xs:text-base 2xs:text-sm"
          dropdownList={filterList}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      {tokenContent}
    </>
  );
};

export default UnstakableFilter;
