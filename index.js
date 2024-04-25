require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const server = express();
const cors = require('cors');
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const path = require('path');

// Mongoose connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("Database connected");
}

// Body Parse
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// CORS
server.use(cors());

// Logging
server.use(morgan("default"));

// Serve static files (React build)
server.use(express.static(path.resolve(__dirname, 'build')));

// Routes
server.use("/products", productRouter.route);
server.use("/users", userRouter.route);

// Handle other routes by serving index.html
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Start server agr env file se prt nhi ara hai to 8080 pr chalana
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
