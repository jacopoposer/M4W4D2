const params = new URLSearchParams(location.search)
const id = params.get('id')
const itemName = document.getElementById('itemName')
const itemBrand = document.getElementById('itemBrand')
const itemDescription = document.getElementById('itemDescription')
const itemId = document.getElementById('itemId')
const itemPrice = document.getElementById('itemPrice')
const itemImg = document.getElementById('itemImg')
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGVhNTIxMDU5ZjAwMTVlMjNhMGMiLCJpYXQiOjE3ODUwOTgzMDUsImV4cCI6MTc4NjMwNzkwNX0.07dyj8cYks87chSHybGxrL4dOcbsdxp4qpZ9imWYcPg'
const backBtn = document.getElementById('backBtn')
const addToCartBtn = document.getElementById('addToCartBtn')
let currentItem = null


//richiesta API e raccolta dati dell'item
const getItem = async () => {
    
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const data = await response.json()
        currentItem = data
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

//aggiungo al carrello
const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
}

//riprende la pagina precedente dalla cronologia del browser
backBtn.addEventListener('click', () => {
    history.back()
})

//aggiunge al carrello
addToCartBtn.addEventListener('click', () => {
    addToCart(currentItem)
})



getItem()