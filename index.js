const fs = require("fs");
// const index = fs.readFileSync("index.html", "UTF-8");
const express = require("express");
const server = express();
const morgan = require("morgan");
const producttController=require('./controller/product')
//body Parse
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));



server.post("/product",producttController.createProduct);
server.get("/products", producttController.getAllProducts);
server.get("/product/:id", producttController.getProduct);
server.put("/product/:id", producttController.replaceProduct);
server.patch("/product/:id", producttController.updateProduct);
server.delete("/product/:id", producttController.deleteProduct);

server.listen(3900, () => console.log("server run"));
