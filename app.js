const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

const productsRoutes = require("./Api/routes/products");
app.use(morgan("dev"));
app.use("/api/products", productsRoutes);
app.get("/api/about", function (req, res) {
  const msg = {
    status: 200,
    msg: "i am about API",
  };
  return res.send(msg);
});

app.get("/", function (req, res) {
  return res.send("hello");
});

app.get("/api/contact", function (req, res) {
  return res.send("I am contact Api");
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  return res.send(productId);
});

app.post("/api/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  validateData(req.body, res);
  const user = {
    id: 1,
    name,
    email,
    password,
  };
  return res.send(user);
});

// error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
// error handling
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

// validate data for user registration.
function validateData(body, res) {
  if (!body.name) {
    return res.status(400).json({ message: "please provide valid name" });
  }
  if (!body.email) {
    return res.status(400).json({ message: "please provide valid email" });
  }
  if (!body.password || body.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be 8 character long!" });
  }
}
module.exports = app;
