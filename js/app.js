
const productsContainer = document.querySelector('.products');
const loader = document.querySelector('.loader');
const navCategories = document.querySelector('.nav_categories');
const titulo = document.querySelector('h1');
const searchIcon = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const spanCantidad = document.querySelector('.cant_articulos');
const seccionFiltroModelos = document.querySelector('.modelos');
const order = document.querySelector('#order');
const cartBtn = document.querySelector('.fa-cart-shopping');
const cartProductsContainer = document.querySelector('.cart_products');
const removeButtons = document.querySelectorAll('.remove_item');
const categoriesContainer = document.querySelector(".product_categories")
const bodyIndex = document.querySelector('#body_index');
const bodyProductos = document.querySelector('#productos');

let productos;
let categorias;
let storedProducts;

const storedCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
const cart = new Cart( storedCart );


//<-------------------------------------UI------------------------------------->
// Renderiza las categorias en el index
const renderCategories = (list) => {
    for( const category of list){
        categoriesContainer.innerHTML += //html
        `<div class="category_card">
            <img src="${category.img}" alt="${category.description}">
            <div class="category_details">
                <h2>${category.name}</h2>
                <button id="${category.category_id}"><a class="category_index_btn" id="${category.category_id}" href="./pages/products.html">Ver más ></a></button>
            </div>
        </div>`
    }
}
// Renderiza los productos
const renderProducts = ( products ) => {
    cleanContainer();
    for (const producto of products) {
        productsContainer.innerHTML += //HTML
                                    `<div class="card_producto">
                                        <img src=${producto.img} alt="${producto.name}">
                                        <h4><span class="product_name">${producto.name}</span><span class="product_color"> ${producto.color}</span></h4>
                                        <span class="product_capacity">${producto.capacity}</span>
                                        <span class="price">USD $${producto.price}</span>
                                        <button id=${producto.id} class="btn_add_to_cart">Añadir al carrito <i class="fa-solid fa-cart-shopping"></i></button>
                                    </div>`
    }
    renderLength(products);
}
// Renderiza la barra de navegación
const renderNav = ( categories ) => {
    if( !bodyIndex ) {
        navCategories.innerHTML += //html
            `<li class="nav_btn" id="0">All</li>` ;
            for (const item of categories)  {
                navCategories.innerHTML +=//html
                `<li class="nav_btn" id="${item.category_id}">${item.name}</li> `;
            }
    } else {
        navCategories.innerHTML += //html
            `<li class="nav_btn" id="0"><a href ="./pages/products.html">All</a></li>` ;
            for (const item of categories)  {
                navCategories.innerHTML +=//html
                `<li><a class="nav_btn" id="${item.category_id}" href="./pages/products.html">${item.name}</a></li> `;
            }
    }
}
// Renderiza el titulo principal
const renderTitle = ( name ) => {
    titulo.innerText = name;
}
// Renderiza la cantidad de articulos que se muestran
const renderLength = (productList) => {
    let total = productList.length;
    spanCantidad.innerText= `${total}`;
}
// renderiza un lista con los modelos en la seccion filtrar
const renderFilterButtons = (productList) =>{
    modelNames = extractNames(productList);
    seccionFiltroModelos.innerHTML = '';
    seccionFiltroModelos.innerHTML += /* HTML */ `<button class="filtro-btn">Todos los modelos</button>`
    for (const modelo of modelNames){
        seccionFiltroModelos.innerHTML+=/* HTML */`<button class="filtro-btn">${modelo}</button>`
    }
}

