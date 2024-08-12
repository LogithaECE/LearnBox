const Fav = require("../models/favModel");
const Product = require("../models/productModel");

exports.createFav = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { product_id } = req.body;
    let fav = await Fav.findOne({ user_id });
    if (!fav) {
      fav = new Fav({
        user_id,
        products: {
          product_id,
        },
      });
    } else {
      const ProductIndex = fav.products.findIndex(
        (prod) => prod.product_id === product_id
      );
      if (ProductIndex === -1) {
        fav.products.push({ product_id });
      }
    }
    fav.save();
    return res
      .status(200)
      .json({ message: "Product added to favourites", fav });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.getFav = async (req, res) => {
  const { user_id } = req.user;
  const fav = await Fav.findOne({ user_id });
  if (!fav) {
    return res.status(404).json({ message: "Favourites is empty" });
  }
  try {
    const FavItems = await Promise.all(
      fav.products.map(async (product) => {
        const productDetails = await Product.findOne({
          id: product.product_id,
        });
        return {
          product_id: productDetails.id,
          title: productDetails.title,
          description: productDetails.description,
          price: productDetails.price,
          image: productDetails.image,
        };
      })
    );
    return res.status(200).json({ favitems: FavItems });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

exports.removeFav = async (req, res) => {
  try {
    const { user_id } = req.user;
    let fav = await Fav.findOne({ user_id });
    fav.products = fav.products.filter(
      (product) => req.params.product_id !== product.product_id
    );

    if (fav.products.length === 0) {
      await Fav.deleteOne({ user_id });
      return res.status(400).send("Fav is empty");
    }
    fav.save();
    return res.status(200).json(fav);
  } catch (err) {
    return res.status(404).send(err);
  }
};
