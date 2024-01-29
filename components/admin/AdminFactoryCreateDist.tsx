import { useAdmin } from "hooks/useAdmin";
import { useWallet } from "hooks/useWallet";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function AdminFactoryCreateDist() {
  const [create, setCreate] = useState(false);

  const admin = useAdmin();
  const wallet = useWallet();
  return (
    <>
      <div className="flex flex-col mt-3 gap-y-1 border p-3 border-[#ffffff90] rounded-xl">
        <div
          className="flex flex-row items-center justify-between"
          onClick={() => setCreate(!create)}
        >
          <h1>Create Distributions</h1>
          <IoIosArrowDown size={25} color="white" />
        </div>
        {create && (
          <>
            <input
              name="amount"
              required
              onChange={admin.CRDInputHandler}
              value={admin.CRDinput.amount}
              className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Reward amount(ether)"
            />
            <input
              name="start"
              required
              onChange={admin.CRDInputHandler}
              value={admin.CRDinput.start}
              className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Start time(Date)"
              type="datetime-local"
            />
            <input
              name="end"
              required
              onChange={admin.CRDInputHandler}
              value={admin.CRDinput.end}
              className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="End time(Date)"
              type="datetime-local"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() =>
                !wallet.wallet.eoa
                  ? wallet.setWallet()
                  : admin.createDistributions()
              }
            >
              {!wallet.wallet.eoa ? "Connect" : "Create"}
            </button>
          </>
        )}
      </div>
      <style jsx>{`
        input::-webkit-calendar-picker-indicator {
          background-color: white;
          filter: invert(100%);
        }
      `}</style>
    </>
  );
}
