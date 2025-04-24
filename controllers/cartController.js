const Cart = require("../model/Cart");
const Product = require("../model/Product");

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
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Panier introuvable' });
    }

    const cartItems = cart.items.map((item) => ({
      _id: item.product._id,
      titre: item.product.title,
      image: item.product.image,
      price: item.product.price,
      quantite: item.product.quantite, // ⚠️ ici c’est bien 'quantite'
      quantity: item.quantity,
      productId: item.product._id,
    }));

    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Modifier les quantités
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    const cartItems = populatedCart.items.map((item) => ({
      _id: item.product._id,
      titre: item.product.title,
      image: item.product.image,
      price: item.product.price,
      quantite: item.product.quantite,
      quantity: item.quantity,
      productId: item.product._id,
    }));

    res.json(cartItems);
  } catch (err) {
    console.error('Erreur updateQuantity:', err);
    res.status(500).json({ message: 'Erreur serveur' });
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
