import axios from "axios";
import { utils, BigNumber } from "ethers";

export const centerEllipsis = (text: string, num: number) => {
  return `${text.slice(0, num)}...${text.slice(-num)}`;
};
export const etherToWei = (number: number) => {
  return utils.parseEther(`${number}`).toString();
};
export const etherToHex = (string: string | number) => {
  return utils.hexValue(string);
};
export const hexToNumber = (string: string) => {
  return BigNumber.from(string).toNumber();
};
export const weiToEther = (amount: string) => {
  return parseInt(amount) / Math.pow(10, 18);
};
export const maxAmount =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
export const tokenNames = ["blue", "bronze", "silver", "gold", "purple", "red"];
export const vip = [
  1, 2, 3, 5, 7, 8, 9, 1004, 11, 111, 1111, 11111, 22, 222, 2222, 22222, 33,
  333, 3333, 33333, 55, 555, 5555, 55555, 77, 777, 7777, 77777, 88, 888, 8888,
  88888, 99, 999, 9999, 99999, 100, 1000, 10000, 20000, 30000, 40000, 50000,
  60000, 70000, 80000, 90000, 100000,
];
type GroupData = {
  name: string;
  hashRate: number;
};
export const groupByHashName = (tokens: Token[]) => {
  const groupData: GroupData[] = [];

  tokens.forEach((item) => {
    const hashRate = item.hashRate;
    const name = item.name;

    const find = groupData.find(
      (x) => x.hashRate === hashRate && x.name === name
    );
    if (!find) {
      groupData.push({ name: name, hashRate: hashRate });
    }
  });
  return groupData;
};
export const getTokenName = (i: number) => {
  if (vip.includes(i)) return "vip";
  if (i <= 5000) return "blue";
  else if (i <= 20000) return "bronze";
  else if (i <= 35000) return "silver";
  else if (i <= 50000) return "gold";
  else if (i <= 65000) return "bronze";
  else if (i <= 75000) return "silver";
  else if (i <= 90000) return "purple";
  else if (i <= 100000) return "red";
  else return "blue";
};
export const setTokenInfo = (
  tokenId: number,
  hashRates: HashRate[],
  images: string[]
): Token => {
  let token = {
    tokenId: tokenId,
    name: "undefined NFT",
    img: "/MBTCs/NFT/blue.webp",
    hashRate: 0,
  };
  const filter = hashRates.filter(
    (hashRate) => tokenId >= hashRate.startAt && tokenId <= hashRate.endAt
  );
  if (filter.length === 1) {
    const index = filter[0].index;

    const image = images[index];
    const name = index < tokenNames.length ? tokenNames[index] : "blue";
    token = {
      tokenId: tokenId,
      name: getTokenName(tokenId),
      img: image,
      hashRate: filter[0].hashRate,
    };
  }
  return token;
};
export const getImageUrl = async (hashRates: HashRate[]) => {
  const images: string[] = [];
  for (const hash of hashRates) {
    const res = await axios.get(
      `https://mbtcs.s3.ap-northeast-2.amazonaws.com/json/${hash.startAt}.json`
    );
    const { image } = await res.data;
    images.push(image);
  }

  return images;
};
export const getNeworkInfo = () => {
  const net = process.env.NEXT_PUBLIC_IS_TESTNET;
  const isTest = net === "TESTNET";
  const chainId = isTest
    ? process.env.NEXT_PUBLIC_CHAIN_ID_TESTNET
    : process.env.NEXT_PUBLIC_CHAIN_ID_MAINNET;
  const name = isTest
    ? process.env.NEXT_PUBLIC_NAME_TESTNET
    : process.env.NEXT_PUBLIC_NAME_MAINNET;
  const symbol = isTest
    ? process.env.NEXT_PUBLIC_SYMBOL_TESTNET
    : process.env.NEXT_PUBLIC_SYMBOL_MAINNET;
  const rpc = isTest
    ? process.env.NEXT_PUBLIC_RPC_URL_TESTNET
    : process.env.NEXT_PUBLIC_RPC_URL_MAINNET;
  const explorer = isTest
    ? process.env.NEXT_PUBLIC_EXPLORER_TESTNET
    : process.env.NEXT_PUBLIC_EXPLORER_MAINNET;

  if (chainId && name && symbol && rpc && explorer) {
    return {
      chainId,
      name,
      symbol,
      rpc,
      explorer,
    };
  }
};
