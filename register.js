"use strict";

const form = document.querySelector(".auth-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#register-name").value.trim();
  const email = document.querySelector("#register-email").value.trim();
  const password = document.querySelector("#register-password").value;
  const confirm = document.querySelector("#register-confirm").value;

  if (!name || !email || !password || !confirm) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  const user = {
    name,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("✅ Account created successfully!");

  window.location.href = "login.html";
});
