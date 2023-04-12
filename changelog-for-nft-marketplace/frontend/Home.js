// Home.js started (7:51:39)
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, FormText } from 'react-bootstrap'

// (1) Pass in our Marketplace.sol (marketplace) contract ot fetch all litsed items
// (2) Pass in our NFT.sol (nft) contract to fetch the meta data for the associated NFTs
const Home = ({ marketplace, nft }) => {

    //items state
    const [items, setItems] = useState([])

    //set state for our loading boolean - (7:54:23)
    const [loading, setLoading] = useState(true)

    // (7:52:17) - load marketplace items
    const loadMarketplaceItems = async () => {
        const itemCount = await marketplace.itemCount()
        let items = [] 
            for (let i = 1; i = itemCount; i++){
                //fetch every item and push them into our items array
                const item = await marketplace.items(i)
                if (!item.sold) {
                    // get uri url from nft contract by calling the `tokenURI()` function on the nft contract, passing in tokenId
                    const uri = await nft.tokenURI(item.tokenId)
                    // With that `uri` to fetch the nft metadata stored on ipfs, using js' fetch() api to get a `response`
                    const response = await fetch(uri)
                    // call the json() method on that `response` and that returns the metadata
                    const metadata = await response.json()

                    //get total price of tiem (item price + fee) with getTotalPrice() fn called on marketplace contract
                    const totalPrice = await marketplace.getTotalPrice(item.itemId)
                    
                    // Add item to the items array (7:53:41): (name, description & image all from metadata):
                    items.push({
                        totalPrice,
                        itemId: item.itemId,
                        seller: item.seller,
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image
                    })
                        
                }
            }
        
        setItems(items) // add items to the state
        setLoading(false) //(7:54:30)
    } //end of loadMarketplaceItems() function


    // (7:54:36) - make buyMarketItem() function
    const buyMarketItem = async (item) => {
                //for the ether paid for item, we get with {value: item.totalPrice}
                //returns transaction response and we'll call the .wait() method on the transaction response
                // .wait() waits for the transaction to be confirmed.
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
        loadMarketplaceItems() //(7:55:28) - reload the marketplace (available) items which will remove the purchased item
    }

    //(7:56:00) - useEffect
    useEffect(() => {
        loadMarketplaceItems()
    }, [])

    //(7:56:12) - loading conditional page
    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Loading...</h2>
        </main>
    )

// Home component will display all the listed items for sale:
    return (
        <div className="flex justify-center">
            {/* Check that we have items to display (7:56:24)  */}
                {items.length > 0 ?
                    <div className="px-5 container">
                        <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {/* (7:56:38) - map over items array  */}
                            {items.map((item, idx) => (
                                <Col key={idx} className="overflow-hidden">
                                    <Card>
                                        <Card.Img variant="top" src={item.image} />
                                        <Card.Body color="secondary">
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                        <div className='d-grid'>
                                            <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
            {/* (7:57:46) - item.totalPrice is in Wei. Convert to ETH with the formatEther() function */}
                                            Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                                            </Button>
                                        </div>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                : (
                    <main style={{ padding: "1rem 0" }}>
                        <h2>No listed assets</h2>
                    </main>
                )}

        </div>
    );
}


export default Home