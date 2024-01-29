import { useEffect, useState } from "react";

import Image from "next/image";
import SectionLayout from "@components/Layout/SectionLayout";
import { useResize } from "hooks/useResize";

import { GradientButton } from "@components/Layout/Gradient";

import StakeFilter from "@components/stake/StakeFilter";
import MinerFilter from "@components/stake/MinerFilter";
import AppNav from "@components/Layout/AppNav";
import { useWallet } from "hooks/useWallet";
import MineSummary from "@components/app/MineSummary";
import { useStake } from "hooks/useStake";
import NftSelectorForStaking from "@components/modal/NftSelectorForStaking";
import UnstakableFilter from "@components/stake/UnstakableFilter";
import DashboardMain from "@components/app/DashboardMain";

const Dashboard = () => {
  const { isMobile } = useResize();
  const [isWallet, setIsWallet] = useState(false);
  const [isUnstake, setIsUnstake] = useState(false);
  const [token, setToken] = useState<Token[]>([]);
  const [contract, setContract] = useState("");

  // const [stakeTokens, setStakeTokens] = useState<Token[]>(dummyTokens);
  // const [harvestTokens, setHarvestTokens] = useState<Token[]>([]);
  // const [unstakeTokens, setUnstakeTokens] = useState<Token[]>([]);

  const stake = useStake();
  const wallet = useWallet();

  const entry =
    stake.stakedTokenTypes.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    ) +
    stake.unstakableToken.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    ) +
    stake.unstakedTokenTypes.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    );

  useEffect(() => {
    if (wallet.wallet.eoa) stake.init();
  }, [wallet.wallet.eoa]);

  return (
    <>
      <SectionLayout id="dashboard" className="bg-[#1f1a41]">
        <NftSelectorForStaking
          isUnstake={isUnstake}
          isWallet={isWallet}
          tokenIds={token}
          setToken={setToken}
          contract={contract}
        />
        <div className="w-full after:pb-[73.6%] flex absolute z-[5] bg-[#1f1a41]">
          <Image
            src="/MBTCs/mine/bg_coins.webp"
            alt="background"
            objectFit="contain"
            layout="fill"
            priority
          />
        </div>
        <div className="w-full font-roboto min-h-[600px] flex flex-col justify-start relative z-[6] px-12 xs:px-8 2xs:px-8 pt-32 sm:pt-28 xs:pt-24 2xs:pt-24 pb-12 xs:pb-8 2xs:pb-8 ">
          <div className="flex justify-between items-center my-8 xs:my-4 2xs:my-4">
            <AppNav />
            {/* <MdMenu
              size={isMobile ? 50 : 70}
              onClick={menuToggle.trigger}
              className="text-white"
            /> */}
            <div className="text-4xl xs:text-2xl 2xs:text-2xl font-extrabold py-2 xs:py-1 2xs:py-1 flex justify-center gap-2">
              <p className="text-white">Dashboard</p>
              {/* <span className="text-[#f3ba2c]">{entry}</span> */}
            </div>
            <div className="w-1/12" />
          </div>
          <DashboardMain />
        </div>
      </SectionLayout>
      <style jsx>{``}</style>
    </>
  );
};

export default Dashboard;
