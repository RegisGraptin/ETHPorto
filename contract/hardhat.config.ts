import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config({ path: '.env' });

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://goerli.nodeguardians.io",
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};

export default config;
