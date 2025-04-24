const express = require('express');
const router = express.Router();
const  isAuth = require('../middlewares/isAuth');

const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// ROUTES
router.post('/add', isAuth, addToCart);
router.get('/', isAuth, getCart);
router.put('/updateQuantity', isAuth, updateQuantity); 
router.delete('/remove/:id', isAuth, removeFromCart);
router.delete('/clear', isAuth, clearCart);

module.exports = router;
