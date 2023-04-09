// SPDX-License-Identifier: MIT

// pragma solidity >=0.8.2 <0.9.0;
// pragma solidity ^0.8.4; // tutorial pragma statement
pragma solidity >=0.8.4;


//github: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol
import "../nft-marketplace/node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

// (6:56:55) - Define a reentrancy guard contract to protect Marketplace.sol from reentrancy attacks
import "../nft-marketplace/node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {

    // state variables (6:57:13)
        // fees charged for each NFT sale
        // immutable means these variables can only be assigned once:
        address payable public immutable feeAccount; // the acct that receives fee payment (deployer/msg.sender)
        uint public immutable feePercent; // fee percentage for msg.sender

    // constructor function initialize fee %. Used in makeItem() below.
        uint public itemCount; 

    // struct added at (7:13:20)
        struct Item {
            uint itemId; //id of our struct
            IERC721 nft; //instance of the NFT contract associated with the NFT
            uint tokenId; // id of NFT being put for sale
            uint price; // price NFT set at.
            address payable seller; // address of NFT owner putting NFT up for sale
            bool sold; // default false
        }  

    // Event added (7:19:30) Log the (1) itemId, (2) index addy of NFT contract, (3) tokenId
    //                               (4) price, (5) price of item, (6) address of the seller
    // 2/3 indexes used to allow us to search for offered events by nft contract address or seller address
        event Offered (
            uint itemId,
            address indexed nft,
            uint tokenId,
            uint price,
            address indexed seller
        );

    // Add Bought Event at (7:31:00) - Additional field, indexed Buyer address that called the purchaseItem function
    // We use our 3rd index on buyer address so we can show all of the NFTS a buyer has purchased from the marketplace in our frontend 
    // by searching for Bought events and matching the buyer address as the key. buyer addy equal to account made purchase
        event Bought (
            uint itemId,
            address indexed nft,
            uint tokenId,
            uint price,
            address indexed seller, 
            address indexed buyer
        );

    // mapping (7:14:25) - special data structure in solidity. Key=>value store. Lookup based on Key.
    // itemId -> Item
       mapping(uint => Item) public items; 

        constructor (uint _feePercent) {
            feeAccount = payable(msg.sender);
            feePercent = _feePercent;
        }

    // (7:15:17) - function to make an Item Struct
            //(IERC721 _nft) Frontend User passes addy of contract & solidity will turn it into an NFT contract instance
            // nonReentrant modifier (7:16:18) inherited from openzeppelin's ReentrancyGuard.sol: https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard
            // prevents bad actors from calling makeItem function & then calling back into it before 1st call finished.
        function makeItem( IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
            // Increment ItemCount for items mapping below
            itemCount++;

            //check input price NOT zero
            require(_price > 0, "Price must be greater than zero.");

            // transfer NFT (1) From, (2) To (this CONTRACT Addy), (3) token ID (parameter)
            _nft.transferFrom(msg.sender, address(this), _tokenId);


            // (7:18:12) - Add new Item Struct to Items Mapping 
            items[itemCount] = Item (   //initialize a struct by calling it like a function & pass in required data fields:
                itemCount, //itemCount serves as our Item id
                _nft,
                _tokenId,
                _price,
                payable(msg.sender), // Seller set to account that called the makeItem fn & cast it as payable
                false
            );

        // (7:18:50) - We want makeItem() fn to Emit an EVENT which allows us to log data to the blockchain
        // You can use EVENTS as 
            // (1) A CHEAP form of  STORAGE, or
            // (2) A way to update USER INTERFACES (7:19:03)
        // To define an EVENT for our Item struct(?), Declare it at the top of K, just below Item Struct and EMIT below: 
        // Emit Offered event at (7:20:12):
            emit Offered(
                itemCount,
                address(_nft), //casting the contract address (7:20:34)
                _tokenId,
                _price,
                msg.sender
            );
        } // end of makeItem function

    // (7:26:05) - Add purchaseItem and getTotalPrice functions:
        // takes the Item ID that the user wants to purchase. Ether sent to seller and a small portion to the fee account
        function purchaseItem(uint _itemId) external payable nonReentrant {
            // (7:28:08) - Assign getTotalPrice() to variable _totalPrice:
            uint _totalPrice = getTotalPrice(_itemId); 

            // Assign item from `items` mapping to a variable. Since variable of a complex type (type Struct), we have to declare the storage location of the variable (7:28:24)
            // storage means this variable is reading directly from this storage mapping. It is NOT creating an in memory copy of the item.
            Item storage item = items[_itemId];

            // Check that the itemId is valid
            require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist"); 

            // Make sure that the ether sent with this function call (msg.value) is >= total price. (Amt sent >= totalPrice)
            require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");

            // Check item.sold bool value is false. Item not already sold. bang operator (!) sets item.sold to opposite boolean value:
            // If item.sold = false, then !item.sold = true, which triggers our custom error message
            // (7:29:42) If item.sold = true, then !item.sold = false and when require stmt's condition evaluates to false, it causes the function to REVERT!
            require(!item.sold, "item already sold"); 

            // Pay the seller and the feeAccount (both are of type address)
            item.seller.transfer(item.price); 
            feeAccount.transfer(_totalPrice - item.price);

            // Update bool value to true
            item.sold = true;

            // Transfer NFT to Buyer (7:30:23) - (1) From Addy, (2) To addy, (3) item identified by tokenId
            // The SENDER (msg.sender) of THIS function call (purchaseItem()) is the buyer
            // transferFrom called on the NFT.sol contract (?)
            item.nft.transferFrom(address(this), msg.sender, item.tokenId); 

            // (7:31:56) emit Bought event: 
            emit Bought(
                _itemId,
                address(item.nft),
                item.tokenId,
                item.price,
                item.seller,
                msg.sender
            );

        }

        // Gets price of Item which is (1) Cost set by seller + (2) market fees / fee account. Total Price is returned as uint.
        // we want to be able to call getTotalPrice() from within purchaseItem AND outside of this contract becuase
        // whenever a user wants to be able to buy an item, we need to know how much ether they need to send with the call to the puchaseItem function
        function getTotalPrice(uint _itemId) view public returns(uint) {
           //fetch price of items from the items mapping (7:27:38)
        //    return(items[_itemId].price*(100 * feePercent)/100);
           return((items[_itemId].price*(100 + feePercent))/100);
        }

}