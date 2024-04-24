require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
// const index = fs.readFileSync("index.html", "UTF-8");
const express = require("express");
const server = express();
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

//mongoose connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce"); // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("database connected");
}

//body Parse
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));
server.use("/products", productRouter.route);
server.use("/users", userRouter.route);

server.listen(process.env.PORT, () => console.log("server run"));
