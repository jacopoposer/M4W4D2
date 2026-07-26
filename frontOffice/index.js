const itemsRow = document.getElementById('itemsRow')
const searchInput = document.getElementById('searchInput')
let allItems = []
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGVhNTIxMDU5ZjAwMTVlMjNhMGMiLCJpYXQiOjE3ODUwOTgzMDUsImV4cCI6MTc4NjMwNzkwNX0.07dyj8cYks87chSHybGxrL4dOcbsdxp4qpZ9imWYcPg'

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
        displayItems(allItems)
    } catch (e) {
        console.error(e)
    }
}

getItems()



const createItemCard = ({ name, brand, price, imageUrl, description, _id }) => {
    const col = document.createElement('div')
    col.setAttribute('class', 'col-12 col-sm-6 col-lg-4')


    const card = document.createElement('div')
    card.classList.add('card', 'h-100', 'shadow-sm')
    col.appendChild(card)

    const itemLink = document.createElement('a')
    itemLink.classList.add('d-inline-block')
    itemLink.href = `details.html?id=${_id}`

    const itemImg = document.createElement('img')
    itemImg.classList.add('card-img-top', 'p-3')
    itemImg.src = imageUrl
    itemImg.alt = name
    itemImg.style.height = '250px'
    itemImg.style.objectFit = 'contain'
    itemLink.appendChild(itemImg)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    card.append(itemLink, cardBody)

    const itemName = document.createElement('h5')
    itemName.classList.add('card-title')
    itemName.innerText = name

    const itemBrand = document.createElement('h6')
    itemBrand.innerText = brand
    itemBrand.classList.add('text-secondary')

    const itemPrice = document.createElement('p')
    itemPrice.classList.add('fw-bold', 'fs-5', 'text-success')
    itemPrice.innerText = `${price} €`

    const itemDesc = document.createElement('p')
    itemDesc.classList.add('text-muted')
    itemDesc.innerText = description.substring(0, 80) + '...'
    

    const addToCartBtn = document.createElement('button')
    addToCartBtn.setAttribute('class', 'btn btn-secondary w-100')
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

// ricerca degli items
const searchItems = () => {
    const value = searchInput.value.toLowerCase().trim()

    const filteredItems = allItems.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.brand.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
    )

    displayItems(filteredItems)
}

//ricerca a ogni input
searchInput.addEventListener('input', searchItems)