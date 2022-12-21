/** @type import('hardhat/config').HardhatUserConfig */
require ("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY = `rCFZrVpwbjTsIPZ54zO00vFrr7Y2hoyN`;
const GOERLI_PRIVATE_KEY=`0db2bcac0139151b30775b30d4b5bee1808c0c55af6908426fcfd087aaf35196`;
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${GOERLI_PRIVATE_KEY}`]
    }
  }
};
