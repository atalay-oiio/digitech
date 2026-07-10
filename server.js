const express = require("express");
const products = require("./products");

const app = express();
const PORT = 3000;

const users = [];

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// PRODUCTS
app.get("/api/products", (req, res) => {
  res.json(products);
});

// REGISTER
app.post("/api/register", (req, res) => {
  console.log("REGISTER HIT");
  console.log(req.body);

  res.json({
    message: "Register works",
  });
});
  
 
// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return res.status(401).json({
      message: "Incorrect email or password.",
    });
  }

  res.json({
    message: "Login successful.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
