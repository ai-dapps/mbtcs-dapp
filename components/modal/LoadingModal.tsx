import LoadingSpinner from "@components/common/LoadingSpinner";
import { useModal } from "hooks/useModal";

export default function LoadingModal() {
  const modal = useModal();
  if (!modal.loading) return <></>;
  else
    return (
      <div className="min-h-screen bg-[#00000090] w-full fixed top-0 left-0 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
}
