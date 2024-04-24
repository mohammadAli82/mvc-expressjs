const mongoose = require("mongoose");
const { Schema } = mongoose;
//schema
const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, min: [0, "wrong price"], max: [50, "wrong price"] },
  discountPercentage: Number,
  rating: { type: Number, min: [0, "wrong rating"], max: [5, "wrong rating"] },
  category: { type: String },
  thumbnail: { type: String },
  images: [String],
});
exports.Product = mongoose.model("Product", productSchema);
