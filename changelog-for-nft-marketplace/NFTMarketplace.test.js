//Tests for both (1) NFT.sol and Marketplace.sol Created at (7:04:23): https://youtu.be/cGQHXmCS94M?t=25463

//Use Waffle (getwaffle.io) and Chai (https://www.chaijs.com/)

const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("NFTMarketplace", async function(){

    let deployer, addr1, addr2, nft, marketplace;
    let feePercent = 1;
    let URI = "Sample URI" //(Set fake Metadata at 7:11:23)
// (7:07:32) - beforeEach() hook lets us run this for each test instead of repeating it at beginning of each test.
    beforeEach(async function () {
            //Get the contract factories for each like in deploy.js 
            const NFT = await ethers.getContractFactory("NFT"); 
            const Marketplace = await ethers.getContractFactory("Marketplace");

            // getSigners() for each of the 20 fake Hardhat accounts (signers = astractions of ethereum accounts)
            // We want deployer first, array should be [deployer, addr1, addr2] = await ethers.getSigners()
            // [] = await ethers.getSigners(); //getSigners() returns array
            [deployer, addr1, addr2] = await ethers.getSigners(); 

            // Deploy the contracts as we did in deploy.js:
            // const nft = await NFT.deploy();
            // const marketplace = await Marketplace.deploy(1);
            nft = await NFT.deploy();
            marketplace = await Marketplace.deploy(feePercent);
    }); //beforeEach header

// (07:08:00) - Write First test to make sure each contract was deployed to the network correctly:
    describe("Deployment", function(){
            //(1) string description, (2) pass in async function
            it("Should track name and symbol of NFT.sol contract.", async function(){
                // (7:08:30) - use "expect" from the imported chai library:
                expect( await nft.name()).to.equal("dApp NFT")
                expect( await nft.symbol()).to.equal("DAPP")
            }) // nft.name and nft.symbol it header

            it("Should track feeAccount and feePercent of the Marketplace.sol contract.", async function(){
                expect( await marketplace.feeAccount()).to.equal(deployer.address)
                expect( await marketplace.feePercent()).to.equal(feePercent)
            }) // feeAccount and feePercent it header        
    }) // "Deployment" describe header


// (07:10:30) - Write tests on mint()
    describe("Minting NFTs", function (){
            it("Should track each minted NFT", async function(){
                // addr1 mints an nft 
                await nft.connect(addr1).mint(URI) //URI metadata, set "URI" variable above (7:11:23)
                expect(await nft.tokenCount()).to.equal(1) //tokenCount initializes at 0, so addr1 is tokenCount = 1
                expect(await nft.balanceOf(addr1.address)).to.equal(1)
                expect(await nft.tokenURI(1)).to.equal(URI)

                // addr2 mints an nft
                await nft.connect(addr2).mint(URI) //URI metadata, set "URI" variable above (7:11:23)
                expect(await nft.tokenCount()).to.equal(2) //tokenCount initializes at 0, so addr2 is tokenCount = 2
                expect(await nft.balanceOf(addr2.address)).to.equal(1)
                expect(await nft.tokenURI(2)).to.equal(URI)

            }) // NFT.sol "it" header for the first two NFTs minted ("addr1" and "addr2")

    }) // "Minting NFTs" describe header



}) //NFTMarketplace describe header


