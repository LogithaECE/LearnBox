const FavController = require("../controllers/favController");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, FavController.createFav);
router.get("/", auth, FavController.getFav);
router.delete("/:product_id", auth, FavController.removeFav);
module.exports = router;
