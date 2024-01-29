import { useAdmin } from "hooks/useAdmin";
import { useWallet } from "hooks/useWallet";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

// const hashRateInit: HashRate = {
//   startAt: 0,
//   endAt: 0,
//   hashRate: 0,
// };
export default function AdminFactoryHashItem({
  hashRate,
  index,
}: {
  hashRate: HashRate;
  index: number;
}) {
  const [create, setCreate] = useState(false);
  const [hashInput, setHashInput] = useState<HashRate>(hashRate);

  const hashInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHashInput({ ...hashInput, [name]: value });
  };
  const admin = useAdmin();
  const wallet = useWallet();
  return (
    <>
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setCreate(!create)}
      >
        <h1>
          {`Set HashRates ${index + 1}`}
          <span className=" text-gray-400 ml-2">
            {`#${hashRate.startAt} ~ #${hashRate.endAt}`}
          </span>
        </h1>
        <IoIosArrowDown size={25} color="white" />
      </div>
      {create && (
        <>
          <input
            name="startAt"
            required
            onChange={hashInputHandler}
            value={hashInput.startAt}
            className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Start token id"
          />
          <input
            name="endAt"
            required
            onChange={hashInputHandler}
            value={hashInput.endAt}
            className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="End token id"
          />
          <input
            name="hashRate"
            required
            onChange={hashInputHandler}
            value={hashInput.hashRate}
            className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Hashrate"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() =>
              !wallet.wallet.eoa
                ? wallet.setWallet()
                : admin.setHashRates(
                    index.toString(),
                    hashInput.startAt.toString(),
                    hashInput.endAt.toString(),
                    hashInput.hashRate.toString()
                  )
            }
          >
            {!wallet.wallet.eoa ? "Connect" : "Change"}
          </button>
        </>
      )}
    </>
  );
}
