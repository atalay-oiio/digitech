"use strict";
const form = document.querySelector(".auth-form");

form.addEventListener("submit", async (e) => {
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

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);

    window.location.href = "login.html";
  } catch (erro) {
    console.error(err);
    alert("Server error.");
  }
});