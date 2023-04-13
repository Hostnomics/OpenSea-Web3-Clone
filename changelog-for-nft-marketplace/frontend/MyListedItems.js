// Created at (08:08:01). Completed at (8:12:50)
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

// At (8:12:06) - Add renderSoldItems function: 
    function renderSoldItems(items){
        return (
            <>
              <h2>Sold</h2>
              <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {/* Map through sold items array: */}
                {items.map((item, idx) => (
                  <Col key={idx} className="overflow-hidden">
                    <Card>
                      <Card.Img variant="top" src={item.image} />
                        <Card.Footer>
                            For (Total Price) {ethers.utils.formatEther(item.totalPrice)} ETH - 
                            Recieved (Seller set price at) {ethers.utils.formatEther(item.price)} ETH
                        </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )
    } // Completed fn and component (8:12:50)


                                        // Takes MetaMask account to filter items in marketplace for user
export default function MyListedItems({ marketplace, nft, account }) {
    
// Add state (8:08:22)
    const [loading, setLoading] = useState(true)
    const [listedItems, setListedItems] = useState([])
    const [soldItems, setSoldItems] = useState([])

// (8:08:54) - Load listed items function WITH useEffect(() => {}, []) 
    const loadListedItems = async () => {
        // get sold item count
        const itemCount = await marketplace.itemCount()
        let listedItems = []
        let soldItems = []

        for (let indx = 1; indx <= itemCount; indx++){
            const i = await marketplace.items(indx)

            if (i.seller.toLowerCase() === account) {
                //get uri url from nft contract
                const uri = await nft.tokenURI(i.tokenId)

                //use uri to fetch the nft metadata stored on ipfs (8:09:34)
                const response = await fetch(uri)
                const metadata = await response.json()

                //get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(i.itemId)

                //define listed item object - (08:09:41)
                let item = {
                    totalPrice,
                    price: i.price,
                    itemId: i.itemId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                }
                //push that item to the listedItems array (8:10:05)
                listedItems.push(item)

                //Add listed item to sold items array IF sold
                if (i.sold) soldItems.push(item)
            } //end of IF (i.seller.toLowerCase() === account)
        }//end of FOR (let indx = 1; indx <= itemCount; indx++)

        //After fetching all listed and sold items, set our state: (8:10:26)
        setLoading(false)
        setListedItems(listedItems)
        setSoldItems(soldItems)

    }//end of loadListedItems() function
    useEffect(() => {
        loadListedItems()
    }, [])

// (8:10:39) - Build out frontend
    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Loading...</h2>
        </main>
    ) 
    return (
        <div className="flex justify-center">
            {/* (8:11:00) - Make sure listedItems exists */}
            {listedItems.length > 0 ?
                <div className="px-5 py-3 container">
                    <h2>Listed</h2>
                    <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {/* (8:11:21) - map through the listed items array: */}
                        {listedItems.map((item, idx) => (
                            <Col key={idx} className="overflow-hidden">
                                <Card>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                                </Card>
                            </Col>
                        ))}

                    </Row>
            {/* (8:11:50) renderSoldItems() function to render any sold items if they have any with custom fn renderSoldItems() */}
                    { soldItems.length > 0 && renderSoldItems(soldItems) }
                </div>
            
            : (
                <main style={{ padding: "1rem 0" }}>
                    <h2>No listed assets</h2>
                </main>

            )}

        </div>
    )
}