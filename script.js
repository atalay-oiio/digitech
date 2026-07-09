"use strict";
const modal = document.querySelector(".modal");
const modalBuy = document.querySelector(".modal-buy");

let selectedProduct = null;
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-title");
const modalRating = document.querySelector(".modal-rating");
const modalPrice = document.querySelector(".modal-price");
const modalDescription = document.querySelector(".modal-description");
const closeModal = document.querySelector(".close-modal");
const products = [
  {
    id: 1,
    title: "iPhone 16",
    price: 2100,
    rating: 3.9,
    image: "image/iphone16.jpg",
    stock: true,
    badge: "",
    description:
      "The iPhone 16 features a powerful processor, premium design, and an advanced camera system for everyday performance.",
  },

  {
    id: 2,
    title: "iPhone 18 Pro Max",
    price: 2399,
    rating: 4.9,
    image: "image/iphone.jpg",
    stock: true,
    badge: "NEW",
    description: "Apple's latest flagship smartphone.",
  },

  {
    id: 3,
    title: "POCO X7 PRO",
    price: 1120,
    rating: 4.9,
    image: "image/pocox7.jpg",
    stock: true,
    badge: "NEW",
    description: "Powerful gaming phone with a large battery.",
  },

  {
    id: 4,
    title: "Galaxy S25 Ultra",
    price: 2000,
    rating: 4.6,
    image: "image/s25ultra.jpg",
    stock: true,
    badge: "HOT",
    description: "Samsung's premium flagship with AI features.",
  },

  {
    id: 5,
    title: "POCO X8 PRO MAX",
    price: 3100,
    rating: 5.0,
    image: "image/pocox8.jpg",
    stock: true,
    badge: "NEW",
    description: "The best gaming phone with a large battery.",
  },

  {
    id: 6,
    title: "Z FLIP 7",
    price: 3400,
    rating: 4.9,
    image: "image/zflip7.jpg",
    stock: true,
    badge: "HOT",
    description: "Samsung's foldable smartphone with a compact premium design.",
  },
];
const productsContainer = document.querySelector(".products");

function displayProducts(productList = products) {
  productsContainer.innerHTML = "";

  productList.forEach((product) => {
    productsContainer.innerHTML += `
      <article class="product-card">

        <span class="badge">${product.badge}</span>

        <button class="favorite-btn">♡</button>

        <img src="${product.image}" alt="${product.title}">

        <h3>${product.title}</h3>

        <div class="rating">
          ★★★★★
          <span>(${product.rating})</span>
        </div>

        <p class="price">$${product.price}</p>

        <p class="stock">
          ${product.stock ? "✔ In Stock" : "❌ Out of Stock"}
        </p>

        <button class="add-cart">
          BUY
        </button>

      </article>
    `;
  });
}
displayProducts();

const searchInput = document.querySelector("#search");
const cartCount = document.querySelector(".cart-count");
const themeBtn = document.querySelector(".theme-btn");
const userInfo = document.querySelector(".user-info");
const logoutBtn = document.querySelector(".logout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCount.textContent = cart.length;

// FAVORITE
productsContainer.addEventListener("click", (e) => {
  // FAVORITE
  // PRODUCT MODAL

  const card = e.target.closest(".product-card");

  if (card && (e.target.tagName === "IMG" || e.target.tagName === "H3")) {
    const title = card.querySelector("h3").textContent;

    const product = products.find((item) => item.title === title);

    selectedProduct = product;

    modalImage.src = product.image;
    modalTitle.textContent = product.title;
    modalRating.textContent = `⭐ ${product.rating}`;
    modalPrice.textContent = `$${product.price}`;
    modalDescription.textContent = product.description;

    modal.classList.add("show");
  }
  if (e.target.classList.contains("favorite-btn")) {
    const button = e.target;
    const active = button.classList.toggle("active");
    button.textContent = active ? "♥" : "♡";
    button.style.color = active ? "#ef4444" : "";
  }

  // BUY

  if (e.target.classList.contains("add-cart")) {
    const button = e.target;

    const card = button.closest(".product-card");

    const product = {
      image: card.querySelector("img").src,

      title: card.querySelector("h3").textContent,

      price: Number(
        card
          .querySelector(".price")
          .textContent.replace("$", "")
          .replace(",", ""),
      ),

      quantity: 1,
    };

    const existing = cart.find((item) => item.title === product.title);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    cartCount.textContent = cart.length;

    button.textContent = "Added ✓";

    button.disabled = true;

    setTimeout(() => {
      button.textContent = "BUY";

      button.disabled = false;
    }, 1200);
  }
});
// ADD TO CART

// SEARCH PRODUCTS
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(value),
  );

  displayProducts(filteredProducts);
});
// DARK MODE
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
modalBuy.addEventListener("click", () => {
  if (!selectedProduct) return;

  const product = {
    image: selectedProduct.image,
    title: selectedProduct.title,
    price: selectedProduct.price,
    quantity: 1,
  };

  const existing = cart.find((item) => item.title === product.title);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  cartCount.textContent = cart.length;

  modal.classList.remove("show");

  alert("✅ Product added to cart!");
});
const user = JSON.parse(localStorage.getItem("user"));
const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn === "true" && user) {
  userInfo.textContent = `👤 ${user.name}`;
  logoutBtn.style.display = "inline-block";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");

  alert("Logged out successfully.");

  location.reload();
});
