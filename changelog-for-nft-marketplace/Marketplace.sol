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

        }


}