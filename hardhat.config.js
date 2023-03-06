require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
            // forking: {
            //   url: MAINNET_RPC_URL,
            // }
        },
        // goerli: {
        //     chainId: 5,
        //     blockConfirmations: 6,
        //     url: GOERLI_RPC_URL,
        //     accounts: [PRIVATE_KEY],
        // },
    },
    solidity: {
        compilers: [{ version: "0.8.17" }, { version: "0.4.19" }, {version: "0.6.12"}],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user1: {
            default: 1,
        },
        user2: {
            default: 2,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    mocha: {
        timeout: 200000,
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
        },
    },
}
