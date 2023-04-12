// Created at 7:59:10

import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'

// (7:59:11) -import the ipfsHttpClient to upload our metadata for the newly created NFT to ipfs
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0') 


//BASIC FORMAT: 
// const Create = ({}) => {
    // return()
// }

// export default Create

const Create = ({ marketplace, nft }) => {

// 7:59:33 - Set up state. `price` will be stored on the blockchain. `image`, `name` and `description` will be uploaded to IPFS
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

// (7:59:57) - create uploadToIPFS fn which will be triggered everytime there is a change to the input field
    const uploadToIPFS = async (event) => {
        //(8:00:20) - prevent default as usual
        event.preventDefault()

        // take the first element in the files array
        const file = event.target.files[0]

        //(8:00:40) - check that "legit" file was uploaded:
        if (typeof file !== 'undefined') {
            //use a try catch stmt to catch any errors whem uploading to IPFS
            try {
                // (08:01:00): call the .add() method on the IPFS client:
                const result = await client.add(file)
                console.log(result)
                setImage(`https://ipfs.infura.io/ipfs/${result.path}`)

            } catch (error){
                console.log("ipfs image upload error: ", error)
            }
        }
    } //end of uploadToIPFS

// (08:01:45) - createNFT fn
// 1 - upload all metadata to IPFS (link to image, name and description)
    const createNFT = async () => {
            //Check that none of the fields are left blank
            if (!image || !price || !name || !description) return
            try {
                //Add the metadata to IPFS in jSON object format. (8:02:45) (via add() method on IPFS client)
                const result = await client.add(JSON.stringify({image, price, name, description}))
                // call our custom mintThenList() function we create below
                mintThenList(result)
            } catch(error) {
                console.log("ipfs uri upload error: ", error)
            }
        

    }
// 2 - (8:03:22) After finished, interact with blockchain to MINT and then LIST the NFT for sale on the marketplace
    const mintThenList = async (result) => {
        // set up uri that points to where metadata for the NFT is located on IPFS
        const uri = `https://ipfs.infura.io/ipfs/${result.path}`

        // mint nft - passing in the uri data
        await(await nft.mint(uri)).wait()
        // get tokenId of new nft 
        const id = await nft.tokenCount()
        // approve marketplace to spend nft
        await(await nft.setApprovalForAll(marketplace.address, true)).wait()
        
        // add nft to marketplace. Convert user input ETH to Wei using the parseEther() method. (8:03:48)
        const listingPrice = ethers.utils.parseEther(price.toString())
        // call the makeItem() function on marketplace, passing in NFT addy, token id and listingPrice
        await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()       
    }


    return(
        <div className="container-fluid mt-5">
            <div className="row">
                {/* (8:04:20 - build form that will trigger the above functions ) */}
                <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
                    <div className="content mx-auto">
                        <Row className="g-4">
                        <Form.Control
                            type="file"
                            required
                            name="file"
                            onChange={uploadToIPFS}
                        />
                        <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
                        <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
                        <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
                        <div className="d-grid px-0">
                            <Button onClick={createNFT} variant="primary" size="lg">
                            Create & List NFT!
                            </Button>
                        </div>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Create
