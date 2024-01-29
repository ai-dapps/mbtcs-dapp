import { comma } from "@utils/common";
import { centerEllipsis } from "@utils/crypto";
import { useResize } from "hooks/useResize";
import { useStake } from "hooks/useStake";
import { useWallet } from "hooks/useWallet";
import { useEffect } from "react";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";

export default function DashboardMain() {
  const { isMobile } = useResize();
  const wallet = useWallet();
  const stake = useStake();

  const claimed = stake.distributions.reduce(
    (total, cur) => total + cur.claimed,
    0
  );
  const mined =
    claimed +
    stake.distributions.reduce((total, cur) => total + cur.claimable, 0);

  const staked =
    stake.stakedTokenTypes.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    ) +
    stake.unstakableToken.reduce(
      (total, cur) => total + cur.tokenIds.length,
      0
    );
  const entry = stake.unstakedTokenTypes.reduce(
    (total, cur) => total + cur.tokenIds.length,
    0
  );

  useEffect(() => {
    stake.init();
  }, []);

  return (
    <div className="w-full py-8 xs:py-4 2xs:py-4 px-12 xs:px-8 2xs:px-8 rounded-3xl bg-black bg-opacity-40 text-white">
      {wallet.wallet.eoa && (
        <div className="pb-8 sm:pb-6 xs:pb-4 2xs:pb-4 flex justify-between items-center text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
          <p>{centerEllipsis(wallet.wallet.eoa, 6)}</p>
          <div className="bg-[#aba6ce] bg-opacity-50 rounded-full">
            <MdOutlineContentCopy
              size={isMobile ? 50 : 70}
              className="p-4 sm:p-3 xs:p-3 2xs:p-3"
              onClick={() =>
                wallet.wallet.eoa &&
                navigator.clipboard.writeText(wallet.wallet.eoa)
              }
            />
          </div>
        </div>
      )}
      {!wallet.wallet.eoa && (
        <>
          <div
            className="pb-8 sm:pb-6 xs:pb-4 2xs:pb-4 flex justify-between items-center text-3xl sm:text-2xl xs:text-lg 2xs:text-lg"
            onClick={wallet.setWallet}
          >
            <p>Enter my address</p>
            <AiOutlinePlus
              size={isMobile ? 50 : 70}
              className="bg-[#aba6ce] bg-opacity-50 rounded-full p-4 sm:p-3 xs:p-3 2xs:p-3"
            />
          </div>
        </>
      )}
      {wallet.wallet.eoa && (
        <>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-start items-center text-[#aba6ce] text-xl sm:text-lg xs:text-sm 2xs:text-sm">
            <p>Harvest MBTCS</p>
            {/* <AiOutlineInfoCircle
              size={isMobile ? 20 : 30}
              className="ml-2 xs:ml-1 2xs:ml-1"
            /> */}
          </div>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
            <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
              Total Mined
            </p>
            <span className="text-xl text-[#f3ba2c]">
              {stake.distributions[0] ? comma(mined.toFixed(2)) : 0}
            </span>
          </div>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
            <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
              Total Harvested
            </p>
            <span className="text-xl text-[#f3ba2c]">
              {stake.distributions[0] ? comma(claimed.toFixed(2)) : 0}
            </span>
          </div>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-start items-center text-[#aba6ce] text-xl sm:text-lg xs:text-sm 2xs:text-sm mt-5">
            <p>My Balance</p>
            {/* <AiOutlineInfoCircle
              size={isMobile ? 20 : 30}
              className="ml-2 xs:ml-1 2xs:ml-1"
            /> */}
          </div>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
            <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
              MBTCS NFT (Wallet)
            </p>
            <span className="text-xl text-[#f3ba2c]">
              {stake.distributions[0] ? comma(entry) : 0}
            </span>
          </div>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
            <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
              MBTCS NFT (Staked)
            </p>
            <span className="text-xl text-[#f3ba2c]">
              {stake.distributions[0] ? comma(staked) : 0}
            </span>
          </div>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
            <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">MBTCS</p>
            <span className="text-xl text-[#f3ba2c]">
              {stake.distributions[0] ? comma(stake.mbtcBalance.toFixed(2)) : 0}
            </span>
          </div>
          <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
            <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
              MFUELS
            </p>
            <span className="text-xl text-[#f3ba2c]">
              {comma(stake.fuelBalance.toFixed(2))}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
