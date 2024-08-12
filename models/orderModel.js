const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  DeliveryDate: {
    type: Date,
    required: true,
  },
  items: [
    {
      product_id: String,
      quantity: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
