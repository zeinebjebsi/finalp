// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Un seul panier par utilisateur
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
