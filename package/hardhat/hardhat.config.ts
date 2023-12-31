import "@nomicfoundation/hardhat-verify";
import { goerli } from "./constants/constants";
import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";

import * as dotenv from "dotenv";
dotenv.config();

const config: any = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || "",
      xdai: process.env.GNOSISSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      aurora: process.env.AURORA_MAINNET_RPC || "",
      auroratestnet: process.env.AURORA_TESTNET_RPC || "",
      fvm: process.env.FVMSCAN_API_KEY || "",
      fvmtestnet: process.env.FVMTESTNET_API_KEY || ""
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
      chainId: 1337,
    },
    goerli: {
      accounts: [process.env.PRIVATE_KEY || ""],
      url: process.env.ETHEREUM_GOERLI_RPC_URL || "",
      chainId: 5
    },
    // fvmtestnet: {
    //   url: process.env.FVMTESTNET_RPC_URL || "",
    //   accounts: [process.env.FVMPK || ""],
    //   chainId: 314159
    // },
    // fvm: {
    //   url: process.env.FVMRPCURL || "",
    //   accounts: [process.env.FVMPK || ""],
    //   chainId: 314
    // },
    gnosis: {
      url: process.env.GNOSISRPCURL || "",
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 100,
    },
    // aurora: {
    //   allowUnlimitedContractSize: true,
    //   url: process.env.AURORA_MAINNET_RPC || "",
    //   accounts: [process.env.GNOSISPK || ""],
    //   chainId: 1313161554,
    // },
    // auroratestnet: {
    //   allowUnlimitedContractSize: true,
    //   url: process.env.AURORARPC || "",
    //   accounts: [process.env.GNOSISPK || ""],
    //   chainId: 1313161555,
    // },
    // mainnet: {
    //   url: process.env.MAINNET_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    //   chainId: 1,
    // },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
      5: 0,
      100: 0
    },
  },
  // typechain: {
  //   outDir: "../frontend/src/typechain",
  // },
  paths: {
    deployments: "../frontend/src/deployments",
  },
};

export default config;
