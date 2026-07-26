const params = new URLSearchParams(location.search)
const id = params.get('id')
const itemName = document.getElementById('itemName')
const itemBrand = document.getElementById('itemBrand')
const itemDescription = document.getElementById('itemDescription')
const itemId = document.getElementById('itemId')
const itemPrice = document.getElementById('itemPrice')
const itemImg = document.getElementById('itemImg')
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGVhNTIxMDU5ZjAwMTVlMjNhMGMiLCJpYXQiOjE3ODQ4Mjc1NTcsImV4cCI6MTc4NjAzNzE1N30.7o1jv0id6KCTb4jdpYio8IzxLatrN4Pi6qho-_Dr_9A'

const getItem = async () => {
    
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const data = await response.json()
        itemImg.src = data.imageUrl
        itemName.innerText = data.name
        itemBrand.innerText = data.brand
        itemDescription.innerText = data.description
        itemId.innerText = data._id
        itemPrice.innerText = `${data.price} €`
    } catch (e) {
        console.error(e)
    }
}

getItem()