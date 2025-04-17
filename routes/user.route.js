const express = require('express');
const {
  getAllUsers,
  deleteUser,
  getOneUser
} = require('../controllers/user.controller');

// ✅ On importe les middlewares
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// ✅ Route test
router.get('/test', (req, res) => {
  res.status(200).json({ msg: "Test OK ✅" });
});

// ✅ Routes sécurisées : d'abord isAuth (vérifie le token), puis isAdmin (vérifie le rôle)
router.get('/allUsers', isAuth, isAdmin, getAllUsers);
router.get('/:id', isAuth, isAdmin, getOneUser);
router.delete('/:id', isAuth, isAdmin, deleteUser);

module.exports = router;
