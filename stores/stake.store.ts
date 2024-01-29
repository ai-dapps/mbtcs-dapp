import { isBetween } from "@utils/common";
import {
  etherToHex,
  groupByHashName,
  hexToNumber,
  weiToEther,
} from "@utils/crypto";
import { create } from "zustand";

type StakeStore = {
  distributions: Distribution[];
  stakedToken: Token[];
  stakedTokenTypes: StakableToken[];
  unstakedToken: Token[];
  unstakedTokenTypes: TokenTypes[];
  unstakableToken: StakableToken[];
  hashRate: HashRate[];
  mbtcBalance: number;
  fuelBalance: number;
  setHashRate: (hashRate: HashRate[]) => void;
  setDistributions: (
    distributions: Distribution[],
    hashRate: HashRate[]
  ) => void;
  setUnstakedToken: (token: Token[]) => void;
  setBalance: (mbtcBalance: number, fuelBalance: number) => void;
};

export const stakeStore = create<StakeStore>((set, get) => ({
  distributions: [],
  stakedToken: [],
  unstakedToken: [],
  hashRate: [],
  stakedTokenTypes: [],
  unstakedTokenTypes: [],
  unstakableToken: [],
  mbtcBalance: 0,
  fuelBalance: 0,
  setHashRate: (hashRate) => set({ hashRate: hashRate }),
  setDistributions: (distributions, hashRate) => {
    const stakedTokenTypes: StakableToken[] = [];
    const unstakableToken: StakableToken[] = [];
    const active = distributions.filter(
      (dist) =>
        isBetween(dist.startingTimestamp, dist.endingTimestamp) === "Active"
    );
    const ended = distributions.filter(
      (dist) =>
        isBetween(dist.startingTimestamp, dist.endingTimestamp) === "Ended"
    );

    if (active.length > 0) {
      const group = groupByHashName(active[0].stakedToken);

      group.forEach((gr) => {
        const filter = active[0].stakedToken.filter(
          (item) => item.name === gr.name && item.hashRate === gr.hashRate
        );
        if (filter.length > 0)
          stakedTokenTypes.push({
            contract: active[0].contract,
            tokenIds: filter.sort((a, b) => a.tokenId - b.tokenId),
            name: gr.name,
            img: filter[0].img,
            hashRate: filter[0].hashRate,
            index: 0,
          });
      });
    }
    if (ended.length > 0) {
      let counter = 0;
      ended.forEach((dist) => {
        const group = groupByHashName(dist.stakedToken);

        group.forEach((gr) => {
          const filter = dist.stakedToken.filter(
            (item) => item.name === gr.name && item.hashRate === gr.hashRate
          );
          if (filter.length > 0) {
            unstakableToken.push({
              contract: dist.contract,
              tokenIds: filter.sort((a, b) => a.tokenId - b.tokenId),
              name: gr.name,
              img: filter[0].img,
              hashRate: filter[0].hashRate,
              index: counter,
            });
            counter++;
          }
        });
      });
    }
    console.log(stakedTokenTypes);
    console.log(unstakableToken);

    set({ distributions: distributions, stakedTokenTypes, unstakableToken });
  },

  setUnstakedToken: (token) => {
    const tokenTypes: TokenTypes[] = [];
    const group = groupByHashName(token);

    group.forEach((gr) => {
      const filter = token.filter(
        (item) => item.name === gr.name && gr.hashRate === item.hashRate
      );
      if (filter.length > 0)
        tokenTypes.push({
          tokenIds: filter.sort((a, b) => a.tokenId - b.tokenId),
          name: gr.name,
          img: filter[0].img,
          hashRate: filter[0].hashRate,
        });
    });

    set({ unstakedToken: token, unstakedTokenTypes: tokenTypes });
  },
  setBalance: (mbtcBalance, fuelBalance) => set({ mbtcBalance, fuelBalance }),
}));
