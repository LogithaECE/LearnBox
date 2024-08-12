const OrderController = require("../controllers/orderController");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, OrderController.placeOrder);
router.get("/", auth, OrderController.getOrders);

module.exports = router;
