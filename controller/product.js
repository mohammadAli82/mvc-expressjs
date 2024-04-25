const fs = require("fs");
const mongoose = require("mongoose");

// const data = JSON.parse(fs.readFileSync("db.json", "UTF-8"));
// const products = data.products;
const model = require("../model/model");
const Product = model.Product;

module.exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body); // Create a new product instance with request body data

    // Save the product to the database
    const savedProduct = await product.save();

    res.status(201).json(savedProduct); // Respond with the saved product
  } catch (error) {
    if (error.name === "ValidationError") {
      // If the error is a Mongoose validation error, respond with 400 Bad Request and the error details
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // For other errors, respond with 500 Internal Server Error
  }
};

module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};
module.exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const products = await Product.findById(id);
  res.json(products);
};

module.exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body);
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body);
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
