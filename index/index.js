const itemsRow = document.getElementById('itemsRow')
let allItems = []
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGVhNTIxMDU5ZjAwMTVlMjNhMGMiLCJpYXQiOjE3ODQ4Mjc1NTcsImV4cCI6MTc4NjAzNzE1N30.7o1jv0id6KCTb4jdpYio8IzxLatrN4Pi6qho-_Dr_9A'

//chiamata API
const getItems = async () => {
    try {
        const result = await fetch('https://striveschool-api.herokuapp.com/api/product', {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const data = await result.json()
        allItems = data
        displayItems(data)
    } catch (e) {
        console.error(e)
    }
}

getItems()



const createItemCard = ({ name, brand, price, imageUrl, description, _id }) => {
    const col = document.createElement('div')
    col.setAttribute('class', 'col-12 col-md-4 col-lg-3')


    const card = document.createElement('div')
    card.classList.add('card')
    col.appendChild(card)

    const itemLink = document.createElement('a')
    itemLink.classList.add('d-inline-block')
    itemLink.href = `details.html?id=${_id}`

    const itemImg = document.createElement('img')
    itemImg.classList.add('card-img-top')
    itemImg.src = imageUrl
    itemImg.alt = name
    itemLink.appendChild(itemImg)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    card.append(itemLink, cardBody)

    const itemName = document.createElement('h5')
    itemName.classList.add('card-title')
    itemName.innerText = name

    const itemBrand = document.createElement('h6')
    itemBrand.innerText = brand

    const itemPrice = document.createElement('p')
    itemPrice.classList.add('fw-bold')
    itemPrice.innerText = `${price} €`

    const itemDesc = document.createElement('p')
    itemDesc.classList.add('card-text')
    itemDesc.innerText = description

    const addToCartBtn = document.createElement('button')
    addToCartBtn.setAttribute('class', 'btn btn-secondary')
    addToCartBtn.innerText = 'Add To Cart'
    //addToCartBtn.addEventListener('click', () => addToCart({name, brand, price, imageUrl, description, _id  }))

    cardBody.append(itemName, itemBrand, itemPrice, itemDesc, addToCartBtn)

    return col

}

const displayItems = (items) => {
    itemsRow.innerHTML = ''
     if (items.length === 0) {
        itemsRow.innerHTML = 'Nessun prodotto disponibile.';
        return;
    }
    const cardItems = items.map(item => createItemCard(item))
    itemsRow.append(...cardItems)
}