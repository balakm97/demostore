import './style.css'
 let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("procount");
    let popupContainer = document.getElementById("popupContainer");
    cartCount.innerHTML = cart.length;
    let allProducts = [];
    fetch('https://dummyjson.com/products?limit=15')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            showProducts(allProducts);
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(() => loader.remove(), 300);
            }

          let searchTimer; 
            let search = document.getElementById('findproduct');
            search.addEventListener('input', (event) => {
                clearTimeout(searchTimer);
                searchTimer = setTimeout(() => {
                    let text = event.target.value.toLowerCase().trim();
                    let matched = allProducts.filter(product => {
                        return product.title.toLowerCase().includes(text);
                    });
                    showProducts(matched);
                }, 600);
            });

            let pcategory = document.getElementById('category');
            let categories = [];

            data.products.forEach((pc) => {
                if (!categories.includes(pc.category)) {
                    categories.push(pc.category);
                    pcategory.innerHTML += `<div data-cat="${pc.category}" class="category-type"> ${pc.category} </div>`;
                }
            });
            pcategory.addEventListener("click", (event) => {
                let selectedCat = event.target.dataset.cat;
                document.querySelectorAll('.category-type').forEach(btn => {
                btn.classList.remove('active');
                });
                event.target.classList.add("active");
                if (!selectedCat) return; 
                let matched = allProducts.filter(product => {
                    return product.category === selectedCat;
                });
                showProducts(matched);
            });

            document.getElementById('sortAsc').addEventListener("click", () => {
                let sorted = [...allProducts].sort((a, b) => a.price - b.price);
                showProducts(sorted);
                document.getElementById('sortAsc').classList.add("active");
                document.getElementById('sortDesc').classList.remove("active");
            });
            document.getElementById('sortDesc').addEventListener("click", () => {
                let sorted = [...allProducts].sort((a, b) => b.price - a.price);
                showProducts(sorted);
                 document.getElementById('sortDesc').classList.add("active");
                document.getElementById('sortAsc').classList.remove("active");
            });
        })
        .catch(error => {
            console.log(error);
        });

    function showProducts(products) {
        let inProducts = document.getElementById("innerProducts");
        inProducts.innerHTML = "";
        products.forEach(product => {
            inProducts.innerHTML += `
                <div class="innerproduct">
                    <img src="${product.images[0]}">
                    <h2><a href="product.html?id=${product.id}">${product.title}</a></h2>
                    <p>${product.price}</p>
                    <p>${product.description}</p>
                    <button data-id="${product.id}" class="addtocart">Add to cart</button>
                </div>
            `;
        });

        let cartbtn = document.querySelectorAll(".addtocart");
        cartbtn.forEach(btn => {
            btn.addEventListener("click", () => {
                let productid = Number(btn.dataset.id);
                let selectedProduct = allProducts.find(product => {
                    return product.id == productid;
                });
                cart.push(selectedProduct);
                localStorage.setItem("cart", JSON.stringify(cart));
                cartCount.innerHTML = cart.length;
                btn.textContent = "Product added";
                setTimeout(() => {
                    btn.textContent = "Add to cart";
                }, 1000);
            });
        });
    }

    cartCount.addEventListener("click", (event) => {
        event.preventDefault();
        let cartProduct = "";
        cart.forEach((pro, index) => {
            cartProduct += `
                <div class="cart-product">
                    <img src="${pro.images[0]}">
                    <div class="content">
                        <h4>${pro.title}</h4>
                        <p>${pro.price}</p>
                        <button data-id="${index}" class="delpro">Delete</button>
                    </div>
                </div>
            `;
        });
        if (cart.length === 0) {
            cartProduct = `<p>Your cart is empty.</p>`;
        }
        popupContainer.innerHTML = `
            <div class="popup">
                <div class="popup-inner">
                    <div class="popup-content">
                        <h3>Cart Details</h3>
                        <div class="cartdetails">${cartProduct}</div>
                    </div>
                    <div id="closebtn">Close</div>
                    <div class="button-group">
                    <a class="cart-button" href="/cart.html">
                        View Cart
                    </a>
                    <a href="/checkout.html" class="cart-button" id="checkoutBtn">
                        Checkout
                    </a>
                </div>
                </div>
            </div>
        `;
        let delpro = document.querySelectorAll(".delpro");
        delpro.forEach((del) => {
            del.addEventListener("click", () => {
                let index = Number(del.dataset.id);
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                cartCount.innerHTML = cart.length;
                del.closest(".cart-product").remove();
                if (cart.length === 0) {
                    document.querySelector(".cartdetails").innerHTML = `<p>Your cart is empty.</p>`;
                }
            });
        });
        let closebt = document.getElementById("closebtn");
        let popups = document.querySelector(".popup");
        closebt.addEventListener("click", () => {
            popups.classList.add("hide");
        });
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