const users = require("./users");
const products = require("./products");
const express = require("express");

const app = express();
const PORT = 3000;

// public klasörünü herkes erişebilsin
app.use(express.static("public"));

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  const exists = users.find((user) => user.email === email);

  if (exists) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
  });

  res.json({
    message: "Account created successfully",
  });
});
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
app.use(express.json());