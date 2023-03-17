import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config({ path: '.env' });

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    "ganache": {
      url: "http://127.0.0.1:7545",
      accounts: [process.env.PRIVATE_KEY_GANACHE],
    },
    "goerli": {
      url: "https://goerli.nodeguardians.io",
      accounts: [process.env.PRIVATE_KEY],
    }, 
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

export default config;
