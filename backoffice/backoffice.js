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
const tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGVhNTIxMDU5ZjAwMTVlMjNhMGMiLCJpYXQiOjE3ODUwOTgzMDUsImV4cCI6MTc4NjMwNzkwNX0.07dyj8cYks87chSHybGxrL4dOcbsdxp4qpZ9imWYcPg'

const searchInput = document.getElementById('searchInput')
let currentProductId = null;
let allProducts = []




//fetch all'API per ottenere i prodotti dal server
const getProducts = async () => {
    try {
        const result = await fetch(`https://striveschool-api.herokuapp.com/api/product`, {
            headers: {
                Authorization: `Bearer ${tokenApi}`
            }
        })

        console.log("status:", result.status)
        const data = await result.json()
        allProducts = data
        showTable(allProducts)
    } catch (e) {
        console.error(e)
    }
}



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
    img.classList.add('img-fluid','rounded','shadow-sm')
    img.style.width = "80px"
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

    //al click elimina il prodotto
    deleteBtn.addEventListener('click', () => {
        deleteProduct(_id)
    })

    //al click mostra il modale dell'elemento selezionato
    openEditModalBtn.addEventListener('click', async () => {
        currentProductId = _id;
        await populateEditProductForm(_id);
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
        name: name.value.trim(),
        brand: brand.value.trim(),
        price: price.value.trim(),
        imageUrl: imageUrl.value.trim(),
        description: description.value.trim()
    }

    if (!validateProduct(payload)) return;

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
                'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )

        //chiusura modale 
        const modalElement = document.getElementById('editform')
        const modal = bootstrap.Modal.getInstance(modalElement)

        if (modal) {
            modal.hide()
        }


        const data = await response.json()


        return data

    } catch (e) {
        console.error(e)
    } finally {
        getProducts()
    }
}

const generateEditProductPayload = () => {
    return {
        name: editName.value.trim(),
        price: editPrice.value.trim(),
        imageUrl: editImageUrl.value.trim(),
        brand: editBrand.value.trim(),
        description: editDescription.value.trim()
    }
}

//valido i dati del form
const validateProduct = ({ name, brand, price, imageUrl, description }) => {
    if (
        !name ||
        !brand ||
        !price ||
        !imageUrl ||
        !description
    ) {
        alert('Please fill in all fields.');
        return false;
    }

    if (isNaN(price) || Number(price) <= 0) {
        alert('Insert a valid price');
        return false;
    }

    return true;
}

// funzione per la ricerca
const searchProducts = () => {
    const searchValue = searchInput.value.toLowerCase().trim()

    const filteredProducts = allProducts.filter(product => {
        return (
            product.name.toLowerCase().includes(searchValue) ||
            product.brand.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue)
        )
    })

    showTable(filteredProducts)
}

//al click prende l'id selezionato e apporta la modifica
editBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const payload = generateEditProductPayload();

    if (!validateProduct(payload)) return;


    editProduct(currentProductId, payload);
})

// a ogni inserimento avvia la ricerca
searchInput.addEventListener('input', searchProducts)


// evoco la funzione che crea i prodotti
getProducts()