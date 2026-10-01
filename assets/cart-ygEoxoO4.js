import"./style-BmZvC_QO.js";var e=JSON.parse(localStorage.getItem(`cart`))||[],t=document.getElementById(`cartProducts`),n=document.getElementById(`cartTotal`),r=document.getElementById(`checkoutBtn`),i=document.getElementById(`procount`);function a(){if(t.innerHTML=``,s(),e.length===0){t.innerHTML=`<p>Your cart is empty.</p>`,n.innerHTML=`Total: $0.00`,r&&(r.style.display=`none`);return}r&&(r.style.display=`block`),e.forEach((e,n)=>{let r=e.quantity||1;t.innerHTML+=`
            <div class="cart-product">
                <img src="${e.images[0]}">
                <div class="cart-content">
                    <h2>${e.title}</h2>
                    <p>Price: $${e.price}</p>
                    <div class="quantity">
                        <button type="button" data-index="${n}" class="minus qt">-</button>
                        <span>${r}</span>
                        <button type="button" data-index="${n}" class="plus qt">+</button>
                    </div>
                    <button type="button" data-index="${n}" class="delete">
                        Delete
                    </button>
                </div>
            </div>
        `}),o()}function o(){let t=0;e.forEach(e=>{let n=e.quantity||1;t+=e.price*n}),n.innerHTML=`Total: $${t.toFixed(2)}`}function s(){let t=e.reduce((e,t)=>e+(t.quantity||1),0);i&&(i.innerHTML=t)}t.addEventListener(`click`,t=>{let n=t.target,r=n.dataset.index;r!==void 0&&(r=Number(r),e[r].quantity||(e[r].quantity=1),n.classList.contains(`plus`)?e[r].quantity++:n.classList.contains(`minus`)?e[r].quantity>1&&e[r].quantity--:n.classList.contains(`delete`)&&e.splice(r,1),localStorage.setItem(`cart`,JSON.stringify(e)),a())}),a();