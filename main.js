// ! <------------------------------------IPHONE.HTML------------------------------------>
if(document.getElementById("body_iphone")){

// * LISTADO DE MODELOS
const models =[
    {name: 'iPhone 15 Pro Max', capacity: 256, color: 'Blue Titanium',    price: 1300, img:'/assets/iphones/iphone-15-pro-max-bt.png', stock: 7},
    {name: 'iPhone 15 Pro Max', capacity: 256, color: 'Natural Titanium', price: 1300, img:'/assets/iphones/iphone-15-pro-max-nt.png', stock: 8}, 
    {name: 'iPhone 15 Pro Max', capacity: 256, color: 'Black Titanium',   price: 1300, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 10}, 
    {name: 'iPhone 15 Pro Max', capacity: 512, color: 'Blue Titanium',    price: 1500, img:'/assets/iphones/iphone-15-pro-max-bt.png', stock: 5},
    {name: 'iPhone 15 Pro Max', capacity: 512, color: 'Black Titanium',   price: 1500, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 3},
    {name: 'iPhone 15 Pro Max', capacity: 512, color: 'White Titanium',   price: 1500, img:'/assets/iphones/iphone-15-pro-max-wt.png', stock: 2},    
    {name: 'iPhone 15 Pro',     capacity: 128, color: 'Natural Titanium', price: 1100, img:'/assets/iphones/iphone-15-pro-max-nt.png', stock: 8},
    {name: 'iPhone 15 Pro',     capacity: 128, color: 'Black Titanium' ,  price: 1100, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 8},
    {name: 'iPhone 15 Pro',     capacity: 128, color: 'White Titanium' ,  price: 1100, img:'/assets/iphones/iphone-15-pro-max-wt.png', stock: 7},
    {name: 'iPhone 15 Pro',     capacity: 256, color: 'Natural Titanium', price: 1200, img:'/assets/iphones/iphone-15-pro-max-nt.png', stock: 6},
    {name: 'iPhone 15 Pro',     capacity: 256, color: 'Black Titanium',   price: 1200, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 9},
    {name: 'iPhone 15',         capacity: 128, color: 'Pink',             price: 900,  img:'/assets/iphones/iphone-15-pink.png', stock: 10},
    {name: 'iPhone 15',         capacity: 128, color: 'Blue',             price: 900,  img:'/assets/iphones/iphone-15-blue.png', stock: 11},
    {name: 'iPhone 15',         capacity: 128, color: 'Black',            price: 900,  img:'/assets/iphones/iphone-15-black.png', stock: 3},
    {name: 'iPhone 15',         capacity: 256, color: 'Pink',             price: 1000, img:'/assets/iphones/iphone-15-pink.png', stock: 13},
    {name: 'iPhone 15',         capacity: 256, color: 'Yellow',           price: 1000, img:'/assets/iphones/iphone-15-yellow.png', stock: 9},
    {name: 'iPhone 15',         capacity: 256, color: 'Green',            price: 1000, img:'/assets/iphones/iphone-15-green.png', stock: 10},
    {name: 'iPhone 15 Plus',    capacity: 128, color: 'Pink',             price: 1000, img:'/assets/iphones/iphone-15-plus-pink.png', stock: 5},
    {name: 'iPhone 15 Plus',    capacity: 128, color: 'Yellow',           price: 1000, img:'/assets/iphones/iphone-15-plus-yellow.png', stock: 12},
    {name: 'iPhone 15 Plus',    capacity: 256, color: 'Green',            price: 1100, img:'/assets/iphones/iphone-15-plus-green.png', stock: 7},
    {name: 'iPhone 15 Plus',    capacity: 256, color: 'Black',            price: 1100, img:'/assets/iphones/iphone-15-plus-black.png', stock: 6},
    {name: 'iPhone 15 Plus',    capacity: 512, color: 'Blue',             price: 1300, img:'/assets/iphones/iphone-15-plus-blue.png', stock: 9},
    {name: 'iPhone 14',         capacity: 128, color: 'Purple' ,          price: 800,  img:'/assets/iphones/iphone-14-purple.png', stock: 4},
    {name: 'iPhone 13',         capacity: 128, color: 'Starlight',        price: 700,  img:'/assets/iphones/iphone-13-starlight.png', stock: 3},
    {name: 'iPhone SE 3rd gen', capacity: 128, color: 'Red',              price: 600,  img:'/assets/iphones/iphone-se-red.png', stock: 5},
]

const productsContainer = document.querySelector('.products');

// GENERA UNA LISTA CON SOLAMENTE LOS NOMBRE DE LOS MODELOS
const modelNames = [];
for (let i=0; i < models.length ; i++){
    const modelo = models[i].name;
    if(!modelNames.some(item => item == modelo)){
        modelNames.push(modelo);
    }
}

// FUNCION PARA SACAR LOS ESPACIOS A LOS NOMBRES
function sinEspacios(cadena){
    return cadena.replace(/\s/g, '');
}

// FUNCION QUE LIMPIIA EL CONTENEDOR DE LOS PRODUCTOS
function limpiarContenedor(){
    productsContainer.innerHTML = '';
}

// GENERA UN BOTON POR CADA MODELO
function generarBotonesFiltro(){
    const seccionFiltroModelos = document.querySelector('.modelos');
    for(let i = 0; i < modelNames.length; i++){
        const modelo = modelNames[i];
        seccionFiltroModelos.innerHTML+=/* HTML */`<button class="filtro-btn">${modelo}</button>`
    }
}

// BUSQUEDA
const iconBusqueda = document.querySelector('#search-btn');
const inputBusqueda = document.querySelector('#search-input');

iconBusqueda.addEventListener('click', () => {
    if (inputBusqueda.style.display == 'block'){
        inputBusqueda.style.display = 'none'; 
    } else{
        inputBusqueda.style.display = 'block';
    }
    });

function buscar(producto){
    const busqueda = sinEspacios(producto.toLowerCase());
    const productosFiltrados = models.filter(modelo => {
        const nombreProductoLowerCase = sinEspacios(modelo.name.toLowerCase());
        return nombreProductoLowerCase.includes(busqueda);
    });
    if (productosFiltrados.length !== 0){
        filtroActual = productosFiltrados;
        limpiarContenedor();
        mostrarArticulos(productosFiltrados);
    } else{
        limpiarContenedor();
        productsContainer.innerHTML = /* HTML */
                                    `<p class='no-results'>No se encontraron resultados para "${producto}"</p>`;
    }
}

inputBusqueda.addEventListener('change', function(){
    const valorInput = inputBusqueda.value;
    if(valorInput != ''){
        buscar(valorInput);
    }
})


//AGREGAR AL CARRITO
const cartBtn = document.querySelector('.fa-cart-shopping');
const cartProductsContainer = document.querySelector('.cart_products');
const cartList = document.querySelector('.products_list');
const spanTotal = document.querySelector('.total');
const itemsEnCarrito = document.querySelectorAll('.cart_length');

let carrito = []
let total = 0;

function esconderCarrito(){
    cartProductsContainer.style.display = 'none';
}
function mostrarCarrito(){
    cartProductsContainer.style.display = 'flex'
}
cartBtn.addEventListener("click", function(){
    if(cartProductsContainer.style.display == 'flex'){
        esconderCarrito();
    } else {
        mostrarCarrito();
    }
})


function actualizarCarrito() {
    if (carrito.length !== 0){
        cartList.innerHTML = '';
        spanTotal.innerHTML = '';
        itemsEnCarrito.textContent = '0';
        for (const product of carrito) {
            const cartProduct = document.createElement('div');
            cartProduct.classList.add('cart__product');
            cartProduct.innerHTML = /*HTML */`
                <img src="${product.img}" alt="${product.name}">
                <div>
                    <div>
                        <p class="product_name">${product.name}</p><span>$${product.price}</span>
                    </div>
                    <span class="color product_color">${product.color}</span><span class="product_capacity"> ${product.capacity}GB</span>
                </div>
                <i class="fa-regular fa-trash-can remove_item"></i>
            `;
            cartList.appendChild(cartProduct);
        }
        spanTotal.innerHTML = `${total}`;
        itemsEnCarrito.forEach( item => item.textContent = `${carrito.length}`);
    }else{
        cartList.innerHTML = /*HTML*/`<p>No hay productos en su carrito :(</p>`;
        itemsEnCarrito.forEach(item => item.textContent = `${carrito.length}`);
        spanTotal.innerHTML = ``;
    }
}

function agregarAlCarrito(product){
    if(product.stock > 0){
        carrito.push(product);
        total += product.price;
        product.stock -=1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);
        actualizarCarrito();
        Toastify({
            text: `Se ha agregado ${product.name} al carrito`,
            gravity: "bottom",
            className: "btn-grad"
          }).showToast();
    } else {
        alert(`no hay mas ${product.name} ${product.color} ${product.capacity}GB disponible`)
    }
}

