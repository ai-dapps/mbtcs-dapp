import { useEffect } from "react";

const Main = () => {
  useEffect(() => {
    location.href = "/app/dashboard";
  }, []);
  return <div className="m-0 text-white bg-black font-Gotham min-h-screen" />;
};

export default Main;