//<----------------------------------------AUXILIARES---------------------------------------->
//filtra los productos segun el id de su categoria
const filtrarPorID = (lista, id) => {
    return lista.filter( item => item.category_id == id);
}
// muestra el loader
const showLoader = () => {loader.style.display = 'flex'};
// esconde el loader
const hideLoader = () => { loader.style.display = 'none'};
// limpia el contenedor de los productos
const cleanContainer = () => { productsContainer.innerHTML =''; }
// muestra / esconde el input de busqueda
const toggleSearch = () => {
    searchInput.style.display =  searchInput.style.display === "none" ? "block": "none";
}
// muestra / esconde el carrito
const toggleCart = () => {
    cartProductsContainer.style.display = (cartProductsContainer.style.display === 'none') ? 'flex': 'none' ;
}
// quita los espacios de los strings
const sinEspacios = (cadena) => {
    return cadena.replace(/\s/g, ''); 
}
// Busca un nombre ingresado en la lista de productos 
const search = (product, list) => {
    const searchedElement = sinEspacios(product.toLowerCase());
    const filteredProducts = list.filter( p => {
        const LowerCaseProductName = sinEspacios(p.name.toLowerCase());
        return LowerCaseProductName.includes(searchedElement);
    });
    if (filteredProducts.length !== 0){
        renderProducts(filteredProducts);
        renderTitle(`Se muestran resultados de "${product}"`);
    } else{
        productsContainer.innerHTML = /* HTML */
        `<p class='no-results'>No se encontraron resultados para "${product}"</p>`;
        renderTitle('');
        renderLength([]);                        
    }
}
// Extrae los nombres de los distintos modelos de la lista de productos
const extractNames = (productList) => {
    const modelNames = [];
    for (let i=0; i < productList.length ; i++){
        const modelo = productList[i].name;
        if(!modelNames.some(item => item == modelo)){
            modelNames.push(modelo);
        }
    }
    return modelNames;
}
//  Filtra segun el modelo seleccionado
const filtrarPorNombre = (modelo, productList) => {
    let productosFiltrados
    if (modelo == 'Todos los modelos'){
        productosFiltrados =  JSON.parse(localStorage.getItem('categoriaActiva')) ?? productos;
    } else{
        productosFiltrados = productList.filter(producto => producto.name == modelo);
    }
    renderProducts(productosFiltrados);
    renderTitle(modelo);
    localStorage.setItem('filtroActivo', JSON.stringify(productosFiltrados));
    localStorage.setItem('titulo', modelo);
}
//  Ordena segun algun criterio seleccionado
const ordenarSegun = (criterio, list) => {
    if ( criterio == 'ascendente'){
        list.sort((a, b) => a.price - b.price);
    } else if ( criterio == 'descendente'){
        list.sort((a,b)=> b.price-a.price);
    } else {
        list.sort((a,b) => a.name.localeCompare(b.name));
    }
    renderProducts(list);
}

//muestra un mensaje de error
function showError(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}
// <-------------------------OBTENER PRODUCTOS DEL JSON Y RENDERIZAR------------------------->
async function getProducts() {
    hideLoader();
    try {
        const endPoint = bodyIndex ? 'data.json' : '../data.json';
        const response = await fetch(endPoint);
        const data = await response.json();
        const { products, categories } = data;
        let filtroGuardado;
        let categoriaGuardada;
        productos = products;
        categorias = categories;
        storedProducts = JSON.parse(localStorage.getItem('products')) ?? productos;

        if ( bodyIndex ) {
            renderCategories(categorias);
            renderNav(categorias);
        } else {
            categoriaGuardada = JSON.parse(localStorage.getItem('categoriaActiva')) ?? productos;
            filtroGuardado = JSON.parse(localStorage.getItem('filtroActivo')) ?? categoriaGuardada;

            const tituloGuardado = localStorage.getItem('titulo') ?? 'Todos los productos';
            renderProducts(filtroGuardado);
            renderTitle(tituloGuardado);
            renderFilterButtons(categoriaGuardada);
            renderNav(categorias);
        }
    } catch (error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error al cargar los datos!",
        });
    } finally {
        hideLoader(); 
    }
    
}

getProducts();



// <-----------------------------------EVENT LISTENERS----------------------------------->
// <--------Event listeners de INDEX.HMTL-------->
if ( bodyIndex) {
    document.addEventListener('click', e=>{
        const btn = e.target;
        if(btn.classList.contains('nav_btn') || btn.classList.contains('category_index_btn') || btn.classList.contains('comprar')){
            const id = btn.id;
            const name = id != 0 ? (categorias.find( item => item.category_id == id)).name : 'Todos los productos';
            const prods = id != 0 ? filtrarPorID(productos, id) : productos ;
            localStorage.setItem('filtroActivo', JSON.stringify(prods));
            prods != [] ? localStorage.setItem('categoriaActiva', JSON.stringify(prods)) : localStorage.setItem('categoriaActiva', productos);
            localStorage.setItem('titulo', name);
        }
    });
}

