
import logo from './logo.png';
import './App.css'; 

// At (7:41:36) import the ethers.js library to allow our frontend to talk to ethereum nodes
import { ethers } from "ethers";

// At (7:43:26) - Using React's useState Hook, we can store the MetaMask accounts requested in `web3Handler`
import { useState } from 'react';

// At (7:45:23) import deployed contracts addresses and abi: 
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'


function App() {

    // At (7:43:29) - add state for our account:
    const [account, setAccount] = useState(null)

// At (7:45:27) set the state variables for loadContracts() function: 
    const [marketplace, setMarketPlace] = useState({}) //initial state with empty object
    const [nft, setNFT] = useState({})

// (7:45:32) - loading state (when to display content of frontend app while blockchain loading)
    const [loading, setLoading] = useState(true)

    // At (7:42:33) - Add ethers provider for the MetaMask Login/Connect
    const web3Handler = async () => {
      // fetch the MetaMask Accounts in our MetaMask Wallet: (7:42:54):
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); 

    // Use the setter function to store the account: 
        setAccount(accounts[0])

    // Get Provider from MetaMask:
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        //May need to use `WebSocketProvider` per: https://github.com/Hostnomics/hashlips-learn-web3-by-building-a-dapp-tutorial/tree/main/track-changes-learn-web3-by-building-by-hashlips/4.Part-4a-min-7-dApp#websocketprovider---not-web3provider
        // const provider = new ethers.WebSocketProvider(window.ethereum)

    // (7:44:16) - Get Signer of the connected account through the provider
        const signer = provider.getSigner()

    // (7:44:39) - Call a custom `loadContracts()` function we created below: 
        loadContracts(signer)

    }

  // (7:44:39) - custom `loadContracts()` function
    const loadContracts = async (signer) => {
       // Get deployed copies of contracts - Takes Contract Addy, abi and the signer
       // deploy script saves a copy of each contract & abi in src/frontend/contractsData (7:45:11) so import above
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
        setMarketPlace(marketplace)
        const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)     
        setNFT(nft)  // SVGComponentTransferFunctionElement() (??)

        setLoading(false)
    }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 ms-3"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dapp University
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mx-auto mt-5">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} className="App-logo" alt="logo"/>
              </a>
              <h1 className= "mt-5">Dapp University Starter Kit</h1>
              <p>
                Edit <code>src/frontend/components/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                LEARN BLOCKCHAIN <u><b>NOW! </b></u>
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
