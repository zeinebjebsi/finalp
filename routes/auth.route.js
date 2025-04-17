const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { registerValidation, loginValidation, validation } = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth'); // assure-toi que ce fichier existe

// Route test
router.get('/test', (req, res) => {
  res.status(200).send("Auth route test successful!");
});

// Route pour le register
router.post('/register', registerValidation(), validation, register);

// Route pour le login
router.post('/login', loginValidation(), validation, login);

// Route protégée avec token
router.get('/current', isAuth, (req, res) => {
  res.json({ user: req.user });
});


module.exports = router;
