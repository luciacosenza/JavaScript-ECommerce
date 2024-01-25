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
    categoriesContainer.innerHTML += /*HTML*/
                                    `<div class="category_card">
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
const productsContainer = document.querySelector(".iphone_container");
for (let i = 0; i < iphones.length; i++){
  const iphone = iphones[i];
  productsContainer.innerHTML += /*HTML*/
                                  `<div class="card_producto">
                                      <img src="${iphone.img}" alt="${iphone.name}">
                                      <div class="info_producto">
                                          <h3>${iphone.name}</h3>
                                          <span class="precio">desde ${iphone.precio}</span>
                                          <button><a href="">Comprar</a></button>
                                      </div>
                                  </div>`
}

//BUSQUEDA
const iconBusqueda = document.querySelector('#search-btn');
const inputBusqueda = document.querySelector('#search-input');
iconBusqueda.addEventListener("click", function(){
    inputBusqueda.style.display = "block";
  })