
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

const storedCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
const cart = new Cart( storedCart );

const filtrarProductos = (lista, id) => {
    return lista.filter( item => item.category_id == id);
}

const showLoader = () => {loader.style.display = 'flex'};
const hideLoader = () => { loader.style.display = 'none'};
const cleanContainer = () => { productsContainer.innerHTML =''; }
const toggleSearch = () => {
    searchInput.style.display =  searchInput.style.display === "none" ? "block": "none";
}
const toggleCart = () => {
    cartProductsContainer.style.display = (cartProductsContainer.style.display === 'none') ? 'flex': 'none' ;
}
const sinEspacios = (cadena) => {
    return cadena.replace(/\s/g, ''); 
}
// obtener productos del json
async function getProducts() {
    hideLoader();
    try {
        const endPoint = './js/data.json';
        const response = await fetch(endPoint);
        const data = await response.json();
        const { products, categories } = data;
        let filtroGuardado;
        let categoriaGuardada;
        productos = products;
        categorias = categories;

        if ( bodyIndex ) {
            renderCategories(categorias);
        } else {
            if (document.referrer){
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get('id'); 
                id != 'todos' ? filtro = filtrarProductos(productos, id) : filtro = productos;
                categoriaGuardada =  filtro;
                filtroGuardado = filtro;
                const titulo = categorias.find( c => c.category_id == id)?  categorias.find( c => c.category_id == id).name : 'Todos los productos'
                localStorage.setItem('titulo',  titulo);
            } else {
                categoriaGuardada = JSON.parse(localStorage.getItem('categoriaActiva')) ?? productos;
                filtroGuardado = JSON.parse(localStorage.getItem('filtroActivo')) ?? categoriaGuardada;
            }
            const tituloGuardado = localStorage.getItem('titulo') ?? 'Todos los productos';
            renderProducts(filtroGuardado);
            renderTitle(tituloGuardado);
            renderFilterButtons(categoriaGuardada);
            renderNav(categorias);
        }
        
        
    } catch (error){
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error al cargar los datos!",
        });
    } finally {
        hideLoader(); 
    }
    
}


// Renderiza las categorias en el index
const renderCategories = (list) => {
    for( const category of list){
        categoriesContainer.innerHTML += //html
        `<div class="category_card">
            <img src="${category.img}" alt="${category.description}">
            <div class="category_details">
                <h2>${category.name}</h2>
                <button><a href="./pages/products.html">Ver más ></a></button>
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
    navCategories.innerHTML += //html
        `<li class="nav_btn" id="todos">Ver todos</li>` ;
    for (const item of categories)  {
        navCategories.innerHTML +=//html
        `<li class="nav_btn" id="${item.category_id}">${item.name}</li> `;
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

// Busca un producto en la lista de productos
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

// renderiza un lista con los modelos en la seccion filtrar
const renderFilterButtons = (productList) =>{
    modelNames = extractNames(productList);
    seccionFiltroModelos.innerHTML = '';
    seccionFiltroModelos.innerHTML += /* HTML */ `<button class="filtro-btn">Todos los modelos</button>`
    for (const modelo of modelNames){
        seccionFiltroModelos.innerHTML+=/* HTML */`<button class="filtro-btn">${modelo}</button>`
    }
}
//  Filtra segun el modelo seleccionado
const filtrar = (modelo, productList) => {
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

getProducts();

// <-----------------------------------EVENT LISTENERS----------------------------------->
//Añado un event listener al icono del carrito para que se muestre/esconda
cartBtn.addEventListener('click', ()  => toggleCart());
// Al presionar el icono de "basura", elimina el producto del carrito
cartProductsContainer.addEventListener('click', e =>{
    if (e.target.classList.contains('remove_item')){
        const product = e.target.parentElement;
        const id = product.id;
        console.log(cart);
        cart.removeFromCart( id );
    }
}); 


if ( ! document.querySelector('#body_index')) {
    
    // añado event listener a la seccion de productos para que al clickear agregar al carrito se añada;
    productsContainer.addEventListener('click', e => {
        e.preventDefault;
        const btn = e.target
        if ( btn.classList.contains('btn_add_to_cart')){
            const ID = e.target.id;
            const product = productos.find( p => p.id == ID ) ;
            cart.addToCart(product);
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
            filtrar(btn.textContent, productos);
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

    // Añado un event listener en la barra de navegacion para que se active al clickear alguna categoria
    navCategories.addEventListener('click', e => {
        const btn = e.target
        let categoriaSeleccionada
        let textoTitulo
        if (btn.classList.contains('nav_btn')) {
            const idCategory = btn.id;
            if  (idCategory == 'todos') {
                categoriaSeleccionada = productos;            
                textoTitulo = 'Todos los productos'; 
            } else {
                categoriaSeleccionada = filtrarProductos(productos, idCategory);
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

}