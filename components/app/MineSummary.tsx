import { harvestReady } from "@components/common/toastMessage";
import { comma } from "@utils/common";
import { centerEllipsis } from "@utils/crypto";
import { useResize } from "hooks/useResize";
import { useStake } from "hooks/useStake";
import { useWallet } from "hooks/useWallet";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";

export default function MineSummary() {
  const { isMobile } = useResize();
  const wallet = useWallet();
  const stake = useStake();

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
      )}
      <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-start items-center text-[#aba6ce] text-xl sm:text-lg xs:text-sm 2xs:text-sm">
        <p>Harvest MBTCS</p>
        <AiOutlineInfoCircle
          size={isMobile ? 20 : 30}
          className="ml-2 xs:ml-1 2xs:ml-1"
        />
      </div>
      <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
        <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
          MBTCS Mined
        </p>
        <span className="text-4xl sm:text-3xl xs:text-3xl 2xs:text-3xl text-[#f3ba2c]">
          {stake.distributions[0]
            ? comma(stake.distributions[0]?.claimable.toFixed(2))
            : 0}
        </span>
      </div>
      <div className="py-4 sm:py-3 xs:py-2 2xs:py-2 flex justify-between items-center">
        <p className="text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
          MFUELS Cost
        </p>
        <span className="text-4xl sm:text-3xl xs:text-3xl 2xs:text-3xl text-[#f3ba2c]">
          {stake.distributions[0]
            ? comma(
                (
                  (stake.distributions[0]?.fuelFee *
                    stake.distributions[0]?.claimable *
                    5) /
                  10000
                ).toFixed(2)
              )
            : 0}
        </span>
      </div>
      <button
        className="w-full text-center text-[#aba6ce] border-[#aba6ce] border-[1px] rounded-2xl py-4 xs:py-3 2xs:py-3 mt-2 text-4xl sm:text-3xl xs:text-lg 2xs:text-sm"
        // onClick={stake.claimAll}
        onClick={harvestReady}
      >
        Harvest MBTCS
      </button>
    </div>
  );
}
