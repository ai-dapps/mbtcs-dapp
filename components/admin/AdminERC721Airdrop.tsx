import { useAdmin } from "hooks/useAdmin";
import { useWallet } from "hooks/useWallet";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function AdminERC721Airdrop() {
  const [create, setCreate] = useState(false);

  const admin = useAdmin();
  const wallet = useWallet();
  return (
    <div className="flex flex-col mt-3 gap-y-1 border p-3 border-[#ffffff90] rounded-xl">
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setCreate(!create)}
      >
        <h1>NFT Airdrop</h1>
        <IoIosArrowDown size={25} color="white" />
      </div>
      {create && (
        <>
          {/* <input
            name="from"
            required
            onChange={admin.TRInputHandler}
            value={admin.TRInput.from}
            className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Reward amount(ether)"
          /> */}
          <input
            name="to"
            required
            onChange={admin.ADInputHandler}
            value={admin.adInput.to}
            className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Airdrop to.. (address)"
          />
          <input
            name="amount"
            type="number"
            required
            onChange={admin.ADInputHandler}
            value={admin.adInput.amount}
            className="min-w-0 flex-auto rounded-md border-0 bg-black/75 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Airdrop amount (number)"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() =>
              !wallet.wallet.eoa ? wallet.setWallet() : admin.nftAirdrop()
            }
          >
            {!wallet.wallet.eoa
              ? "Connect"
              : `Airdrop #${admin.totalSupply + 1}${
                  parseInt(admin.adInput.amount)
                    ? parseInt(admin.adInput.amount) > 1
                      ? `~ #${
                          admin.totalSupply + parseInt(admin.adInput.amount)
                        }`
                      : ""
                    : ""
                }`}
          </button>
        </>
      )}
    </div>
  );
}
