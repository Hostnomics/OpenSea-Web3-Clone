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

    // constructor function initialize fee %
        uint public itemCount;

        constructor (uint _feePercent) {
            feeAccount = payable(msg.sender);
            feePercent = _feePercent;
        }

}