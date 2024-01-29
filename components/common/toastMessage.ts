import { toast } from "react-toastify";

export const readyToast = () => {
  return toast.info("Coming Soon!", {
    toastId: "commingsoon",
  });
};
export const walletConnectToast = () => {
  return toast.info("Please connect wallet!", {
    toastId: "connectwallet",
  });
};
export const harvestReady = () => {
  return toast.info("Please wait for the withdrawal availability date.", {
    toastId: "harvest",
  });
};
