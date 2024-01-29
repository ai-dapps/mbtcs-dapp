import { centerEllipsis, getNeworkInfo } from "@utils/crypto";
import { useAdmin } from "hooks/useAdmin";
import { useStake } from "hooks/useStake";
import { useWallet } from "hooks/useWallet";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import AdminFactoryHashItem from "./AdminFactoryHashItem";
import AdminFactoryNewHash from "./AdminFactoryNewHash";
import AdminFactoryHash from "./AdminFactoryHash";
import AdminFactoryCreateDist from "./AdminFactoryCreateDist";
import AdminFactoryFuel from "./AdminFactoryFuel";

export default function AdminFactory() {
  const [create, setCreate] = useState(false);
  const admin = useAdmin();
  const wallet = useWallet();
  const stake = useStake();
  if (!wallet.wallet.eoa) return <></>;
  return (
    <div className="text-white px-12 xs:px-8 2xs:px-8 relative z-[1] mt-10">
      <h1 className="font-bold">
        Factory Contract
        {admin.factoryContract && (
          <span
            className=" text-gray-600 hover:text-white ml-2"
            onClick={() =>
              window.open(
                `${getNeworkInfo()?.explorer}/address/${admin.factoryContract}`
              )
            }
          >
            {centerEllipsis(admin.factoryContract, 4)}
          </span>
        )}
      </h1>
      <AdminFactoryCreateDist />
      <AdminFactoryFuel />
      <AdminFactoryNewHash />
      <AdminFactoryHash />
    </div>
  );
}
