import './style.css';

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartProducts = document.getElementById("cartProducts");
let cartTotal = document.getElementById("cartTotal");
let checkoutBtn = document.getElementById("checkoutBtn");
let pcount = document.getElementById('procount');

function showCart() {
    cartProducts.innerHTML = "";
    updateCartCount();
    if (cart.length === 0) {
        cartProducts.innerHTML = `<p>Your cart is empty.</p>`;
        cartTotal.innerHTML = "Total: $0.00";
        if (checkoutBtn) checkoutBtn.style.display = "none";
        return;
    }
    if (checkoutBtn) checkoutBtn.style.display = "block";
    cart.forEach((product, index) => {
        let quantity = product.quantity || 1;
        cartProducts.innerHTML += `
            <div class="cart-product">
                <img src="${product.images[0]}">
                <div class="cart-content">
                    <h2>${product.title}</h2>
                    <p>Price: $${product.price}</p>
                    <div class="quantity">
                        <button type="button" data-index="${index}" class="minus qt">-</button>
                        <span>${quantity}</span>
                        <button type="button" data-index="${index}" class="plus qt">+</button>
                    </div>
                    <button type="button" data-index="${index}" class="delete">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
    calculateTotal();
}

function calculateTotal() {
    let total = 0;

    cart.forEach((product) => {
        let quantity = product.quantity || 1;
        total += (product.price * quantity);
    });

    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

function updateCartCount() {
    let totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (pcount) {
        pcount.innerHTML = totalCount;
    }
}

cartProducts.addEventListener("click", (event) => {
    let target = event.target;
    let index = target.dataset.index;

    if (index === undefined) return;

    index = Number(index);

    if (!cart[index].quantity) {
        cart[index].quantity = 1;
    }

    if (target.classList.contains("plus")) {
        cart[index].quantity++;
    } 

    else if (target.classList.contains("minus")) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        }
    } 
    else if (target.classList.contains("delete")) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
});

showCart();