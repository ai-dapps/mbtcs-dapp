import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";

declare global {
  /* Common */
  interface childrenProps {
    children: React.ReactNode;
  }

  /* Web3 */
  type TxState = "ready" | "open" | "pending" | "success" | "fail";
  type HashRate = {
    startAt: number;
    endAt: number;
    hashRate: number;
    index: number;
  };
  type NewHashRate = {
    startAt: string;
    endAt: string;
    hashRate: string;
  };
  type Distribution = {
    contract: string;
    TVL: number;
    stakedToken: Token[];
    fuelFee: number;
    receipt?: number[];
    claimable: number;
    claimed: number;
    startingTimestamp: number;
    endingTimestamp: number;
    rewardAmount: number;
    index: number;
  };
  type Token = {
    tokenId: number;
    name: string;
    img: string;
    hashRate: number;
  };
  type TokenTypes = {
    tokenIds: Token[];
    name: string;
    img: string;
    hashRate: number;
  };
  type StakableToken = {
    contract: string;
    tokenIds: Token[];
    name: string;
    img: string;
    hashRate: number;
    index: number;
  };
  type ABI = AbiItem;
  interface Window {
    ethereum?: any;
  }
  type Wallet = {
    metamask: boolean;
    balance: number;
    eoa: string | null;
    chainId: string | null;
  };
  type Receipt = {
    tokenID: BigNumber;
    staked: boolean;
    index: BigNumber;
  };
  /* Layout */
  interface SectionLayoutProps extends childrenProps {
    id: string;
    className?: string;
    shadow?: boolean;
  }
  interface MainNavItemProps {
    to: string;
    className?: string;
    onClick?: () => void;
  }
  interface AppNavItemProps {
    to: string;
    className?: string;
    colorCSS: string;
    onClick?: () => void;
  }
  interface GradientProps extends childrenProps {
    className?: string;
    condition: boolean;
    colorCSS?: string;
  }
  interface DropdownProps {
    className: string;
    dropdownList: SelectOption[];
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
  }
  interface ButtonProps {
    str: string;
    onClick: () => void;
    className?: string;
    id?: string;
    comingsoon?: boolean;
  }

  /* Components */
  interface SocialIconsProps {
    size: number;
    className: string;
  }
  interface StakeFilterProps {
    tokens: StakableToken[];
    setToken: Dispatch<SetStateAction<Token[]>>;
    setContract: Dispatch<SetStateAction<string>>;
  }
  interface MinerFilterProps {
    name: string;
    tokens: TokenTypes[];
    setToken: Dispatch<SetStateAction<Token[]>>;
  }
  interface UnstakableFilterProps {
    name: string;
    tokens: StakableToken[];
    setToken: Dispatch<SetStateAction<Token[]>>;
    setContract: Dispatch<SetStateAction<string>>;
  }

  interface SelectOption {
    value: number;
    name: string;
    direction: boolean;
  }

  /* Store */
  interface MenuState {
    currentMenu: string;
    setCurrentMenu: (id: string) => void;
  }

  /* Hooks */
  type FactoryCreateDistProps = {
    reward: string;
    stake: string;
    fuel: string;
    amount: string;
    start: string;
    end: string;
    locked: boolean;
    cap: string;
  };
  type TransferFromProps = {
    from: string;
    to: string;
    tokenId: string;
  };
  type AirdropProps = {
    to: string;
    amount: string;
  };
}
