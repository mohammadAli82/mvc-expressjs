require('dotenv').config()
const fs = require("fs");
// const index = fs.readFileSync("index.html", "UTF-8");
const express = require("express");
const server = express();
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
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
