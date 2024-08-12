const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");
const favRoutes = require("./routes/favRoute");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://logithaluckshmi:Hari2019.@cluster0.v4v6h1p.mongodb.net/LearnBox").then(() => {
  console.log("Connected to db");
});

app.use(express.json());
app.use(cors());
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/favourites", favRoutes);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
