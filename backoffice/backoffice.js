const productRow = document.getElementById(`productRow`)
const name = document.getElementById('name')
const brand = document.getElementById('brand')
const price = document.getElementById('price')
const imageUrl = document.getElementById('imageUrl')
const description = document.getElementById('description')
const btnSubmit = document.getElementById('btnSubmit')

// inserire un controllo per i dati che il form sia completo e che i campi siano compilati in modo corretto
// cambiare i seguenti parametri al cambio dell'API corretto title diventa name, category diventa brand, image diventa imageURL
btnSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    const payload = {
        title: name.value,
        category: brand.value,
        price: price.value,
        image: imageUrl.value,
        description: description.value
    }
    console.log(payload)
})

//fetch all'API per ottenere i prodotti dal server
const getProducts = async () => {
    try {
        const result = await fetch(`https://fakestoreapi.com/products`)
        const data = await result.json()
        showTable(data)
    } catch (e) {
        console.error(e)
    }
}

// evoco la funzione
getProducts()

//creo la struttura del singolo elemento
// cambiare i seguenti parametri al cambio dell'API corretto title diventa name, category diventa brand, image diventa imageURL
const createProductRow = ({ title, category, price, image }) => {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.innerText = title
    const tdBrand = document.createElement('td')
    tdBrand.innerText = category
    const tdPrice = document.createElement('td')
    tdPrice.innerText = price
    const tdImage = document.createElement('td')
    const img = document.createElement('img')
    img.setAttribute('class','img-fluid w-25')
    img.src= image
    tdImage.appendChild(img)

    tr.append(tdName, tdBrand, tdPrice, tdImage)

    return tr
}

// mostro i dati a schermo
const showTable = (products) => {
    productRow.innerHTML = ''
    const productRows = products.map(product => createProductRow(product))
    productRow.append(...productRows)
}