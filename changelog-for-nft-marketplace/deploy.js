async function main() {

    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    // deploy contracts here: (6:48:54)
    // See ContractFactory Ethers Docs Here: https://docs.ethers.org/v5/api/contract/contract-factory/
      const NFT = await ethers.getContractFactory("NFT"); //grabs our NFT.sol contract
      const nft = await NFT.deploy();
  
  // (6:59:25) deploy Marketplace.sol
      const Marketplace = await ethers.getContractFactory("Marketplace");
      const marketplace = await Marketplace.deploy(1); //pass sales fee % as parameter for _feePercent constructor
  
      // await response from blockchain. More on JS Promises to handle asynchronous function calls.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  
    
    // (6:51:12) - console log nft address
      console.log("NFT contract address", nft.address);
    // (6:59:49) - console log marketplace address
      console.log("Marketplace contract address", marketplace.address);
  
    // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
    saveFrontendFiles(nft, "NFT"); // Parameters Added (6:51:04)
    saveFrontendFiles(marketplace, "Marketplace"); //(6:59:52): https://github.com/dappuniversity/nft_marketplace/blob/main/src/backend/scripts/deploy.js
  }
  
  function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../../frontend/contractsData";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
  
    const contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  