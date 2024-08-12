const mongoose = require("mongoose");
const favSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product_id: String,
    },
  ],
});
const Fav = mongoose.model("Fav", favSchema);
module.exports = Fav;
