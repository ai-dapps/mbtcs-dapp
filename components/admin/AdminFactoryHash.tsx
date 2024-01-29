import { useStake } from "hooks/useStake";
import AdminFactoryHashItem from "./AdminFactoryHashItem";

export default function AdminFactoryHash() {
  const stake = useStake();
  if (stake.hashRate.length > 0)
    return (
      <>
        {stake.hashRate.map((hashRate, index) => {
          if (hashRate.hashRate)
            return (
              <div
                className="flex flex-col mt-3 gap-y-1 border p-3 border-[#ffffff90] rounded-xl"
                key={hashRate.hashRate + index}
              >
                <AdminFactoryHashItem hashRate={hashRate} index={index} />
              </div>
            );
          else return <></>;
        })}
      </>
    );
  else return <></>;
}
