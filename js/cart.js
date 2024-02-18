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
        const emptyCartBtn = document.querySelector('#vaciar_carrito');

        if (this.cart.length != 0){
            cartList.innerHTML = '';
            spanTotal.innerHTML = '';
            cartLength.textContent = '0';
            spanTotal.style.display = 'inline-block';
            for (const product of this.cart) {
                const {id, name, price, color, img, capacity, units} = product
                const cartProduct = document.createElement('div');
                cartProduct.classList.add(`cart__product`);
                cartProduct.id = id;
                cartProduct.innerHTML = /*HTML*/`
                    <div class = "units">
                        <button class="reduce">-</button>
                            ${units}
                        <button class="add">+</button>
                    </div>
                    <img src="${img}" alt="${name}">
                    <div>
                        <div>
                            <p>${name}</p>
                            <span class="color">${color}</span><span>${capacity}</span>
                        </div>
                        <div class= "price__quantity">
                            <span>$ ${units*price}</span>
                            <span class="prod_cant">${units}x $${price}</span>
                        </div>
                        <i class="fa-regular fa-trash-can remove_item"></i>
                    </div>
                    
                `;
                cartList.appendChild(cartProduct);
            }
            spanTotal.innerHTML = `${this.getTotal()}`;
            cartLength.forEach( item => item.textContent = `${this.getCount()}`);
            checkoutBtn.style.display = 'block';
            emptyCartBtn.style.display = 'block';
        }else{
            cartList.innerHTML = /*HTML*/`<p>No hay productos en su carrito :(</p>`;
            cartLength.forEach(item => item.textContent = `${this.cart.length}`);
            spanTotal.style.display = 'none';
            checkoutBtn.style.display = 'none';
            emptyCartBtn.style.display = 'none';
        }
    }

    
    addToCart( product ){
        const {id, name, img, price, color, capacity} = product;
        const index = this.cart.findIndex(  item => item.id === id );
        (index === -1) ? this.cart.push( {id, name, img, price, color, capacity, units: 1} ) :  this.cart[index].units += 1;
            
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
        this.showToast(`${name} ${color} ${capacity} se ha agregado al carrito`);
    }

    removeFromCart(productID){
        const index = this.cart.findIndex(p => ( p.id ==  productID) );
        const product = this.cart[index];
        const {name, color, capacity} = product;
        product.units > 1 ? product.units -= 1 : this.cart.splice(index , 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
        this.showToast(`${name} ${color} ${capacity} se ha eliminado del carrito`);
    }
    
    removeAllUnits( productID ){
        const index = this.cart.findIndex(p => ( p.id ==  productID) );
        const product = this.cart[index];
        const {name, color, capacity} = product;
        this.cart.splice(index , 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
        this.showToast(`${name} ${color} ${capacity} se ha eliminado del carrito`);
    }

    cleanCart( ){
        this.cart = [];
        this.renderCart();
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

