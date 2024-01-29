import { comma } from "@utils/common";
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
export default function AdminFactoryFuel() {
  const [create, setCreate] = useState(false);
  const [fuel, setFuel] = useState("");
  const admin = useAdmin();
  const wallet = useWallet();
  const stake = useStake();
  return (
    <div className="flex flex-col mt-3 gap-y-1 border p-3 border-[#ffffff90] rounded-xl">
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setCreate(!create)}
      >
        <h1>
          {`Set MFUELS Fee`}
          {admin.fuelFee && (
            <span className=" text-gray-400 ml-2 text-xs">
              {comma((admin.fuelFee / 10000).toFixed(1))} MFUELS ( harverst X5,
              unstake X3)
            </span>
          )}
        </h1>
        <IoIosArrowDown size={25} color="white" />
      </div>
      {create && (
        <>
          <input
            name="fuel"
            required
            onChange={(e) => setFuel(e.target.value)}
            value={fuel}
            className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="MFUELS fee(1000 = 0.1 MFUELS)"
          />

          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() =>
              !wallet.wallet.eoa ? wallet.setWallet() : admin.setFuelFees(fuel)
            }
          >
            {!wallet.wallet.eoa ? "Connect" : "Execute"}
          </button>
        </>
      )}
    </div>
  );
}
