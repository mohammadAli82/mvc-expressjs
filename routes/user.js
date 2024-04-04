const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router
  .post("/", userController.createUser)
  .get("/", userController.getAllUser)
  .get("/:id", userController.getUser)
  .put("/:id", userController.replaceUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

exports.route = router;
