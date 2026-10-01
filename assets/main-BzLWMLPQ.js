import"./style-BC-ahMUx.js";var e=JSON.parse(localStorage.getItem(`cart`))||[],t=document.getElementById(`procount`),n=document.getElementById(`popupContainer`),r=[];fetch(`https://dummyjson.com/products?limit=15`).then(e=>e.json()).then(e=>{r=e.products,i(r);let t=document.getElementById(`loader`);t&&(t.classList.add(`fade-out`),setTimeout(()=>t.remove(),300));let n;document.getElementById(`findproduct`).addEventListener(`input`,e=>{clearTimeout(n),n=setTimeout(()=>{let t=e.target.value.toLowerCase().trim();i(r.filter(e=>e.title.toLowerCase().includes(t)))},600)});let a=document.getElementById(`category`),o=[];e.products.forEach(e=>{o.includes(e.category)||(o.push(e.category),a.innerHTML+=`<div data-cat="${e.category}" class="category-type"> ${e.category} </div>`)}),a.addEventListener(`click`,e=>{let t=e.target.dataset.cat;document.querySelectorAll(`.category-type`).forEach(e=>{e.classList.remove(`active`)}),e.target.classList.add(`active`),t&&i(r.filter(e=>e.category===t))}),document.getElementById(`sortAsc`).addEventListener(`click`,()=>{i([...r].sort((e,t)=>e.price-t.price)),document.getElementById(`sortAsc`).classList.add(`active`),document.getElementById(`sortDesc`).classList.remove(`active`)}),document.getElementById(`sortDesc`).addEventListener(`click`,()=>{i([...r].sort((e,t)=>t.price-e.price)),document.getElementById(`sortDesc`).classList.add(`active`),document.getElementById(`sortAsc`).classList.remove(`active`)})}).catch(e=>{console.log(e)});function i(t){let n=document.getElementById(`innerProducts`);n.innerHTML=``,t.forEach(e=>{n.innerHTML+=`
                <div class="innerproduct">
                    <img src="${e.images[0]}">
                    <h2><a href="product.html?id=${e.id}">${e.title}</a></h2>
                    <p>${e.price}</p>
                    <p>${e.description}</p>
                    <button data-id="${e.id}" class="addtocart">Add to cart</button>
                </div>
            `}),document.querySelectorAll(`.addtocart`).forEach(t=>{t.addEventListener(`click`,()=>{let n=Number(t.dataset.id),i=r.find(e=>e.id==n);e.push(i),localStorage.setItem(`cart`,JSON.stringify(e)),a(),t.textContent=`Product added`,setTimeout(()=>{t.textContent=`Add to cart`},1e3)})})}t.addEventListener(`click`,t=>{t.preventDefault();let r=``;e.forEach((e,t)=>{r+=`
                <div class="cart-product">
                    <img src="${e.images[0]}">
                    <div class="content">
                        <h4>${e.title}</h4>
                        <p>${e.price}</p>
                        <button data-id="${t}" class="delpro">Delete</button>
                    </div>
                </div>
            `}),e.length===0&&(r=`<p>Your cart is empty.</p>`),n.innerHTML=`
            <div class="popup">
                <div class="popup-inner">
                    <div class="popup-content">
                        <h3>Cart Details</h3>
                        <div class="cartdetails">${r}</div>
                    </div>
                    <div id="closebtn">Close</div>
                    <div class="button-group">
                    <a class="cart-button" href="cart.html">
                        View Cart
                    </a>
                    <a href="checkout.html" class="cart-button" id="checkoutBtn">
                        Checkout
                    </a>
                </div>
                </div>
            </div>
        `,document.querySelectorAll(`.delpro`).forEach(t=>{t.addEventListener(`click`,()=>{let n=Number(t.dataset.id);e.splice(n,1),localStorage.setItem(`cart`,JSON.stringify(e)),a(),t.closest(`.cart-product`).remove(),e.length===0&&(document.querySelector(`.cartdetails`).innerHTML=`<p>Your cart is empty.</p>`)})});let i=document.getElementById(`closebtn`),o=document.querySelector(`.popup`);i.addEventListener(`click`,()=>{o.classList.add(`hide`)})});function a(){let e=(JSON.parse(localStorage.getItem(`cart`))||[]).reduce((e,t)=>e+(t.quantity||1),0),t=document.getElementById(`procount`);t&&(t.innerHTML=e)}a(),window.addEventListener(`pageshow`,a);