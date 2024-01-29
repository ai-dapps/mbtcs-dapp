import { capitalize } from "@utils/common";
import { useStake } from "hooks/useStake";
import { Dispatch, useEffect, useState } from "react";

type NftSelectorProps = {
  isWallet: boolean;
  isUnstake: boolean;
  tokenIds: Token[];
  contract: string;
  setToken: Dispatch<React.SetStateAction<Token[]>>;
};

export default function NftSelectorForStaking({
  isWallet,
  isUnstake,
  tokenIds,
  contract,
  setToken,
}: NftSelectorProps) {
  const [select, setSelect] = useState<string[]>([]);

  const selectHandler = (tokenId: string) => {
    const arr = [...select];
    const find = arr.findIndex((x) => x === tokenId);
    console.log(tokenId, find);
    if (find < 0 && arr.length < 50) arr.push(tokenId);
    else if (find >= 0) arr.splice(find, 1);
    setSelect(arr);
  };
  const stake = useStake();
  const types = !isWallet ? (!isUnstake ? "unstake" : "unstake") : "stake";
  const execute = () => {
    !isWallet
      ? !isUnstake
        ? stake.unStake(select, contract)
        : stake.unStake(select, contract)
      : stake.stake(select);
    setTimeout(() => {
      setToken([]);
    }, 500);
  };
  useEffect(() => {
    setSelect([]);
  }, [tokenIds]);
  if (tokenIds.length === 0) return <></>;
  return (
    <div className="min-h-screen w-full flex justify-center items-center fixed top-0 left-0 z-10 animate-fadeIn">
      <div className="w-full h-full fixed top-0 left-0 bg-[#00000090] z-0" />
      <div className="w-full mx-5 h-[400px] bg-[#1f1a41] text-white relative rounded-2xl p-5 flex flex-col justify-between max-w-2xl">
        <div className="flex flex-row items-center justify-between">
          <h1>
            {capitalize(types)} Tokens({capitalize(tokenIds[0].name)})
          </h1>
          <p className="text-[#f3ba2c]">
            {select.length} NFTs(Limit up to 50 per tx)
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-end gap-2">
            <button
              className="text-center text-[#aba6ce] border-[#aba6ce] border-[1px] rounded-lg text-sm py-1 px-2 mb-2"
              onClick={() =>
                setSelect(
                  tokenIds.map((x) => x.tokenId.toString()).slice(0, 50)
                )
              }
            >
              Select All
            </button>
            <button
              className="text-center text-[#aba6ce] border-[#aba6ce] border-[1px] rounded-lg text-sm py-1 px-2 mb-2"
              onClick={() => setSelect([])}
            >
              Cancel
            </button>
          </div>
          <div className="h-[200px] w-full grid grid-cols-3 gap-3 p-2 overflow-y-scroll custom-scroll">
            {tokenIds.map((token) => {
              const selected = select.includes(token.tokenId.toString());
              return (
                <div
                  key={token.tokenId}
                  className={`border flex justify-center items-center rounded-xl w-full h-[35px] ${
                    selected
                      ? "ring-2 border-indigo-500 ring-indigo-500"
                      : "border-gray-400"
                  }`}
                  onClick={() => selectHandler(token.tokenId.toString())}
                >
                  <p>#{token.tokenId}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <button
            className="w-full text-center text-[#aba6ce] border-[#aba6ce] border-[1px] rounded-2xl py-4 xs:py-3 2xs:py-3 mt-2 text-4xl sm:text-3xl xs:text-lg 2xs:text-sm"
            onClick={() => setToken([])}
          >
            Cancel
          </button>
          <button
            className="bg-gradient-to-r from-[#b774ff] to-[#ee9383] w-full text-center text-[white]  rounded-2xl py-4 xs:py-3 2xs:py-3 mt-2 text-4xl sm:text-3xl xs:text-lg 2xs:text-sm"
            onClick={execute}
          >
            {capitalize(types)}
          </button>
        </div>
      </div>
    </div>
  );
}