function eliminarDelCarrito(product){
    const index = carrito.findIndex(p => p === product);
    if(index !== -1){
        carrito.splice(index, 1);
        product.stock += 1;
        total -= product.price;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);
        actualizarCarrito();
    }
}
// Al presionar el icono de "basura", elimina el producto del carrito
cartList.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('remove_item')){
        const product = e.target.parentElement;
        const productName = product.querySelector('.product_name').textContent;
        const productColor = (product.querySelector('.product_color').textContent).trim();
        const productCapacity = parseInt(product.querySelector('.product_capacity').textContent);
        const productoEnCarrito = carrito.find(p => {
            return (p.name === productName && p.color === productColor && p.capacity === productCapacity);
        });
        eliminarDelCarrito(productoEnCarrito);
    }
})
// Al presionar "agregar al carrito", agrega el producto al carrito
productsContainer.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('btn_add_to_cart')){
        const product = e.target.parentElement;
        const productName = product.querySelector('.product_name').textContent;
        const productColor = (product.querySelector('.product_color').textContent).trim();
        const productCapacity = parseInt(product.querySelector('.product_capacity').textContent);
        for(const item of models){
            if(productName === item.name && productColor === item.color && productCapacity === item.capacity){
            agregarAlCarrito(item);
            }
        }
    }
})

