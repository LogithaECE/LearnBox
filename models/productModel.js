const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});
const Product = new mongoose.model("Product",productSchema)
module.exports = Product;