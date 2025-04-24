// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const  isAuth  = require('../middlewares/isAuth');

router.post('/', isAuth, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      items: req.body.items, // tableau [{ product, quantity }]
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/order/all
router.get('/all', isAuth, isAdmin, async (req, res) => {
    try {
      const orders = await Order.find().populate('user').populate('items.product');
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  // PUT /api/order/validate/:id
router.put('/validate/:id', isAuth, isAdmin, async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      order.isValidated = true;
      await order.save();
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  