// PAGINACION
const btnSiguiente = document.querySelector('.btn_siguiente');
const btnAnterior = document.querySelector('.btn_anterior');
const itemsPorPagina = 9; 
let paginaActual = 1; 
let filtroActual = JSON.parse(localStorage.getItem('filtro'));


// Función para cambiar de página
function cambiarPagina(direccion) {
    const nuevaPagina = paginaActual + direccion;
    if (nuevaPagina >= 1 && nuevaPagina <= Math.ceil(filtroActual.length / itemsPorPagina)) {
    paginaActual = nuevaPagina;
    mostrarArticulos(filtroActual);
    }
}
btnSiguiente.addEventListener('click', e => {
    e.preventDefault;
    cambiarPagina(1);
});
btnAnterior.addEventListener('click', e => {
    e.preventDefault;
    cambiarPagina(-1);
});

// Función para mostrar los artículos de la página actual
function mostrarArticulos(listaArticulos) {
    const numeroPaginaSpan = document.querySelector('.numero_pagina');
    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const articulosPagina = listaArticulos.slice(inicio, fin);
    limpiarContenedor();
    for (const producto of articulosPagina) {
        productsContainer.innerHTML += /*HTML*/
                                    `<div class="card_producto">
                                        <img src=${producto.img} alt="${producto.name}">
                                        <h4><span class="product_name">${producto.name}</span><span class="product_color"> ${producto.color}</span></h4>
                                        <span class="product_capacity">${producto.capacity}gb</span>
                                        <span class="price">USD $${producto.price}</span>
                                        <button class="btn_add_to_cart">Añadir al carrito <i class="fa-solid fa-cart-shopping"></i></a></button>
                                    </div>`
    }
    numeroPaginaSpan.textContent = paginaActual;
}

//FILTRA LAS CARDS SEGUN EL MODELO SELECCIONADO
function filtrar(modelo) {
    paginaActual = 1
    if (modelo == 'Todos los modelos'){
        limpiarContenedor();
        //generarTarjetasProducto(models);
        filtroActual = models;
        mostrarArticulos(models);
        localStorage.setItem('filtro', JSON.stringify(models));
    } else{
        const productosFiltrados = models.filter(producto => producto.name === modelo);
        limpiarContenedor();
        filtroActual = productosFiltrados;
        localStorage.setItem('filtro', JSON.stringify(productosFiltrados));
        mostrarArticulos(productosFiltrados);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    generarBotonesFiltro();
    mostrarArticulos(models);

    const carritoGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('total');
    const filtroGuardado = localStorage.getItem('filtro');

    if(totalGuardado){
        total = parseInt(totalGuardado);
    }
    if (carritoGuardado ) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
    if (filtroGuardado) {
        filtroActual = JSON.parse(filtroGuardado);
    }

    const todosLosBotonesDeFiltro = document.querySelectorAll('.filtro-btn')
    todosLosBotonesDeFiltro.forEach(button => {
        button.addEventListener('click', function() {
            filtrar(this.textContent);
        });
    });

});

}


//! <-------------------------------------INDEX.HTML------------------------------------->
if ( document.getElementById("body_index") ){
/* CATEGORY CARDS */
const categories = [
    {name: 'Iphone', img:'./assets/iphone.png', description:'iPhone', page: '/pages/iphone.html'},
    {name: 'Mac', img:'./assets/macbook.png', description:'MacBook', page: ''},
    {name: 'iPad', img:'./assets/ipad.png', description:'iPad', page: ''},
    {name: 'Watch', img:'./assets/watch.png', description:'Apple Watch', page: ''},
    {name: 'Accesorios', img:'./assets/accesories.png', description:'Cargador usb-c', page: ''}
]
const categoriesContainer = document.querySelector(".product_categories")
for(let i = 0; i < categories.length; i++ ){
    const category = categories[i];
    categoriesContainer.innerHTML += `<div class="category_card">
                                        <img src="${category.img}" alt="${category.description}">
                                        <div class="category_details">
                                            <h2>${category.name}</h2>
                                            <button><a href="${category.page}">Ver más ></a></button>
                                        </div>
                                    </div>`
}
}