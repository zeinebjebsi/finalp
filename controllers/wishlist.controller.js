const Wishlist = require('../model/Wishlist');

exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      const exists = wishlist.products.includes(productId);
      if (exists) {
        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
      } else {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.status(200).json({ msg: 'Wishlist mise à jour', wishlist });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
    res.status(200).json(wishlist ? wishlist.products : []);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};
