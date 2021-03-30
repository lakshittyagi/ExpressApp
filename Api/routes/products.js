const express = require("express");
const router = express.Router();
const productList = [
  { id: 1, name: "Nike shoe" },
  { id: 2, name: "Addidas shoe" },
  { id: 3, name: "Campus shoe" },
  { id: 4, name: "Roadster shoe" },
];
router.get("/", function (req, res) {
  return res.status(200).json(productList);
});

router.get("/:id", function (req, res) {
  const product = productList.find((product) => product.id == req.params.id);
  return res.status(200).json(product);
});

router.put("/:id", (req, res) => {
  const product = productList.find((product) => product.id == req.params.id);
  product.name = req.body.name;
  return res.status(202).json(product);
});

router.delete("/:id", (req, res) => {
  const product = productList.find((product) => product.id == req.params.id);
  productList.splice(product, 1);
  return res.json(productList);
});

module.exports = router;
