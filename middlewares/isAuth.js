const jwt = require('jsonwebtoken');
const User = require('../model/User');

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ errors: [{ msg: "Pas de token ou format invalide" }] });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findById(decoded.id);
    if (!foundUser) {
      return res.status(404).json({ errors: [{ msg: "Utilisateur non trouvé" }] });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    console.error("Erreur isAuth:", error.message);
    res.status(401).json({ errors: [{ msg: "Token invalide ou expiré" }] });
  }
};

module.exports = isAuth;
