import { comma, dateToText, isBetween } from "@utils/common";
import { centerEllipsis, getNeworkInfo } from "@utils/crypto";
import { useAdmin } from "hooks/useAdmin";
import { useStake } from "hooks/useStake";
import { useWallet } from "hooks/useWallet";
import moment from "moment";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function PoolList() {
  const [create, setCreate] = useState(false);
  const admin = useAdmin();
  const wallet = useWallet();
  const stake = useStake();

  return stake.distributions.length > 0 ? (
    <div className="text-white px-12 xs:px-8 2xs:px-8 relative z-[1]">
      {stake.distributions.map((dist, index) => {
        const between = isBetween(dist.startingTimestamp, dist.endingTimestamp);
        return (
          <div
            className="flex flex-col mt-3 gap-y-1 p-3 px-5 rounded-3xl bg-black bg-opacity-40"
            key={dist.contract}
          >
            <div className="flex flex-row items-center justify-between">
              <h1>
                {`Pool ${dist.index + 1}`}{" "}
                <span
                  className=" text-gray-600 hover:text-white ml-2"
                  onClick={() =>
                    window.open(
                      `${getNeworkInfo()?.explorer}/address/${dist.contract}`
                    )
                  }
                >
                  {centerEllipsis(dist.contract, 4)}
                </span>
              </h1>

              <h1>{`TVL : ${dist.TVL} NFTs`}</h1>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <div className="flex flex-row items-center text-sm ">
                  <p className="w-10">Start</p>
                  <p className="whitespace-pre-wrap">
                    {`: ${dateToText(dist.startingTimestamp)}`}
                  </p>
                </div>
                <div className="flex flex-row items-center text-sm ">
                  <p className="w-10">End</p>
                  <p className="whitespace-pre-wrap">
                    {`: ${dateToText(dist.endingTimestamp)}`}
                  </p>
                </div>
                <div className="flex flex-row items-center text-sm ">
                  <p className="w-14">Amount</p>
                  <p className="whitespace-pre-wrap text-[#f3ba2c]">
                    {`: ${comma(dist.rewardAmount)} MBTCS`}
                  </p>
                </div>
                {/* <p className="text-sm whitespace-pre-wrap">
                {`Start : ${dateToText(
                  dist.startingTimestamp
                )}\nEnd : ${dateToText(dist.endingTimestamp)}`}
              </p> */}
              </div>
              <p
                className={`${
                  between === "Active" ? "text-indigo-500" : "text-red-400"
                }`}
              >
                {between}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
}
