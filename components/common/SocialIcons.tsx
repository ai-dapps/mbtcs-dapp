import { FiGlobe } from "react-icons/fi";
import {
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";

export const SocialIcons = ({ size, className }: SocialIconsProps) => {
  return (
    <>
      <button
        onClick={() => window.open("https://mbtcsuper.com")}
        className={className}
      >
        <FiGlobe size={size} />
      </button>
      <button
        onClick={() => window.open("https://t.me/MBTCs_NFT")}
        className={className}
      >
        <FaTelegramPlane size={size} />
      </button>
      <button
        onClick={() => window.open("https://twitter.com/MBTCs_NFT")}
        className={className}
      >
        <FaTwitter size={size} />
      </button>
      <button
        onClick={() => window.open("https://www.instagram.com/mbtcs_nft")}
        className={className}
      >
        <FaInstagram size={size} />
      </button>
      <button
        onClick={() =>
          window.open(
            "https://www.youtube.com/channel/UCx7a7jem4X0xyyAGu4vPbZA"
          )
        }
        className={className}
      >
        <FaYoutube size={size} />
      </button>
      <style jsx>{``}</style>
    </>
  );
};
