import { comma } from "@utils/common";
import Image from "next/image";

const UnstakableCard = ({
  token,
  onStake,
}: {
  token: StakableToken;
  onStake: () => void;
}) => {
  return (
    <div className="mb-8 xs:mb-6 2xs:mb-6 p-8 xs:p-6 2xs:p-6 rounded-3xl bg-black bg-opacity-40 text-white">
      <div className="grid grid-cols-12 gap-8 xs:gap-6 2xs:gap-4">
        <div className="row-span-4 col-span-5 relative">
          <Image
            src={token.img}
            alt="NFT_01"
            layout="fill"
            className="rounded-3xl"
            // objectFit="contain"
            priority
          />
        </div>
        <div className="row-span-2 col-span-6 text-center text-4xl sm:text-[28px] xs:text-base 2xs:text-sm font-extrabold tracking-tighter py-4 xs:py-1 2xs:py-1">
          {`${token.name.toLocaleUpperCase()}`}
        </div>
        <div className="col-span-6 flex justify-between items-center text-3xl sm:text-2xl xs:text-base 2xs:text-xs">
          <div className="text-[#aba6ce] tracking-tighter">HashRate</div>
          <div className="text-right text-[#f3ba2c] text-xl">
            {comma(token.hashRate)}
          </div>
        </div>
        <div className="col-span-6 flex justify-between items-center py-4 xs:py-1 2xs:py-1 text-3xl sm:text-2xl xs:text-base 2xs:text-xs">
          <div className="text-[#aba6ce] tracking-tighter">Amount</div>
          <div className="text-right text-[#f3ba2c] text-xl">
            {comma(token.tokenIds.length)}
          </div>
        </div>
        <button
          className="row-span-2 col-span-12 text-center text-[#aba6ce] border-[#aba6ce] border-[1px] rounded-2xl py-4 xs:py-3 2xs:py-3 mt-2 text-4xl sm:text-3xl xs:text-lg 2xs:text-sm"
          onClick={onStake}
        >
          Unstake
        </button>
      </div>
    </div>
  );
};

export default UnstakableCard;
