## ERROR MESSAGE: Trying to deploy contract to localhost without running HardHat Node First:

Occured around [(7:00:10)](https://youtu.be/cGQHXmCS94M?t=25210)

**ERROR MESSAGE** after killing terminal running node (`npx hardhat node`):

```console
nft-marketplace % npx hardhat run src/backend/scripts/deploy.js --network localhost
Compiling 2 files with 0.8.4
Solidity compilation finished successfully
HardhatError: HH108: Cannot connect to the network localhost.
Please make sure your node is running, and check your internet connection and networks config
    at HttpProvider._fetchJsonRpcResponse (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/node_modules/hardhat/src/internal/core/providers/http.ts:176:15)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at HttpProvider.request (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/node_modules/hardhat/src/internal/core/providers/http.ts:55:29)
    at GanacheGasMultiplierProvider._isGanache (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/node_modules/hardhat/src/internal/core/providers/gas-providers.ts:317:30)
    at GanacheGasMultiplierProvider.request (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/node_modules/hardhat/src/internal/core/providers/gas-providers.ts:306:23)
    at EthersProviderWrapper.send (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)
    at getSigners (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/node_modules/@nomiclabs/hardhat-ethers/src/internal/helpers.ts:45:20)
    at main (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/src/backend/scripts/deploy.js:3:22)

    Caused by: FetchError: request to http://127.0.0.1:8545/ failed, reason: connect ECONNREFUSED 127.0.0.1:8545
        at ClientRequest.<anonymous> (/Users/web3dev/Documents/blockchain-dev-projects/dapp-university/opensea-clone/nft-marketplace/node_modules/node-fetch/lib/index.js:1505:11)
        at ClientRequest.emit (node:events:520:28)
        at Socket.socketErrorListener (node:_http_client:442:9)
        at Socket.emit (node:events:520:28)
        at emitErrorNT (node:internal/streams/destroy:157:8)
        at emitErrorCloseNT (node:internal/streams/destroy:122:3)
        at processTicksAndRejections (node:internal/process/task_queues:83:21)

```

**STARTED `npx hardhat node` BACK UP AGAIN and DEPLOY SCRIPT WORKED:***

```console

nft-marketplace % npx hardhat run src/backend/scripts/deploy.js --network localhost
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000000000000000000000
NFT contract address 0x5FbDB2315678afecb367f032d93F642f64180aa3
Marketplace contract address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

```
---