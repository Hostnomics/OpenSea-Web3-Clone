// SPDX-License-Identifier: MIT

// pragma solidity >=0.8.2 <0.9.0;
pragma solidity >=0.8.4;

//Import ERC721 Standard: https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721
import "../../nft-marketplace/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// MAIN Funcions we'll be using: 
    // 1. transferFrom(from, to, tokenId)
    // 2. approve(to, tokenId)


contract NFT is ERC721URIStorage {

    // state variables (6:39:10) - stored to blockchain. Whenever function modifies state variable, it costs gas to modify the blockchain
    // statically typed language. 
    uint public tokenCount; //(6:46:05) - Solidity initializes at 0 for our tokenCount (Default value "0" for uint datatype)

    constructor() ERC721("dApp NFT", "DAPP"){}

    function mint(string memory _tokenURI) external returns(uint){
        tokenCount++;   //6:44:05
        _safeMint(msg.sender, tokenCount);  //6:44:44 - get the token ID from the tokenCount
        _setTokenURI(tokenCount, _tokenURI); //6:44:55 fn _setTokenURI sets the META DATA for newly minted NFT, (1) token ID, (2) _tokenURI passed in
        return(tokenCount); //6:45:20 - we return the token ID of minted NFT from tokenCount
    }

}