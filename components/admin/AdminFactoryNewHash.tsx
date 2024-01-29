import { useAdmin } from "hooks/useAdmin";
import { useStake } from "hooks/useStake";
import { useWallet } from "hooks/useWallet";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const hashRateInit: NewHashRate = {
  startAt: "",
  endAt: "",
  hashRate: "",
};
export default function AdminFactoryNewHash() {
  const [create, setCreate] = useState(false);
  const [hashInput, setHashInput] = useState<NewHashRate>(hashRateInit);

  const hashInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHashInput({ ...hashInput, [name]: value });
  };
  const admin = useAdmin();
  const wallet = useWallet();
  const stake = useStake();
  return (
    <div className="flex flex-col mt-3 gap-y-1 border p-3 border-[#ffffff90] rounded-xl">
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setCreate(!create)}
      >
        <h1>{`Add HashRates`}</h1>
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
                    stake.hashRate.length.toString(),
                    hashInput.startAt.toString(),
                    hashInput.endAt.toString(),
                    hashInput.hashRate.toString()
                  )
            }
          >
            {!wallet.wallet.eoa ? "Connect" : "Execute"}
          </button>
        </>
      )}
    </div>
  );
}
