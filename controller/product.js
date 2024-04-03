const fs=require('fs')
const data = JSON.parse(fs.readFileSync("db.json", "UTF-8"));
const products = data.products;


module.exports.createProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
};
module.exports.getAllProducts = (req, res) => {
  res.json(products);
};
module.exports.getProduct = (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
};

module.exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
module.exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
module.exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1); // Remove 1 element starting from productIndex
    res.status(200).json(deletedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};
