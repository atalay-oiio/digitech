"use strict";
const summaryProducts = document.querySelector(".summary-products");
const summaryTotal = document.querySelector(".summary-total");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
cart.forEach((product) => {
  total += product.price * product.quantity;
  summaryProducts.innerHTML += `
    <div class="summary-item">
        <h4>${product.title} × ${product.quantity}</h4>
        <p>$${product.price * product.quantity}</p>
    </div>
  `;
});
summaryTotal.innerHTML = `
<span>Total</span>
<span>$${total}</span>
`;
const placeOrderBtn = document.querySelector(".place-order");
const billingForm = document.querySelector(".billing-form");
placeOrderBtn.addEventListener("click", () => {
  if (!billingForm.checkValidity()) {
    billingForm.reportValidity();
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert(
    "✅ Order placed successfully!\n\nThank you for shopping with DigiTech.",
  );
  localStorage.removeItem("cart");
  cartCount.textContent = 0;
  window.location.href = "index.html";
});
("use strict");

const form = document.querySelector(".checkout-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const address = document.querySelector("#address").value.trim();
  const card = document.querySelector("#card").value.trim();

  if (!name || !email || !address || !card) {
    alert("Please fill in all fields.");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email.");
    return;
  }

  if (card.length < 16) {
    alert("Card number must contain at least 16 digits.");
    return;
  }

  alert("✅ Payment Successful!");

  localStorage.removeItem("cart");

  window.location.href = "index.html";
});
