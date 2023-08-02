const mongoose = require("mongoose");
const User = require("./UserSchema");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: {
    type: Number,
    required: true,
  }, 
  added_by: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
