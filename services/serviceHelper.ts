// import Web3 from "web3";
import { ethers } from "ethers";

export function promiseWrapper(func: any, param?: any) {
  return new Promise(async (resolve, reject) => {
    try {
      if (param == null) {
        resolve(await func());
      } else {
        resolve(await func(param));
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function contractHelper(
  wallet: Wallet,
  abi: ABI[] | ABI,
  contractAddress: string
) {
  if (wallet.metamask) {
  } else {
    console.log("wallet not connected");
  }

  if (contractAddress == null) {
    console.log("contract address not set");
  }

  async function _smartContractCall(func_name: string, ...args: any[]) {
    const node =
      process.env.NEXT_PUBLIC_IS_TESTNET === "TESTNET"
        ? process.env.NEXT_PUBLIC_NODE_ENDPOINT_TESTNET
        : process.env.NEXT_PUBLIC_NODE_ENDPOINT_MAINNET;
    let provider;
    if (wallet.eoa)
      provider = new ethers.providers.Web3Provider(
        window.ethereum.providers?.find(
          (provider: any) => provider.isMetaMask
        ) || window.ethereum
      );
    else provider = new ethers.providers.JsonRpcProvider(node);
    // if (wallet.eoa) {
    const ABI = new ethers.utils.Interface(abi);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    return new Promise<any>(async (resolve, reject) => {
      try {
        await contract[func_name](...args).then((result: any) => {
          resolve(result);
        });
      } catch (err) {
        console.log(func_name, args);
        console.log(err);
        reject(false);
      }
    });
    // }
    // } else {
    //   console.log("wallet not connected");
    // }
  }
  async function _smartContractExecute(func_name: string, ...args: any[]) {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum.providers?.find((provider: any) => provider.isMetaMask) ||
        window.ethereum
    );
    const ABI = new ethers.utils.Interface(abi);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const contractWithSigner = contract.connect(signer);
    if (wallet.metamask) {
      return new Promise<any>(async (resolve, reject) => {
        try {
          const tx = await contractWithSigner[func_name](...args);
          await tx.wait();
          resolve(true);
          // const gas = await contractWithSigner[func_name](...args).estimateGas({
          //   from: wallet.eoa,
          // });
          // const gasPrice = await provider.getGasPrice();
          // console.log(gasPrice);
          // .on("transactionHash", function (hash: string[]) {})
          // .on("receipt", function (receipt: string[]) {
          //   resolve(true);
          // })
          // .on("error", function (err: string) {
          //   reject(false);
          // });
        } catch (err) {
          console.log(err);
          reject(false);
        }
      });
    } else {
      console.log("wallet not connected");
    }
  }

  async function _smartContractExecuteWithValue(
    func_name: string,
    value: string,
    ...args: string[]
  ) {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum.providers?.find((provider: any) => provider.isMetaMask) ||
        window.ethereum
    );
    const ABI = new ethers.utils.Interface(abi);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const contractWithSigner = contract.connect(signer);
    if (wallet.metamask) {
      return new Promise<any>(async (resolve, reject) => {
        try {
          const tx = await contractWithSigner[func_name](...args);
          await tx.wait();
          resolve(true);
          // const gas = await contract.methods[func_name](...args).estimateGas({
          //   from: wallet.eoa,
          //   value: `${value}`,
          // });
          // console.log(gas);

          // .on("transactionHash", function (hash: string[]) {})
          // .on("receipt", function (receipt: string[]) {
          //   resolve(true);
          // })
          // .on("error", function (err: string) {
          //   reject(false);
          // });
        } catch (err) {
          reject(false);
        }
      });
    } else {
      console.log("wallet not connected");
    }
  }

  function Call(func_name: string, ...args: any[]) {
    return _smartContractCall(func_name, ...args);
  }

  function Send(func_name: string, ...args: any[]) {
    return _smartContractExecute(func_name, ...args);
  }

  function SendValue(func_name: string, value: string, ...args: any[]) {
    return _smartContractExecuteWithValue(func_name, value, ...args);
  }

  return {
    Call,
    Send,
    SendValue,
  };
}
