// ! <------------------------------------IPHONE.HTML------------------------------------>
if(document.getElementById("body_iphone")){
/* LISTADO DE MODELOS*/
const modelosIphone =[
    {nombre: 'iPhone 15 Pro Max', capacidad: 256, color: 'Blue Titanium',     precio: 1300, img:'/assets/iphones/iphone-15-pro-max-bt.png', stock: 7},
    {nombre: 'iPhone 15 Pro Max', capacidad: 256, color: 'Natural Titanium',  precio: 1300, img:'/assets/iphones/iphone-15-pro-max-nt.png', stock: 8}, 
    {nombre: 'iPhone 15 Pro Max', capacidad: 256, color: 'Black Titanium',    precio: 1300, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 10}, 
    {nombre: 'iPhone 15 Pro Max', capacidad: 512, color: 'Blue Titanium',     precio: 1500, img:'/assets/iphones/iphone-15-pro-max-bt.png', stock: 5},
    {nombre: 'iPhone 15 Pro Max', capacidad: 512, color: 'Black Titanium',    precio: 1500, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 3},
    {nombre: 'iPhone 15 Pro Max', capacidad: 512, color: 'White Titanium',    precio: 1500, img:'/assets/iphones/iphone-15-pro-max-wt.png', stock: 2},    
    {nombre: 'iPhone 15 Pro',     capacidad: 128, color: 'Natural Titanium', precio: 1100, img:'/assets/iphones/iphone-15-pro-max-nt.png', stock: 8},
    {nombre: 'iPhone 15 Pro',     capacidad: 128, color: 'Black Titanium' ,  precio: 1100, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 8},
    {nombre: 'iPhone 15 Pro',     capacidad: 128, color: 'White Titanium' ,  precio: 1100, img:'/assets/iphones/iphone-15-pro-max-wt.png', stock: 7},
    {nombre: 'iPhone 15 Pro',     capacidad: 256, color: 'Natural Titanium', precio: 1200, img:'/assets/iphones/iphone-15-pro-max-nt.png', stock: 6},
    {nombre: 'iPhone 15 Pro',     capacidad: 256, color: 'Black Titanium',   precio: 1200, img:'/assets/iphones/iphone-15-pro-max-black.png', stock: 9},
    {nombre: 'iPhone 15',         capacidad: 128, color: 'Pink',             precio: 900,  img:'/assets/iphones/iphone-15-pink.png', stock: 10},
    {nombre: 'iPhone 15',         capacidad: 128, color: 'Blue',             precio: 900,  img:'/assets/iphones/iphone-15-blue.png', stock: 11},
    {nombre: 'iPhone 15',         capacidad: 128, color: 'Black',            precio: 900,  img:'/assets/iphones/iphone-15-black.png', stock: 3},
    {nombre: 'iPhone 15',         capacidad: 256, color: 'Pink',             precio: 1000, img:'/assets/iphones/iphone-15-pink.png', stock: 13},
    {nombre: 'iPhone 15',         capacidad: 256, color: 'Yellow',           precio: 1000, img:'/assets/iphones/iphone-15-yellow.png', stock: 9},
    {nombre: 'iPhone 15',         capacidad: 256, color: 'Green',            precio: 1000, img:'/assets/iphones/iphone-15-green.png', stock: 10},
    {nombre: 'iPhone 15 Plus',    capacidad: 128, color: 'Pink',             precio: 1000, img:'/assets/iphones/iphone-15-plus-pink.png', stock: 5},
    {nombre: 'iPhone 15 Plus',    capacidad: 128, color: 'Yellow',           precio: 1000, img:'/assets/iphones/iphone-15-plus-yellow.png', stock: 12},
    {nombre: 'iPhone 15 Plus',    capacidad: 256, color: 'Green',            precio: 1100, img:'/assets/iphones/iphone-15-plus-green.png', stock: 7},
    {nombre: 'iPhone 15 Plus',    capacidad: 256, color: 'Black',            precio: 1100, img:'/assets/iphones/iphone-15-plus-black.png', stock: 6},
    {nombre: 'iPhone 15 Plus',    capacidad: 512, color: 'Blue',             precio: 1300, img:'/assets/iphones/iphone-15-plus-blue.png', stock: 9},
    {nombre: 'iPhone 14',         capacidad: 128, color: 'Purple' ,          precio: 800,  img:'/assets/iphones/iphone-14-purple.png', stock: 4},
    {nombre: 'iPhone 13',         capacidad: 128, color: 'Starlight',        precio: 700,  img:'/assets/iphones/iphone-13-starlight.png', stock: 3},
    {nombre: 'iPhone SE 3rd gen', capacidad: 128, color: 'Red',              precio: 600,  img:'/assets/iphones/iphone-se-red.png', stock: 5},
]

const productsContainer = document.querySelector('.products');

//GENERA UNA LISTA CON SOLAMENTE LOS NOMBRE DE LOS MODELOS
const nombreModelos = [];
for (let i=0; i < modelosIphone.length ; i++){
    const modelo = modelosIphone[i].nombre;
    if(!nombreModelos.some(item => item == modelo)){
        nombreModelos.push(modelo);
    }
}

//FUNCION PARA SACAR LOS ESPACIOS A LOS NOMBRES
function sinEspacios(cadena){
    return cadena.replace(/\s/g, '');
}

//FUNCION QUE LIMPIIA EL CONTENEDOR DE LOS PRODUCTOS
function limpiarContenedor(){
    productsContainer.innerHTML = '';
}

//GENERA UN BOTON POR CADA MODELO
function generarBotonesFiltro(){
    const seccionFiltroModelos = document.querySelector('.modelos');
    for(let i = 0; i < nombreModelos.length; i++){
        const modelo = nombreModelos[i];
        seccionFiltroModelos.innerHTML+=/* HTML */`<button class="filtro-btn">${modelo}</button>`
    }
}

//GENERA LAS CARDS DE LOS PRODUCTOS
/* function generarTarjetasProducto(productos){
    for(let i = 0; i < productos.length; i++){
        const producto = productos[i];
        productsContainer.innerHTML +=`<div class="card_producto">
                                                    <img src=${producto.img} alt="${producto.nombre}">
                                                    <h4><span class="product_name">${producto.nombre}</span><span class="product_color"> ${producto.color}</span></h4>
                                                    <span class="product_capacity">${producto.capacidad}gb</span>
                                                    <span class="price">USD $${producto.precio}</span>
                                                    <button class="btn_add_to_cart">Añadir al carrito <i class="fa-solid fa-cart-shopping"></i></a></button>
                                                </div>`
    }
}
 */


//BUSQUEDA
const iconBusqueda = document.querySelector('#search-btn');
const inputBusqueda = document.querySelector('#search-input');
iconBusqueda.addEventListener("click", function(){
    inputBusqueda.style.display = "block";
})

function buscar(producto){
    const busqueda = sinEspacios(producto.toLowerCase());
    const productosFiltrados = modelosIphone.filter(modelo => {
        const nombreProductoLowerCase = sinEspacios(modelo.nombre.toLowerCase());
        return nombreProductoLowerCase.includes(busqueda);
    });
    if (productosFiltrados.length !== 0){
        limpiarContenedor();
        //generarTarjetasProducto(productosFiltrados);
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
const cantidadCarrito = parseInt(document.querySelector('.cart_length').textContent);
const spanTotal = document.querySelector('.total');
const itemsEnCarrito = document.querySelector('.cart_length');

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
                <img src="${product.img}" alt="${product.nombre}">
                <div>
                    <div>
                        <p class="product_name">${product.nombre}</p><span>$${product.precio}</span>
                    </div>
                    <span class="color product_color">${product.color}</span><span class="product_capacity"> ${product.capacidad}GB</span>
                </div>
                <i class="fa-regular fa-trash-can remove_item"></i>
            `;
            cartList.appendChild(cartProduct);
        }
        spanTotal.innerHTML = `${total}`;
        itemsEnCarrito.textContent = `${carrito.length}`;
    }else{
        cartList.innerHTML = /*HTML*/`<p>No hay productos en su carrito :(</p>`;
        itemsEnCarrito.textContent = `${carrito.length}`;
        spanTotal.innerHTML = ``;
    }
}

function agregarAlCarrito(product){
    if(product.stock > 0){
        carrito.push(product);
        total += product.precio;
        product.stock -=1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);
        actualizarCarrito();
    } else {
        alert(`no hay mas ${product.nombre} ${product.color} ${product.capacidad}GB disponible`)
    }
}

function eliminarDelCarrito(product){
    const index = carrito.findIndex(p => p === product);
    if(index !== -1){
        carrito.splice(index, 1);
        product.stock += 1;
        total -= product.precio;
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
            return (p.nombre === productName && p.color === productColor && p.capacidad === productCapacity);
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
        for(const item of modelosIphone){
            if(productName === item.nombre && productColor === item.color && productCapacity === item.capacidad){
            agregarAlCarrito(item);
            }
        }
    }
})




/* <-----------------------------------PAGINACION------------------------------------> */
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
    console.log(articulosPagina);
    limpiarContenedor();
    for (const producto of articulosPagina) {
        productsContainer.innerHTML += /*HTML*/
                                    `<div class="card_producto">
                                        <img src=${producto.img} alt="${producto.nombre}">
                                        <h4><span class="product_name">${producto.nombre}</span><span class="product_color"> ${producto.color}</span></h4>
                                        <span class="product_capacity">${producto.capacidad}gb</span>
                                        <span class="price">USD $${producto.precio}</span>
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
        //generarTarjetasProducto(modelosIphone);
        filtroActual = modelosIphone
        mostrarArticulos(modelosIphone);
        localStorage.setItem('filtro', JSON.stringify(modelosIphone));
    } else{
        const productosFiltrados = modelosIphone.filter(producto => producto.nombre === modelo);
        limpiarContenedor();
        //generarTarjetasProducto(productosFiltrados);
        filtroActual = productosFiltrados;
        localStorage.setItem('filtro', JSON.stringify(productosFiltrados));
        mostrarArticulos(productosFiltrados);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    generarBotonesFiltro();
    //generarTarjetasProducto(modelosIphone);
    mostrarArticulos(modelosIphone);

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

    console.log(filtroActual);

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
    {name: 'Iphone', img:'./assets/iphone.png', description:'iPhone'},
    {name: 'Mac', img:'./assets/macbook.png', description:'MacBook'},
    {name: 'iPad', img:'./assets/ipad.png', description:'iPad'},
    {name: 'Watch', img:'./assets/watch.png', description:'Apple Watch'},
    {name: 'Accesorios', img:'./assets/accesories.png', description:'Cargador usb-c'}
]
const categoriesContainer = document.querySelector(".product_categories")
for(let i = 0; i < categories.length; i++ ){
    const category = categories[i];
    categoriesContainer.innerHTML += `<div class="category_card">
                                        <img src="${category.img}" alt="${category.description}">
                                        <div class="category_details">
                                            <h2>${category.name}</h2>
                                            <button><a href="#">Ver más ></a></button>
                                        </div>
                                    </div>`
}
  /* PRODUCTS LIST */
const iphones = [
    {name:'iPhone 15', img:'/assets/iphone15colors.png', precio:'$850'},
    {name:'iPhone 15 Pro', img:'/assets/iphone15pro.png', precio:'$1100'},
    {name:'iPhone 14', img:'/assets/iphone14.png', precio:'$750'},
    {name:'iPhone 13', img:'/assets/iphone13.png', precio:'$650'},
    {name:'iPhone SE', img:'/assets/iphoneSE.png', precio:'$500'},
]

const iphoneContainer = document.querySelector(".iphone_container");
for (let i = 0; i < iphones.length; i++){
    const iphone = iphones[i];
    iphoneContainer.innerHTML += /*HTML*/
                                    `<div class="card_producto">
                                        <img src="${iphone.img}" alt="${iphone.name}">
                                        <div class="info_producto">
                                            <h3>${iphone.name}</h3>
                                            <span class="precio">desde ${iphone.precio}</span>
                                            <button><a href="">Comprar</a></button>
                                        </div>
                                    </div>`
}
}

