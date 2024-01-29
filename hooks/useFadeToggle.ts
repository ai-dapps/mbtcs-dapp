import { readyToast } from "@components/common/toastMessage";
import { useEffect, useState } from "react";

export const useFadeToggle = (time: number) => {
  const [visible, setVisible] = useState(false);
  const [visibleEffect, setVisibleEffect] = useState(false);

  const trigger = () => {
    if (!visible) {
      // console.log("open");
      setVisible(true);
      setTimeout(() => {
        setVisibleEffect(true);
      }, time);
    } else {
      // console.log("close");
      setVisibleEffect(false);

      setTimeout(() => {
        setVisible(false);
      }, time);
    }
  };
  
  return {
    visible,
    setVisible,
    visibleEffect,
    setVisibleEffect,
    trigger,
  };
};
