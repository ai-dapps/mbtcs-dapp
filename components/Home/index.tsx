import Image from "next/image";
import Link from "next/link";
import { GradientText } from "@components/Layout/Gradient";
import SectionLayout from "@components/Layout/SectionLayout";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <SectionLayout id="MBTCs" className="bg-[#040213]">
        <div className="w-full after:pb-[143%] flex relative"></div>
        <Image
          src="/MBTCs/main/main_bg_2.png"
          alt="background"
          objectFit="contain"
          layout="fill"
          priority
        />
        <div className="-top-44 xs:-top-32 2xs:-top-32 relative w-full flex flex-col justify-center items-center">
          <div className="w-[80%] after:pb-[26%] flex relative">
            <Image
              src="/MBTCs/main/meta_bitcoin.webp"
              alt="META BITCOIN SUPER"
              objectFit="contain"
              layout="fill"
            />
          </div>
          <GradientText
            className="mt-8 font-extralight tracking-wide text-5xl xs:text-2xl 2xs:text-2xl whitespace-pre-wrap text-center"
            condition
          >
            {`The Next Generation Crypto\nProviding a Cross-chain\n`}
            <span className="font-extrabold tracking-tight">{`Trust Standard in the\nMetaverse`}</span>
          </GradientText>
          <h1></h1>

          <div>
            <button
              onClick={() => router.push("/app")}
              className="bg-white w-full py-8 xs:py-4 2xs:py-4 px-10 xs:px-8 2xs:px-8 mt-16 xs:mt-8 rounded-full font-Gotham font-black text-4xl xs:text-xl 2xs:text-xl"
            >
              ENTER APP
            </button>
          </div>
        </div>
      </SectionLayout>
      <style jsx>{``}</style>
    </>
  );
};

export default Home;
