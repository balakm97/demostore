import './style.css'
let form = document.getElementById("checkoutForm");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let pcount = document.getElementById('procount');
pcount.innerHTML = cart.length;
let cartDetail = document.getElementById("cartdetails");
cart.forEach((products) => {
    cartDetail.innerHTML += `<div class="cart-summary">
    <div class="cart-content">
    <img src="${products.images[0]}">
    </div>
    <div class="inner-content">
    <h4>${ products.title }</h4>
    <p>${ products.price }</p>
    </div>
    </div>`
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let pincode = document.getElementById("pincode");
    if (name.value.trim() === "") {
        document.getElementById("nameError").innerHTML =
            "Please enter your name";
        isValid = false;
    } else {
        document.getElementById("nameError").innerHTML = "";
    }
    if (email.value.trim() === "") {
        document.getElementById("emailError").innerHTML =
            "Please enter your email";
        isValid = false;
    } else if (!email.value.includes("@")) {
        document.getElementById("emailError").innerHTML =
            "Please enter a valid email";
        isValid = false;
    } else {
        document.getElementById("emailError").innerHTML = "";
    }
    if (phone.value.trim() === "") {
        document.getElementById("phoneError").innerHTML =
            "Please enter your phone number";
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone.value)) {

        document.getElementById("phoneError").innerHTML =
            "Enter a valid 10 digit phone number";
        isValid = false;

    } else {
        document.getElementById("phoneError").innerHTML = "";
    }
    if (address.value.trim() === "") {
        document.getElementById("addressError").innerHTML =
            "Please enter your address";
        isValid = false;
    } else {
        document.getElementById("addressError").innerHTML = "";
    }
    if (city.value.trim() === "") {

        document.getElementById("cityError").innerHTML =
            "Please enter your city";
        isValid = false;
    } else {
        document.getElementById("cityError").innerHTML = "";
    }
    if (pincode.value.trim() === "") {

        document.getElementById("pincodeError").innerHTML =
            "Please enter your PIN code";
        isValid = false;
    } else if (!/^[0-9]{6}$/.test(pincode.value)) {
        document.getElementById("pincodeError").innerHTML =
            "Enter a valid 6 digit PIN code";
        isValid = false;
    } else {
        document.getElementById("pincodeError").innerHTML = "";
    }
    if (isValid) {
        form.classList.add("hide");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        pcount.innerHTML = 0;
        document.querySelector('.int-order').classList.add("hide");
        let ostatus = document.getElementById("result")
        ostatus.innerHTML = `<p>Order placed successfully!</p>`
        console.log("Order placed successfully!");
    }
});
function syncCartBadge() {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = currentCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    let pcount = document.getElementById('procount');
    if (pcount) {
        pcount.innerHTML = totalItems;
    }
}
syncCartBadge();
window.addEventListener("pageshow", syncCartBadge);