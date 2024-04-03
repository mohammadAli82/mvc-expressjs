const fs = require("fs");
// const index = fs.readFileSync("index.html", "UTF-8");
const data = JSON.parse(fs.readFileSync("db.json", "UTF-8"));
const products = data.products;

const express = require("express");
const server = express();
const morgan = require("morgan");

//body Parse
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));

const createProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
};
const getAllProducts = (req, res) => {
  res.json(products);
};
const getProduct = (req, res) => {
  const id = +req.params.id;
  const product = products.find(p => p.id === id);
  res.json(product);
};

const replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
const updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
const deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1); // Remove 1 element starting from productIndex
    res.status(200).json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
};

server.post("/product", createProduct);
server.get("/products", getAllProducts);
server.get("/product/:id", getProduct);
server.put("/product/:id", replaceProduct);
server.patch("/product/:id", updateProduct);
server.delete("/product/:id", deleteProduct);

server.listen(3900, () => console.log("server run"));
