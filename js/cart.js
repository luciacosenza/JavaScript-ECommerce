class Cart{
    constructor( cartList = []){

        this.cart = cartList;
        if(!document.querySelector('#checkout')){

            this.renderCart();

        }
    }

    renderCart() {
        const spanTotal = document.querySelector('.total');
        const cartList = document.querySelector('.products_list');
        const cartLength = document.querySelectorAll('.cart_length');
        const checkoutBtn = document.querySelector('#checkout_btn');

        if (this.cart.length !== 0){
            cartList.innerHTML = '';
            spanTotal.innerHTML = '';
            cartLength.textContent = '0';
            for (const product of this.cart) {
                const {id, name, price, color, img, capacity, units} = product
                const cartProduct = document.createElement('div');
                cartProduct.classList.add(`cart__product`);
                cartProduct.innerHTML = /*HTML*/`
                    <img src="${img}" alt="${name}">
                    <div>
                        <div>
                            <p>${name}</p>
                            <span class="color">${color}</span><span>${capacity}GB</span>
                        </div>
                        <div class= "price__quantity">
                            <span>$ ${units*price}</span>
                            <span class="prod_cant">${units}x $${price}</span>
                        </div>
                        <i class="fa-regular fa-trash-can remove_item" id=${id}></i>
                    </div>
                    
                `;
                cartList.appendChild(cartProduct);
            }
            spanTotal.innerHTML = `${this.getTotal()}`;
            cartLength.forEach( item => item.textContent = `${this.getCount()}`);
        }else{
            cartList.innerHTML = /*HTML*/`<p>No hay productos en su carrito :(</p>`;
            cartLength.forEach(item => item.textContent = `${this.cart.length}`);
            spanTotal.style.display = 'none';
            checkoutBtn.style.display = 'none';
        }
    }

    
    addToCart( product ){
        const {id, name, img, price, color, capacity} = product;
        const index = this.cart.findIndex(  item => item.id === id );
        (index === -1) ? this.cart.push( {id, name, img, price, color, capacity, units: 1} ) :  this.cart[index].units += 1;
        /*  if(product.stock > 0){

            this.cart.push(product);
            this.total += product.price;
            product.stock -=1;

            // para actualizar el stock del producto
            /* const index = productList.findIndex( p => p === product);
            if (index != -1) {
                productList[index].stock = product.stock;
                localStorage.setItem(`products_${category}`,  JSON.stringify(productList));
            } */

            localStorage.setItem('cart', JSON.stringify(this.cart));
            
            this.renderCart();
            
            this.showToast(`${name} ${color} ${capacity} se ha agregado al carrito`);

        }/* else {
            this.showError(`${product.name} ${product.color} ${product.capacity} está agotado`)
        } */

    removeFromCart(productID){
        const index = this.cart.findIndex(p => ( p.id ==  productID) );
        const product = this.cart[index];
        const {name, color, capacity} = product;
        product.units > 1 ? product.units -= 1 : this.cart.splice(index , 1);

        localStorage.setItem('cart', JSON.stringify(this.cart));

        this.renderCart();
        this.showToast(`${name} ${color} ${capacity} se ha eliminado del carrito`);

    }    
    
    getCount(){
        const count = this.cart.reduce(  (cant, product) => {  return cant + product.units   }, 0  )
        return count;
    }

    getTotal(){
        const total = this.cart.reduce( (sum, product)=> sum + (product.price * product.units), 0 );
        return total;
    }

    showToast(message) {
        Toastify({
            text: message,
            gravity: "bottom",
            className: "btn-grad"
        }).showToast();
    }

    showError(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

}

