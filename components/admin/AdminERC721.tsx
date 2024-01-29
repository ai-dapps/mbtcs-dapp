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
import AdminERC721Transfer from "./AdminERC721Transfer";
import AdminERC721Airdrop from "./AdminERC721Airdrop";

export default function AdminERC721() {
  const [create, setCreate] = useState(false);
  const admin = useAdmin();
  const wallet = useWallet();
  const stake = useStake();
  if (!wallet.wallet.eoa) return <></>;
  return (
    <div className="text-white px-12 xs:px-8 2xs:px-8 relative z-[1]">
      <h1 className="font-bold">
        NFT(ERC721) Contract
        {admin.erc721Contract && (
          <span
            className=" text-gray-600 hover:text-white ml-2"
            onClick={() =>
              window.open(
                `${getNeworkInfo()?.explorer}/address/${admin.erc721Contract}`
              )
            }
          >
            {centerEllipsis(admin.erc721Contract, 4)}
          </span>
        )}
      </h1>
      {/* <AdminFactoryCreateDist /> */}
      <AdminERC721Airdrop />
      <AdminERC721Transfer />
      {/* <AdminFactoryFuel />
      <AdminFactoryNewHash />
      <AdminFactoryHash /> */}
    </div>
  );
}
