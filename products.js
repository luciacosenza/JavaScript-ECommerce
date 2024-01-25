/* LISTADO DE MODELOS*/
const modelosIphone =[
    {nombre: 'iPhone 15 Pro Max', capacidad: 256, color: 'Blue Titanum',     precio: 1300, img:'/assets/iphones/iphone-15-pro-max-bt.png'},
    {nombre: 'iPhone 15 Pro Max', capacidad: 256, color: 'Natural Titanum',  precio: 1300, img:'/assets/iphones/iphone-15-pro-max-nt.png'}, 
    {nombre: 'iPhone 15 Pro Max', capacidad: 256, color: 'Black Titanum',    precio: 1300, img:'/assets/iphones/iphone-15-pro-max-black.png'}, 
    {nombre: 'iPhone 15 Pro Max', capacidad: 512, color: 'Blue Titanum',     precio: 1500, img:'/assets/iphones/iphone-15-pro-max-bt.png'},
    {nombre: 'iPhone 15 Pro Max', capacidad: 512, color: 'Black Titanum',    precio: 1500, img:'/assets/iphones/iphone-15-pro-max-black.png'},
    {nombre: 'iPhone 15 Pro Max', capacidad: 512, color: 'White Titanum',    precio: 1500, img:'/assets/iphones/iphone-15-pro-max-wt.png'},    
    {nombre: 'iPhone 15 Pro',     capacidad: 128, color: 'Natural Titanium', precio: 1100, img:'/assets/iphones/iphone-15-pro-max-nt.png'},
    {nombre: 'iPhone 15 Pro',     capacidad: 128, color: 'Black Titanium' ,  precio: 1100, img:'/assets/iphones/iphone-15-pro-max-black.png'},
    {nombre: 'iPhone 15 Pro',     capacidad: 128, color: 'White Titanium' ,  precio: 1100, img:'/assets/iphones/iphone-15-pro-max-wt.png'},
    {nombre: 'iPhone 15 Pro',     capacidad: 256, color: 'Natural Titanium', precio: 1200, img:'/assets/iphones/iphone-15-pro-max-nt.png'},
    {nombre: 'iPhone 15 Pro',     capacidad: 256, color: 'Black Titanium',   precio: 1200, img:'/assets/iphones/iphone-15-pro-max-black.png'},
    {nombre: 'iPhone 15',         capacidad: 128, color: 'Pink',             precio: 900,  img:'/assets/iphones/iphone-15-pink.png'},
    {nombre: 'iPhone 15',         capacidad: 128, color: 'Blue',             precio: 900,  img:''},
    {nombre: 'iPhone 15',         capacidad: 128, color: 'Black',            precio: 900,  img:''},
    {nombre: 'iPhone 15',         capacidad: 256, color: 'Pink',             precio: 1000, img:''},
    {nombre: 'iPhone 15',         capacidad: 256, color: 'Yellow',           precio: 1000, img:''},
    {nombre: 'iPhone 15',         capacidad: 256, color: 'Green',            precio: 1000, img:''},
    {nombre: 'iPhone 15 Plus',    capacidad: 128, color: 'Pink',             precio: 1000, img:''},
    {nombre: 'iPhone 15 Plus',    capacidad: 128, color: 'Yellow',           precio: 1000, img:''},
    {nombre: 'iPhone 15 Plus',    capacidad: 256, color: 'Green',            precio: 1100, img:''},
    {nombre: 'iPhone 15 Plus',    capacidad: 256, color: 'Black',            precio: 1100, img:''},
    {nombre: 'iPhone 15 Plus',    capacidad: 512, color: 'Blue',             precio: 1300, img:''},
    {nombre: 'iPhone 14',         capacidad: 128, color: 'Purple' ,          precio: 800,  img:''},
    {nombre: 'iPhone 13',         capacidad: 128, color: 'Starlight',        precio: 700,  img:''},
    {nombre: 'iPhone SE 3rd gen', capacidad: 128, color: 'Red',              precio: 600,  img:''},
]

//GENERA UNA LISTA CON SOLAMENTE LOS NOMBRE DE LOS MODELOS
const nombreModelos = [];
for (let i=0; i < modelosIphone.length ; i++){
    const modelo = modelosIphone[i].nombre;
    if(!nombreModelos.some(item => item == modelo)){
        nombreModelos.push(modelo);
    }
}

const productsContainer = document.querySelector('.products');
//FUNCION PARA SACAR LOS ESPACIOS A LOS NOMBRES
function sinEspacios(cadena){
    return cadena.replace(/\s/g, '');
}

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
function generarTarjetasProducto(productos){
    for(let i = 0; i < productos.length; i++){
        const producto = productos[i];
        productsContainer.innerHTML +=/* HTML */`<div class="card_producto">
                                                    <img src=${producto.img} alt="${producto.nombre}">
                                                    <h4>${producto.nombre} ${producto.color}</h4>
                                                    <span>${producto.capacidad}gb</span>
                                                    <span class="price">USD $${producto.precio}</span>
                                                    <button><a href="">Añadir al carrito <i class="fa-solid fa-cart-shopping"></i></a></button>
                                                </div>`
    }
}

//FILTRA LAS CARDS SEGUN EL MODELO SELECCIONADO
function filtrar(modelo) {
    if (modelo == 'Todos los modelos'){
        limpiarContenedor();
        generarTarjetasProducto(modelosIphone);
    } else{
        const productosFiltrados = modelosIphone.filter(producto => producto.nombre === modelo);
        limpiarContenedor();
        generarTarjetasProducto(productosFiltrados);
    }
}

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
        generarTarjetasProducto(productosFiltrados);
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



document.addEventListener('DOMContentLoaded', function () {
    generarBotonesFiltro();
    generarTarjetasProducto(modelosIphone);
    
    const todosLosBotonesDeFiltro = document.querySelectorAll(`.filtro-btn`)
    todosLosBotonesDeFiltro.forEach(button => {
        button.addEventListener('click', function() {
            filtrar(this.textContent);
        });
    });

});