// <-------Event Listeners de PRODUCTS.HTML------->
if ( ! bodyIndex ) {
    // Añado un event listener en la barra de navegacion para que se active al clickear alguna categoria
    navCategories.addEventListener('click', e => {
        const btn = e.target;
        let categoriaSeleccionada;
        let textoTitulo;
        if (btn.classList.contains('nav_btn')) {
            const idCategory = btn.id;
            if  (idCategory == '0') {
                categoriaSeleccionada = productos;            
                textoTitulo = 'Todos los productos'; 
            } else {
                categoriaSeleccionada = filtrarPorID(productos, idCategory);
                textoTitulo = btn.innerText;
            }
            renderProducts(categoriaSeleccionada);
            renderTitle(textoTitulo);
            renderFilterButtons(categoriaSeleccionada);
            localStorage.setItem('categoriaActiva', JSON.stringify(categoriaSeleccionada));  //Guardo la categoria en el localStorage
            localStorage.setItem('filtroActivo', JSON.stringify(categoriaSeleccionada)); //Guardo el filtro en el localstorage
            localStorage.setItem('titulo', textoTitulo); // Guardo el nombre del filtro en el localstorage
        }
    });

    // añado event listener a la seccion de productos para que al clickear agregar al carrito se añada;
    productsContainer.addEventListener('click', e => {
        e.preventDefault;
        const btn = e.target
        if ( btn.classList.contains('btn_add_to_cart')){
            const ID = e.target.id;
            const product = storedProducts.find( p => p.id == ID ) ;
            if (product.stock > 0 ) {
                cart.addToCart(product);
                product.stock -=1
                localStorage.setItem('products', JSON.stringify(storedProducts));
            }  else showError('Insuficiente stock');
        }
    });
    // Añado un event listener al input para buscar productos
    searchInput.addEventListener('change', () => {
        showLoader();
        setTimeout(() => {
            const valorInput = searchInput.value;
            if(valorInput != ''){
                search(valorInput, productos);
            }
            hideLoader();
        }, 1000);
    });
    // Añado event listener para que filtre segun el modelo clickeado;
    seccionFiltroModelos.addEventListener('click', e => {
        e.preventDefault();
        const btn = e.target
        if (btn.classList.contains('filtro-btn')){
            filtrarPorNombre(btn.textContent, productos);
        }
    });

    // Añado un event listener para el selector de orden
    order.addEventListener("change", ()=>{
        const selectedElement = order.value;
        const filtroGuardado = JSON.parse(localStorage.getItem('filtroActivo')) ?? productos;
        ordenarSegun(selectedElement, filtroGuardado);
    });

    // Añado event listener al icono de busqueda para que se muestre/esconda
    searchIcon.addEventListener('click', () =>  toggleSearch());  
}


// <----EVENTS LISTENERS COMUNES A AMBOS ARCHIVOS---->;

//Añado un event listener al icono del carrito para que se muestre/esconda
cartBtn.addEventListener('click', ()  => toggleCart());

cartProductsContainer.addEventListener('click', e =>{
    const product = e.target.parentElement.parentElement
    const id = product.id;
    const index = storedProducts.findIndex(p => p.id == id)
    // Al presionar el icono de "basura", elimina el producto del carrito
    if (e.target.classList.contains('remove_item')){
        storedProducts[index].stock += 1;
        cart.removeAllUnits( id );
    }
    // agregar / quitar unidades de producto
    if (e.target.classList.contains('add')){
        const product = storedProducts.find( p => p.id == id ) ;
        if (product.stock > 0 ) {
            cart.addToCart(product);
            product.stock -=1
            localStorage.setItem('products', JSON.stringify(storedProducts));
        }else showError('Insuficiente stock');
    }
    if (e.target.classList.contains('reduce')){
            cart.removeFromCart(id);
            storedProducts[index].stock += 1;
    }
    if (e.target.id == 'vaciar_carrito'){
        cart.cart.forEach( item => {
            const index = storedProducts.findIndex( prod => prod.id == item.id);
            index != -1  ? storedProducts[index].stock += item.units : null;
        }) 
        cart.cleanCart();
    }

    localStorage.setItem('products', JSON.stringify(storedProducts));
}); 


