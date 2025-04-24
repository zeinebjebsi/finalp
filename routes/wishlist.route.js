const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const Wishlist = require("../model/Wishlist");
const Product = require("../model/Product");

router.post("/toggle", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      const exists = wishlist.products.includes(productId);
      if (exists) {
        wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
      } else {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/", isAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
    res.status(200).json(wishlist ? wishlist.products : []);
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
