const Product = require("../models/productModel");
const { v4: uuidv4 } = require("uuid");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    console.log(err);
  }
};

exports.addProducts = async (req, res) => {
  try {
    const { title, description, price, category, rating, image } = req.body;
    const newProduct = new Product({
      id: uuidv4(),
      title,
      description,
      price,
      category,
      rating,
      image,
    });
    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    console.log(err);
  }
};
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: id });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
