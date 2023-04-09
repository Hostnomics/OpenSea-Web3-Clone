# OpenSea Clone by [Dapp University's YouTube Tutorial (06:19:28)](https://www.youtube.com/watch?v=cGQHXmCS94M&t=22768s).


**Node versions 16.14.0 to 17.0.1** are recommended for this tutorial, **to avoid dependency issues**.


[See the NVM Github Repository](https://github.com/nvm-sh/nvm).
    [_from tutorial by Michael-Kuehnel.de_](https://michael-kuehnel.de/node.js/2015/09/08/using-vm-to-switch-node-versions.html).

```js

node -v
// returned 19.4.0

nvm install 17.0.1
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


//switch back to 17.0.1: nvm use 17.0.1  // Now using node v17.0.1 (npm v8.1.0)
nvm use 16.14.0  // Now using node v16.14.0 (npm v8.3.1)

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


8. **(1) Hardhat Local Blockchain** and **(2) Run Our Deploy Script**
    - **(1)** (6:46:43) - Spin up LOCAL HardHat blockchain node (_get 20 unlocked ETH accounts_)

    > `npx hardhat node`

- 
    - **(2)** `(6:51:18)` - Run the changes we made in our `src/scripts/deploy.js`:

    > `npx hardhat run src/backend/scripts/deploy.js --network localhost`

```console
nft-marketplace % npx hardhat run src/backend/scripts/deploy.js --network localhost
Downloading compiler 0.8.4
Compiling 11 files with 0.8.4
Solidity compilation finished successfully
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000000000000000000000
NFT contract address 0x5FbDB2315678afecb367f032d93F642f64180aa3
                     0x5FbDB2315678afecb367f032d93F642f64180aa3

```


9. `(6:51:42)` - After Solidity Compilation successful (_in step 9_) start the **Hardhat Console**: 
    - `(6:54:09)` - **specify which network you want to use when entering the console**

> `npx hardhat console --network localhost`
-
    - instead of `npx hardhat console`

- **Close Hardhat console with `.exit`**

> `.exit`

- **Hardhat Console Commands**
    - Set `getContractAt("NAME-OF-Solidity-Contract", "Contract-Address-From-Terminal")`

    > `const contract = await ethers.getContractAt("NFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3")`

- Fix Error from running node 19 instead of node 16: 
    - **NODE VERSION ERROR** - See [This stack article. We switched to npm 16 and it fixed the issue](https://stackoverflow.com/questions/74726224/opensslerrorstack-error03000086digital-envelope-routinesinitialization-e).

Originally (when on node v19 b/c didn't realize when you open a new terminal within vs code, it defaults to globla node v19)

```console
nft-marketplace % npx hardhat console
Welcome to Node.js v17.0.1.
Type ".help" for more information.


> const contract = await ethers.getContractAt("NFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
Uncaught Error: error:0308010C:digital envelope routines::unsupported

```

```console
nft-marketplace % npx hardhat console
Welcome to Node.js v16.14.0.
Type ".help" for more information.

FIXED!!

> const contract = await ethers.getContractAt("NFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
undefined

> contract
[Returns all the details, see _Hardhat-NFT-Console-Details.MD_]

```

_See_ [**_Hardhat-NFT-Console-Details.MD_**](https://github.com/Hostnomics/OpenSea-Web3-Clone/blob/main/changelog-for-nft-marketplace/Hardhat-NFT-Console-Details.MD) (6:53:00)


9. (_continued_) Define tokenCount()

    > const tokenCount = await contract.tokenCount()

    > tokenCount

**RETURNS:** `BigNumber { value: "0" }`

```console
nft-marketplace % npx hardhat console --network localhost
Welcome to Node.js v16.14.0.
Type ".help" for more information.
> const contract = await ethers.getContractAt("NFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
undefined
> const tokenCount = await contract.tokenCount()
undefined
> tokenCount
BigNumber { value: "0" }

```

9. (_continued_) Set Contract name to variable `name` and symbol to `symbol`

    > const name = await contract.name()

    > const symbol = await contract.symbol()

```js

> const name = await contract.name()
undefined
> name
'dApp NFT'

> const symbol = await contract.symbol()
undefined
> symbol
'DAPP'

```


10. Testing
    - Run our first test `(7:09:35)` _(deployed NFT.sol contract returns correct NAME and SYMBOL)_ 

    > `npx hardhat test`

    


---
---


## Resources

1. ERC721 [Open Zeppelin Docs on ERC721 Standard](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721). [(6:36:12)](https://youtu.be/cGQHXmCS94M?t=23772).
    - https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721

2. getContractFactory method from [Ethers.js Documentation](https://docs.ethers.org/v5/). on the ethers object. `(6:48:33)`
    - Version 5: https://docs.ethers.org/v5/

3. Open Zeppelin IERC721.sol contract: 
    - https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol

    - Open Zeppelin's [ReentrancyGuard Docs](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) `(7:16:18)`


---
---



## Time Stamps of Interest

1. NFT.sol

2. **Deploy Script** in `src/backend/scripts/deploy.js` (6:47:28)

Deploy script SAVES the (1) **Contract Address** and (2) **ABI** to the frontend directory.
At `(6:48:54)` add the `getContractFactory()` and `deploy()` methods from **ethers.js**
```js

    // deploy contracts here:
    //Fetches an NFT contract factory: https://docs.ethers.org/v5/api/contract/contract-factory/
    const NFT = await ethers.getContractFactory("NFT"); //grabs our NFT.sol contract

    const nft = await NFT.deploy();
 
```


3. Interact with NFT.sol contract in Hardhat console
    - Node [Version error resolved via this ]
        - (_Norton security notice 10.0.0.XXX_ [can be ignored](https://www.quora.com/What-does-it-mean-if-Norton-Security-displays-a-notice-that-reads-The-computer-10-0-0-xxx-is-attempting-to-access-rapportd-on-your-computer-I-have-a-2017-MacBook-Air-running-Catalina-10-15-3).)
    - (6:53:00) - Use function `tokenCount()': [FunctionFragment],` in hardhat console


4. Build `Marketplace.sol` contract [(6:55:19)](https://youtu.be/cGQHXmCS94M?t=24919)

    - Covers [Solidity Interfaces at (6:56:14)](https://youtu.be/cGQHXmCS94M?t=24974) 
        - Interfaces defines how to call all the externally accessible functions of a smart contract (6:56:49)
        - (6:56:55) - Define a reentrancy guard contract to protect Marketplace.sol from reentrancy attacks

    - Modify deploy script to compile `Marketplace.sol` at `(6:59:14)`

    - Run the deploy script from terminal: 
        - `npx hardhat run src/backend/scripts/deploy.js --network localhost`
        - **NOTE:** Must run Hardhat node in another terminal first (`npx hardhat node`)
            - _See_ [Deploy Script Error When Not Running Hardhat Node First](https://github.com/Hostnomics/OpenSea-Web3-Clone/blob/main/changelog-for-nft-marketplace/Deploy_Script_Error_Without_HardHat_Node.md)

    - Interact with the `Marketplace.sol` contract: 
        - Start Hardhat Console
            - `npx hardhat console --network localhost`
        - Set Marketplace to variable `marketplace`
            - `const marketplace = await ethers.getContractAt("Marketplace", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")`
                - Contract Name: `Marketplace`
                - Terminal Address: Marketplace contract address `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`

        - Fetch the Fee Percent on the Marketplace:
            - `const feePercent = await marketplace.feePercent()`
                - Variable set in _feePercent constructor: `feePercent = _feePercent;`
                - Returns `BigNumber { value: "1" }` for the 1% we set in the deploy script:
                    - `const marketplace = await Marketplace.deploy(1); `
        - Fetch feeAccount()
            - `const seller = await marketplace.feeAccount()`
            - Returns: _(msg.sender is the 0th account created by Hardhat node)_
            ```js
                > const deployer = await marketplace.feeAccount
                undefined
                > deployer
                [Function (anonymous)]
                > const seller = await marketplace.feeAccount()
                undefined
                > seller
                '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
            ```
        

5. Testing [(7:02:40)](https://youtu.be/cGQHXmCS94M?t=25360)

    - Bugs cost more in Web3
        - Every time we make a change to our contract. Each time we implement some functionality to our smart contract, we need to test it out to make sure it's doing what we expect it to do.
        - so we write test scripts which automate this testing process. 
        - Testing Smart Contracts is very important b/c **once a contract has been deployed, you can't change its code.**
            - It's not like web 2 development where we can easily push out bug fixes after you've deployed your app. 
        - `(7:03:25)` - The cost of bugs for **Smart Contract Developers** is **much higher.**
            - So writing robust tests for your smart contracts is an integral part of your development process. 

    - **Create Tests Directory** `(7:04:00)`
        - Create `src/backend/test`
        - Use [Waffle](https://getwaffle.io) and [Chai](https://www.chaijs.com/)    
    
    - Run our first test `(7:09:35)` _(deployed NFT.sol contract returns correct NAME and SYMBOL)_ 
        - `npx hardhat test`

        ```js

        nft-marketplace % npx hardhat test


        NFTMarketplace
            Deployment
            ✓ Should track name and symbol of nft collection


        1 passing (550ms)

        ```

8. Finish Building out `Marketplace.sol` [(7:12:35)](https://youtu.be/cGQHXmCS94M?t=25955)

    - Add `struct Item` `(7:13:21)` - _Solidity equivalent of JavaScript Objects_.
    - Open Zeppelin's [ReentrancyGuard Docs](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) `(7:16:18)`

    - Add `purchaseItem` and `getTotalPrice` functions at `(7:26:05)`

    - Add `Bought` event `(7:31:00)`

    - Write tests for our new `purchaseItem` and `getTotalPrice` functions at `(7:32:29)`


7. Build Frontend [()]()
        
        
