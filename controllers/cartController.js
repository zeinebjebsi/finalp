const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ✅ Ajouter un produit au panier
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Obtenir le panier de l'utilisateur
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.status(404).json({ msg: "Panier vide" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Modifier les quantités
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ msg: "Panier introuvable" });

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) return res.status(404).json({ msg: "Produit non trouvé" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Supprimer un produit
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { product: id } } },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Vider le panier
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [] } }
    );
    res.status(200).json({ msg: "Panier vidé" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
