# OpenSea Clone by [Dapp University's YouTube Tutorial (06:19:28)](https://www.youtube.com/watch?v=cGQHXmCS94M&t=22768s).


**Node versions 16.14.0 to 17.0.1** are recommended for this tutorial, **to avoid dependency issues**.


[See the NVM Github Repository](https://github.com/nvm-sh/nvm).
    [_from tutorial by Michael-Kuehnel.de_](https://michael-kuehnel.de/node.js/2015/09/08/using-vm-to-switch-node-versions.html).

```js

node -v
// returned 19.4.0

node install 17.0.1
// Downloading and installing node v17.0.1...
// Downloading https://nodejs.org/dist/v17.0.1/node-v17.0.1-darwin-arm64.tar.xz...
// ####################################################################################################################################################### 100.0%
// Computing checksum with shasum -a 256
// Checksums matched!
// Now using node v17.0.1 (npm v8.1.0)


//LIST all installed versions to switch to: 
nvm ls 
// ->      v17.0.1
//        v18.13.0
//         v19.4.0
// default -> node (-> v19.4.0)

//switch back to 19.4.0
nvm use 19.4.0
// Now using node v19.4.0 (npm v9.4.0)


//switch back to 17.0.1:
nvm use 17.0.1
// Now using node v17.0.1 (npm v8.1.0)

```

## Commands For This Tutorial

1. Install Version 2.8.4 of [HardHat](https://hardhat.org/docs).

> `npm install --save-dev hardhat@2.8.4`

2. Clone the Project Starter Template from the [Project Github Repository](https://github.com/dappuniversity/starter_kit_2). and call the project `nft-marketplace`:

> `git clone https://github.com/dappuniversity/starter_kit_2 nft-marketplace`

3. cd into the project directory (`nft-marketplace`) and Install the project dependencies: 

> `npm install`

4. Install the **React Router DOM** dependencies from within our `nft-marketplace` directory: 

> `npm install react-router-dom@6`

5. Install the **IPFS http client**: (links and **upload the form to mint**!!) [(06:28:45)](https://youtu.be/cGQHXmCS94M?t=23325).

> `npm install ipfs-http-client@56.0.1`

6. Finally, install **Open Zeppelin** https://www.openzeppelin.com/contracts

> `npm i @openzeppelin/contracts@4.5.0`

7. Fire up npm server

> `npm run start`





---
---


## Resources

1. ERC721 [Open Zeppelin Docs on ERC721 Standard](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721). [(6:36:12)](https://youtu.be/cGQHXmCS94M?t=23772).






