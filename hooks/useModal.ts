import { store } from "@stores";
import { useEffect, useState } from "react";

export const useModal = () => {
  const { execute, setExecute, loading, setLoading } = store.modal.modalStore();

  return {
    execute,
    setExecute,
    loading,
    setLoading,
  };
};
