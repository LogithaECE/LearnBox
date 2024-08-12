const CartController = require("../controllers/cartController");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, CartController.createCart);
router.get("/", auth, CartController.getCart);
router.delete("/:product_id", auth, CartController.removeCart);
module.exports = router;
