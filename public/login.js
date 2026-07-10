"use strict";

const form = document.querySelector(".auth-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#login-email").value.trim();
  const password = document.querySelector("#login-password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(data.user));

    alert(data.message);

    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Server error.");
  }
});