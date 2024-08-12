const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createCart = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = new Cart({
        user_id,
        products: {
          product_id,
          quantity,
        },
      });
    } else {
      const ProductIndex = cart.products.findIndex(
        (prod) => prod.product_id === product_id
      );
      if (ProductIndex === -1) {
        cart.products.push({ product_id, quantity });
      } else {
        cart.products[ProductIndex].quantity = quantity;
      }
    }
    cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.getCart = async (req, res) => {
  const { user_id } = req.user;
  const cart = await Cart.findOne({ user_id });
  if (!cart) {
    return res.status(404).json({ message: "Cart is empty" });
  }
  try {
    let subTotal = 0;
    const CartItems = await Promise.all(
      cart.products.map(async (product) => {
        const productDetails = await Product.findOne({
          id: product.product_id,
        });
        subTotal += productDetails.price * product.quantity;
        return {
          product_id: productDetails.id,
          title: productDetails.title,
          description: productDetails.description,
          price: productDetails.price,
          image: productDetails.image,
          quantity: product.quantity,
        };
      })
    );
    return res.status(200).json({ cartitems: CartItems, subTotal });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { user_id } = req.user;
    let cart = await Cart.findOne({ user_id });
    cart.products = cart.products.filter(
      (product) => req.params.product_id !== product.product_id
    );

    if (cart.products.length === 0) {
      await Cart.deleteOne({ user_id });
      return res.status(400).send("Cart is empty");
    }
    cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(404).send(err);
  }
};
