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


    // (07:20:39) - Added "Making marketplace ITEMS" test
        describe("Making marketplace items", function (){
            // ReferenceError: price is not defined
                let price = 1
                beforeEach(async function() {
                    // addr1 mints an nft 
                    await nft.connect(addr1).mint(URI)    
                    // addr1 approves marketplace to spend nft
                    await nft.connect(addr1).setApprovalForAll(marketplace.address, true)            
                }) // beforeEach: marketplace items header

    // (17:21:34) - Success Case Test create Item, makeItem() and event Offered
            it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
                // addr1 offers their nft at a price at 1 ether
                // Price set to Wei (7:22:01)
                await expect(marketplace.connect(addr1).makeItem(nft.address, 1, toWei(price)))
                    .to.emit(marketplace, "Offered")
                    .withArgs(
                        1,
                        nft.address,
                        1,
                        toWei(price),
                        addr1.address
                    )
                
                // (7:23:35): 2nd expect stmt
                // ownerOf fn on the nft contract is equal to the marketplace address
                expect(await nft.ownerOf(1)).to.equal(marketplace.address); 
                // Item count (after 1 item created) should now be equal to 1
                expect(await marketplace.itemCount()).to.equal(1);

                // Get first newly created item from items mapping, by itemID Key 1
                const item = await marketplace.items(1)
                expect(item.itemId).to.equal(1)
                expect(item.nft).to.equal(nft.address)
                expect(item.tokenId).to.equal(1)
                expect(item.price).to.equal(toWei(price))
                expect(item.sold).to.equal(false)
            }) // IT: new items, transfer, event header

    // (17:24:38) - FAILURE Case Test create Item, makeItem() and event Offered
    it("Should fail if price is set to zero", async function () {
        await expect(
            marketplace.connect(addr1).makeItem(nft.address, 1, 0)
        ).to.be.revertedWith("Price must be greater than zero.");
    }) // IT: fail if price 0 header

}); // "Making Items" describe header


// (7:32:34) - Purchase items in Marketplace.sol tests:
describe("Purchasing marketplace items", function (){
    //this local price fn will be 2 ether
    let price = 2;

    let totalPriceInWei //move totalPriceInWei outside of success case so it's available to both (success and fail cases) (7:37:59)

    //Add the beforeEach hook: 
    beforeEach(async function() {
        // addr1 mints an nft 
        await nft.connect(addr1).mint(URI)    
        // addr1 approves marketplace to spend nft
        await nft.connect(addr1).setApprovalForAll(marketplace.address, true)     
        // addr1 makes their nft a marketplace item (7:32:51) - 
        // calls makeItem() fn, to list nft on marketplace at a price of 2 ether
        await marketplace.connect(addr1).makeItem(nft.address, 1, toWei(price))             
    }) // beforeEach: "Purchasing items" header


// (7:33:20) - Success case
    it("Should update item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async function () {
    // Seller and Fee Account Balance BEFORE transfer (so we can check later that they increased by the appropriate amount)
        const sellerInitialEthBal = await addr1.getBalance()
        const feeAccountInitialEthBal = await deployer.getBalance()

        // fetch the Total Price of the item (price + market fees)
        totalPriceInWei = await marketplace.getTotalPrice(1); // itemId = 1

        //(7:34:04) addr 2 purchases item  (pass amount in as meta data object "{ value: X }")
        await expect(marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })).to.emit(marketplace, "Bought").withArgs(
            1,
            nft.address,
            1,
            toWei(price),
            addr1.address,
            addr2.address
        )
    // Seller and Fee Account Balance AFTER transfer
        const sellerFinalEthBal = await addr1.getBalance()
        const feeAccountFinalEthBal = await deployer.getBalance()
    
// Compare Final Balances to Initial Balances (07:35:10)
    // Seller should receive payment for the price of the NFT sold.
        // Seller FINAL Bal = Initial BAL + NFT PRICE)
        expect(+fromWei(sellerFinalEthBal)).to.equal(+price + +fromWei(sellerInitialEthBal))
    // feeAccount should receive fee
        // feeAccount FINAL Bal = Initial BAL + feeAmount)
        const fee = (feePercent/100) * price
        expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitialEthBal))

    // (7:36:12) Buyer (addr2) should now own the nft (ownerOf(_tokenId))
        expect(await nft.ownerOf(1)).to.equal(addr2.address)

    // Make sure bool set to true when item sold
        expect((await marketplace.items(1)).sold).to.equal(true)

    }) // IT Success: "sold, paid, transfer. fees, Bought event" header

// (7:37:00) - FAIL case 
    it("Should fail for invalid item ids, sold items and when not enough ether is paid", async function () {
        // fails for invalid item ids.  Pass purchaseItem (2) which is greater than the itemCount and (0) which is less than itemCount, which is 1.
        await expect(
            marketplace.connect(addr2).purchaseItem(2, {value: totalPriceInWei})
        ).to.be.revertedWith("item doesn't exist")

        await expect(
            marketplace.connect(addr2).purchaseItem(0, {value: totalPriceInWei})
        ).to.be.revertedWith("item doesn't exist")

        // Fails when not enough ether is paid with the transaction. 
        // In this instance, fails when buyer only sends enough ether to cover the price of the nft
        // not the additional market fee.
                                                    // {value: X} should be totalPriceInWei, NOT price
        await expect(
            marketplace.connect(addr2).purchaseItem(1, {value: toWei(price)})
        ).to.be.revertedWith("not enough ether to cover item price and market fee")

        // addr2 purchases item 1
        await marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })

    // Deployer (Address at array index 0) tries purchasing item 1 after its been sold. 
        // github defines deployer this way: const addr3 =      addrs[0] and then marketplace.connect(addr3)...                 
        // tutorial defined deployer at the very top with =     "let deployer, addr1, addr2, nft, marketplace;"
                        // array_addresses[0]
        await expect(
            marketplace.connect(deployer).purchaseItem(1, { value: totalPriceInWei })
        ).to.be.revertedWith("item already sold");
    })
// (7:38:51) - FAIL case completed.
}); // Purchasing marketplace items describe header


}) //NFTMarketplace describe header


// See (https://github.com/dappuniversity/nft_marketplace/blob/main/src/backend/test/NFTMarketplace.test.js)


