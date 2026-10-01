import"./style-BmZvC_QO.js";var e=JSON.parse(localStorage.getItem(`cart`))||[],t=new URLSearchParams(location.search).get(`id`);fetch(`https://dummyjson.com/products/`+t).then(e=>e.json()).then(t=>{let n=document.getElementById(`detail`);n.innerHTML=`
                <img src="${t.images[0]}">
                <div>
                    <h2>${t.title}</h2>
                    <p><b>Price:</b> $${t.price}</p>
                    <p><b>Category:</b> ${t.category}</p>
                    <p><b>Rating:</b> ${t.rating}</p>
                    <p><b>Stock:</b> ${t.stock}</p>
                    <p>${t.description}</p>
                    <div class="button-group">
                    <button id="addtocart">Add to cart</button>
                    <a class="cart-button" href="cart.html">View Cart</a>
                    </div>
                </div>
            `,document.getElementById(`addtocart`).addEventListener(`click`,()=>{e.push(t),localStorage.setItem(`cart`,JSON.stringify(e)),document.getElementById(`addtocart`).textContent=`Product added`,setTimeout(()=>{document.getElementById(`addtocart`).textContent=`Add to product`},1e3)});let r=document.getElementById(`procount`);r.innerHTML=e.length}).catch(e=>{console.log(e),document.getElementById(`detail`).innerHTML=`<p>Product not found.</p>`});