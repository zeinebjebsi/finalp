const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    quantite: Number,
    image: {
      type: String,
      default: "https://media.istockphoto.com/id/653003428/fr/photo/v%C3%AAtements-%C3%A0-la-mode-dans-un-magasin-de-boutique-%C3%A0-londres.jpg?s=612x612&w=0&k=20&c=jK0DIG-S2E62SsuPmBC8k65KbQjBImmxx-veaondM7E=",
    },
    price: Number,
    categories: [{
      type: String,
      required: true,
    }],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
