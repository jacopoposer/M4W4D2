const productRow = document.getElementById(`productRow`)
const name = document.getElementById('name')
const brand = document.getElementById('brand')
const price = document.getElementById('price')
const imageUrl = document.getElementById('imageUrl')
const description = document.getElementById('description')
const btnSubmit = document.getElementById('btnSubmit')
const editName = document.getElementById('editName')
const editPrice = document.getElementById('editPrice')
const editBrand = document.getElementById('editBrand')
const editDescription = document.getElementById('editDescription')
const editImageUrl = document.getElementById('editImageUrl')
const editBtn = document.getElementById('editBtn')
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGVhNTIxMDU5ZjAwMTVlMjNhMGMiLCJpYXQiOjE3ODQ4Mjc1NTcsImV4cCI6MTc4NjAzNzE1N30.7o1jv0id6KCTb4jdpYio8IzxLatrN4Pi6qho-_Dr_9A'

//fetch all'API per ottenere i prodotti dal server
const getProducts = async () => {
    try {
        const result = await fetch(`https://striveschool-api.herokuapp.com/api/product`, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })
        const data = await result.json()
        showTable(data)
    } catch (e) {
        console.error(e)
    }
}

// evoco la funzione
getProducts()

//creo la struttura del singolo elemento
const createProductRow = ({ name, brand, price, imageUrl, description, _id }) => {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.innerText = name
    const tdBrand = document.createElement('td')
    tdBrand.innerText = brand
    const tdPrice = document.createElement('td')
    tdPrice.innerText = price
    const tdImage = document.createElement('td')
    const img = document.createElement('img')
    img.setAttribute('class', 'img-fluid w-25')
    img.src = imageUrl
    tdImage.appendChild(img)
    const tdDescription = document.createElement('td')
    tdDescription.innerText = description
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`
    deleteBtn.classList.add('btn')
    const openEditModalBtn = document.createElement('button')
    openEditModalBtn.innerHTML = `<ion-icon name="create-outline"></ion-icon>`
    openEditModalBtn.classList.add('btn')
    openEditModalBtn.setAttribute('data-bs-toggle', 'modal')
    openEditModalBtn.setAttribute('data-bs-target', '#editform')


    deleteBtn.addEventListener('click', () => {
        deleteProduct(_id)
    })

    openEditModalBtn.addEventListener('click', () => {
        populateEditProductForm(_id)
    })

    editBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        editProduct(_id,generateEditProductPayload())
    })


    tr.append(tdName, tdBrand, tdPrice, tdImage, tdDescription, deleteBtn, openEditModalBtn)
    return tr
}

// aggiungo il prodotto
const showTable = (products) => {
    productRow.innerHTML = ''
    const productRows = products.map(product => createProductRow(product))
    productRow.append(...productRows)
}



// inserire un controllo per i dati che il form sia completo e che i campi siano compilati in modo corretto
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    const payload = {
        name: name.value,
        brand: brand.value,
        price: price.value,
        imageUrl: imageUrl.value,
        description: description.value
    }
    addProduct(payload)
        .then(res => console.log(res))
})

//aggiungiamo il prodotto all'array del server
const addProduct = async (product) => {
    try {
        const data = await fetch(`https://striveschool-api.herokuapp.com/api/product`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokenApi}`,
                'content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        return await data.json()
    } catch (e) {
        console.error(e)
    } finally {
        getProducts()
    }
}


// funzione eliminare prodotto

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenApi}`
                }
            }
        )
        return await response.json()
    } catch (e) {
        console.error(e)
    } finally { getProducts() }
}

//recuperiamo il singolo prodotto
const getSingleProduct = async (id) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenApi}`
                }
            }
        )
        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

//popoliamo il form col singolo prodotto
const populateEditProductForm = async (id) => {
    const productData = await getSingleProduct(id)

    editName.value = productData.name
    editPrice.value = productData.price
    editImageUrl.value = productData.imageUrl
    editBrand.value = productData.brand
    editDescription.value = productData.description
}

//modifichiamo il singolo prodotto
const editProduct = async (id, payload) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenApi}`,
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        ) 
        return await response.json()
    } catch (e) {
        console.error(e)
    } finally{
        getProducts()
    }
}

const generateEditProductPayload = () => {
    return  {
        name: editName.value,
        price: editPrice.value,
        imageUrl: editImageUrl.value,
        brand: editBrand.value,
        description: editDescription.value
    }
}

