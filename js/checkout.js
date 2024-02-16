const discountCodes = [
    { code: 'TECH10',   discountPercentage: 10},
    { code: 'SAVE20',   discountPercentage: 20},
    { code: 'CODER',    discountPercentage: 30},
    { code: 'MOBILE15', discountPercentage: 15},
]
const btnApplyDiscount = document.querySelector('#apply_discount_btn');
const btnBuy = document.querySelector('.finalizar_compra');
const discountInput = document.querySelector('#discount_input');
const checkoutTableBody = document.querySelector('#checkout_table tbody')

const cart = new Cart(JSON.parse(localStorage.getItem('cart')));

let total = cart.getTotal();
let descuento;

// aplica el codigo de descuento escrito en el input
function applyDiscount(){
    const discountCode = (discountInput.value.trim()).toUpperCase(); // obtengo el codigo ingresado en el input
    const validCodes = discountCodes.map( item => item.code); // obtengo solo los codigos de la lista
    if ( ! descuento ) { //si no hay ningun descuento aplicado, validación para que se pueda aplicar una sola vez 
        if( validCodes.includes(discountCode) ){
            descuento = discountCodes.find( item => item.code === discountCode ).discountPercentage; // obtengo el porcentaje de descuento
            total -= calcDiscount(total, descuento);
            showMessage('Código aplicado con éxito', 'success');
            renderCheckoutTotal();
        } else{
            showMessage('Código de descuento inválido', 'error');
        }
}
}

// muestra un mensaje segun si el codigo aplicado es valido o no 
function showMessage(message, clase) {
    const discountMessage = document.querySelector('.discount_message');
    discountMessage.textContent = message;
    discountMessage.className = `discount_message ${clase}`;
}

function calcDiscount(total, percentage){
    return (total * percentage) / 100;
}

function renderCheckoutProducts(){
    const cartList = cart.cart;

    checkoutTableBody.innerHTML = '';
    cartList.forEach((item) =>{
        const {img, name, capacity, color, units, price} = item;
        checkoutTableBody.innerHTML += //HTML 
            `<tr>
            <td class="checkout_product">
                <img src=${img} alt="${name}">
                <div>
                    <p class="product_name">${name} (${capacity})</p>
                    <span>${color}</span>
                </div>
            </td>
            <td class="checkout_price"> $ ${price}</td>
            <td class="checkout_quantity">${units}</td>
            <td class="checkout_product_total">$ ${price*units}</td>
        </tr>`
    });

    
}
function renderCheckoutTotal(){
    const checkoutTotalContainer = document.querySelector('.checkout_total');
    const totalPrice = document.querySelector('.total_price')

    if ( descuento ) {
        checkoutTotalContainer.innerHTML = //html
            `<div>
                <p class="total_quantity">${cart.getCount()} artículos</p>
                <span class="subtotal_price discount_true">$ ${cart.getTotal()}</span>
            </div>
            <div class="discount">
                <p>Descuento de ${descuento}%</p>
                <span> -  $${calcDiscount(total, descuento)}</span>
            </div>`;

        totalPrice.innerHTML = //html
            `<span>Total: </span>
            <span class="total_price">$${total}</span>`;
    } else {
        checkoutTotalContainer.innerHTML = //html
            `<div>
                <p class="total_quantity">${cart.getCount()} artículos</p>
                <span class="subtotal_price">$ ${cart.getTotal()}</span>
            </div>`

        totalPrice.innerHTML = //html
            `<span>Total: </span>
            <span class="total_price">$${total}</span>`;
            
    }
}


    
    renderCheckoutProducts();
    renderCheckoutTotal();

    btnApplyDiscount.addEventListener('click', applyDiscount);
    
    btnBuy.addEventListener('click', () => {
        Swal.fire({
                title: "Compra realizada!",
                text: "Muchas gracias por su compra!",
                icon: "success"
        })
        localStorage.removeItem('cart');
    })
