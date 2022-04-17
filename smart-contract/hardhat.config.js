
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.2',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/a6pDzNB-5uBfz3aVPdYDBLWWfIjun2E3',
      accounts: [
        '25e5afbad68ee741b3a81c3bd7cd12aa88ddd042580ad5a07f1336cf4260901e',
      ],
    },
  },
}
