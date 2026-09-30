import './style.css'
let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let urlPath = new URLSearchParams(location.search);
    let productId = urlPath.get("id");

    fetch('https://dummyjson.com/products/' + productId)
        .then(response => response.json())
        .then(product => {
            let detail = document.getElementById("detail");
            detail.innerHTML = `
                <img src="${product.images[0]}">
                <div>
                    <h2>${product.title}</h2>
                    <p><b>Price:</b> $${product.price}</p>
                    <p><b>Category:</b> ${product.category}</p>
                    <p><b>Rating:</b> ${product.rating}</p>
                    <p><b>Stock:</b> ${product.stock}</p>
                    <p>${product.description}</p>
                    <div class="button-group">
                    <button id="addtocart">Add to cart</button>
                    <a class="cart-button" href="/cart.html">View Cart</a>
                    </div>
                </div>
            `;

            document.getElementById("addtocart").addEventListener("click", () => {
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                document.getElementById("addtocart").textContent= "Product added";
                setTimeout( () => {
                 document.getElementById("addtocart").textContent = "Add product"
                } , 1000)
            });
            let pcount = document.getElementById('procount');
            pcount.innerHTML = cart.length;
        })
        .catch(error => {
            console.log(error);
            document.getElementById("detail").innerHTML = "<p>Product not found.</p>";
        });