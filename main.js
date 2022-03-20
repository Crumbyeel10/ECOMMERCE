

document.addEventListener('DOMContentLoaded', (event) => {
    


// MIS PRODUCTOS

const productos = [
    {
        id: 1,
        name: 'Camisa',
        price: 10000,
        img: "./img/camisa.jpg"
    },
    {
        id: 2,
        name: 'Pantalon',
        price: 20000,
        img: "./img/jean.jpg"
    },
    {
        id: 3,
        name: 'Shoes',
        price: 100000,
        img: "./img/shoes.jpg"
    }
]




//////OBJETO BASE DE DATOS

const db = {
    items: productos,
    //METODO DE FILTRAR POR MEDIO DEL ID
    methods: {
        find: function (id) {
            return db.items.find(function (item){ return item.id == id})
        },

        //MOSTRAR DATOS CREANDO ETIQUETAS UL Y LI
    render: function () {
        let html = '<ul class="card-ul">'
        html += db.items.map(function(item){return `<li><img  class="img-cards" src="${item.img}" alt="${item.name}">  ${item.name} - ${item.price} <button class="btn-add" data-id=" ${item.id}"> add to cart </button></li> `}).join('')
        html += '</ul>'
        // let renderImg = document.getElementById('img-card')
        // renderImg.setAttribute('src',db.items.img)
        // console.log(html)
        return html 
        
        
    }
    }
}

const cart = {
    items: [],
    methods: {

        // METODO PARA AGREGAR LOS DATOS AL ARRAY ITEMS
        add:function (id){
            if (cart.methods.lisAlreadyInCart(id)) {
                alert('ya esta el producto')
            }else{
                const item = db.methods.find(id)
                cart.items.push(item)
            }
            
        },
        remove: function (id){
            cart.items = cart.items.filter(function (item) {return item.id !== id })
        },
        contar: function (){
            return cart.items.length
        },
        lisAlreadyInCart: function (id){
            return cart.items.find(function (item) {return item.id == id})
        },
        // METODO PARA RENDERIZAR EL CONTENIDO
        render: function () {
            document.getElementById('count').innerHTML = cart.methods.contar()
            // document.getElementById('count').innerHTML = cart.methods.price()

            let html = ''
            html +='<ul>'
            html += cart.items.map(function (item){return `<li><button class="btn-remove" data-id=" ${item.id}"> Delete </button>${item.name} - ${item.price}</li>`}).join()
            html += '</ul>'
            // console.log(html)
            return html
        }
    }
}


const productsContainer = document.getElementById('products-container')
const cartCompras = document.getElementById('cart-compras')
const wrapper = document.getElementById('products-container')


productsContainer.innerHTML = db.methods.render()
cartCompras.innerHTML = cart.methods.render()

// FUNCION PARA CAPTURAR EL EVENTO DEL BOTON CON EL EVENTO TARGET
wrapper.addEventListener('click', function (e) {
    if(e.target.matches('.btn-add')){
        const id = e.target.dataset.id
        cart.methods.add(+id)
        cartCompras.innerHTML = cart.methods.render()
    }
    
    
})

cartCompras.addEventListener('click', function (e) {
    if(e.target.matches('.btn-remove')){
        const id = e.target.dataset.id
        cart.methods.remove(+id)
        cartCompras.innerHTML = cart.methods.render()
    }

})



})




