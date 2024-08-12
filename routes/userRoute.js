const userController = require("../controllers/userController");
const express = require("express");
const auth = require("../middlewares/auth")
const router = express.Router();

router.get("/", userController.getUser);
router.post("/", userController.addUser);
router.delete("/", auth,userController.removeUser);
router.post("/login", userController.login);

module.exports = router;
