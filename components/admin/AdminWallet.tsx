import { centerEllipsis } from "@utils/crypto";
import { useResize } from "hooks/useResize";
import { useWallet } from "hooks/useWallet";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";

export default function AdminWallet() {
  const { isMobile } = useResize();
  const wallet = useWallet();
  return (
    <div className="w-full py-8 xs:py-4 2xs:py-4 px-12 xs:px-8 2xs:px-8 rounded-3xl text-white relative z-[1]">
      {wallet.wallet.eoa && (
        <div className="pb-8 sm:pb-6 xs:pb-4 2xs:pb-4 flex justify-between items-center text-3xl sm:text-2xl xs:text-lg 2xs:text-lg">
          <p>{centerEllipsis(wallet.wallet.eoa, 6)}</p>
          {/* {centerEllipsis(wallet.wallet.eoa, 4)} */}
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
    </div>
  );
}
