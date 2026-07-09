"use strict";

const form = document.querySelector(".auth-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.querySelector("#login-email").value.trim();
  const password = document.querySelector("#login-password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No account found. Please create an account first.");
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("loggedIn", "true");

    alert("✅ Login successful!");

    window.location.href = "index.html";
  } else {
    alert("Incorrect email or password.");
  }
});
