const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

exports.placeOrder = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { name, phoneNumber, address } = req.body;
    let user = await User.findOne({ _id: user_id });
    let cart = await Cart.findOne({ user_id });
    const { email } = user;
    const orderDate = new Date();
    const DeliveryDate = new Date(
      orderDate.getTime() + 10 * 24 * 60 * 60 * 1000
    );
    const items = cart.products;

    const order = new Order({
      user_id,
      name,
      email,
      address,
      phoneNumber,
      orderDate,
      DeliveryDate,
      items,
    });
    await order.save();
    await Cart.deleteOne({ user_id });
    return res
      .status(201)
      .json({ message: "Order placed successfully", order });
  } catch (err) {
    return res.status(404).json({ message: "Error placing order" });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const { user_id } = req.user;
    const order = await Order.find({ user_id });
    if (!order) {
      return res.status(404).json({ message: "No orders yet!" });
    }
    return res.status(200).json({ orders: order });
  } catch (err) {
    return res.status(404).send(err);
  }
};
