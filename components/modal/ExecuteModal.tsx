import LoadingSpinner from "@components/common/LoadingSpinner";
import { capitalize } from "@utils/common";
import { useModal } from "hooks/useModal";
import { MdDone } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

export default function ExecuteModal() {
  const modal = useModal();
  const Pending = () => (
    <>
      <LoadingSpinner />
      <h1 className=" mt-5 whitespace-pre-wrap text-[20px] text-[white] self-center">
        Transaction Pending...
      </h1>
    </>
  );
  const Success = () => (
    <>
      <div className="border-2 rounded-full p-2 border-indigo-500">
        <MdDone size={30} color="rgb(99 102 241)" />
      </div>
      <h1 className="mt-5 whitespace-pre-wrap text-[20px] text-[white] self-center">
        Contract Execution Success!
      </h1>
    </>
  );
  const Failed = () => (
    <>
      <IoWarningOutline size={50} color="rgb(99 102 241)" />

      <h1 className="mt-5 whitespace-pre-wrap text-[20px] text-white self-center">
        Contract Execution Failed...
      </h1>
    </>
  );

  if (modal.execute === "ready") return <></>;
  else
    return (
      <div className="min-h-screen w-full flex justify-center items-center fixed top-0 left-0 z-50 animate-fadeIn">
        <div className="w-full h-full fixed top-0 left-0 bg-[#00000090] z-0" />
        <div className="w-full mx-5 h-[300px] bg-[#1f1a41] text-white relative rounded-2xl p-5 flex flex-col justify-between max-w-2xl">
          <div className="flex flex-row items-center justify-between">
            <h1>Contract Execution</h1>
            <p className="text-[#f3ba2c]">{capitalize(modal.execute)}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            {modal.execute === "pending" && <Pending />}
            {modal.execute === "fail" && <Failed />}
            {modal.execute === "success" && <Success />}
          </div>
          <div className="flex flex-row items-center gap-5">
            <button
              className="w-full text-center text-[#aba6ce] border-[#aba6ce] border-[1px] rounded-2xl py-4 xs:py-3 2xs:py-3 mt-2 text-4xl sm:text-3xl xs:text-lg 2xs:text-sm"
              onClick={() => modal.setExecute("ready")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
}
