const container = document.querySelector(".cart-products");
const totalPrice = document.querySelector(".total-price");
const clearBtn = document.querySelector(".clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  container.innerHTML = "";

  let total = 0;

  cart.forEach((product, index) => {
    total += product.price * product.quantity;

    container.innerHTML += `

        <div class="cart-item">

            <img src="${product.image}">

            <div class="cart-info">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

            </div>

            <div class="cart-actions">

                <button class="minus" data-index="${index}">-</button>

                <span class="quantity">${product.quantity}</span>

                <button class="plus" data-index="${index}">+</button>

                <button class="remove-btn" data-index="${index}">
                    Remove
                </button>

            </div>

        </div>

        `;
  });

  totalPrice.textContent = "$" + total;

  localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();

container.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("plus")) {
    cart[index].quantity++;
  }

  if (e.target.classList.contains("minus")) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    }
  }

  if (e.target.classList.contains("remove-btn")) {
    cart.splice(index, 1);
  }

  renderCart();
});

clearBtn.addEventListener("click", () => {
  cart = [];

  renderCart();
});
