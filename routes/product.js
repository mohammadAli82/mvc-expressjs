const express = require("express");
const router = express.Router();
const producttController = require("../controller/product");

router
  .post("/", producttController.createProduct)
  .get("/", producttController.getAllProducts)
  .get("/:id", producttController.getProduct)
  .put("/:id", producttController.replaceProduct)
  .patch("/:id", producttController.updateProduct)
  .delete("/:id", producttController.deleteProduct);

exports.route = router;
