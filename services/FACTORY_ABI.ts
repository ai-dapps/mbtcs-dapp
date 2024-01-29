export const FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "deployedAt",
        type: "address",
      },
    ],
    name: "DistributionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_rewardTokenAddresses",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_stakableTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_fuelTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_rewardAmounts",
        type: "uint256[]",
      },
      {
        internalType: "uint64",
        name: "_startingTimestamp",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "_endingTimestamp",
        type: "uint64",
      },
      {
        internalType: "bool",
        name: "_locked",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_stakingCap",
        type: "uint256",
      },
    ],
    name: "createDistribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "distributions",
    outputs: [
      {
        internalType: "contract IERC721StakingRewardsDistribution",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fuelFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDistributionsAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "index",
        type: "uint64",
      },
    ],
    name: "getHashRate",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "startAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hashRate",
            type: "uint256",
          },
        ],
        internalType:
          "struct IERC721StakingRewardsDistributionFactory.HashRate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hashCounter",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resumeStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fuelFee",
        type: "uint256",
      },
    ],
    name: "setFuelFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_hashCounter",
        type: "uint64",
      },
    ],
    name: "setHashCounter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_index",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "_startAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_hash",
        type: "uint256",
      },
    ],
    name: "setHashRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    name: "upgradeImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
