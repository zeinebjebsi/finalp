const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Vérifie que le token existe et commence par "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ errors: [{ msg: "Token manquant ou mal formé" }] });
    }

    // Récupère uniquement le token (après "Bearer ")
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findById(decoded.id);

    if (!foundUser) {
      return res.status(404).json({ errors: [{ msg: "Utilisateur non trouvé" }] });
    }

    if (!foundUser.isAdmin) {
      return res.status(403).json({ errors: [{ msg: "Accès interdit : admin uniquement" }] });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    res.status(401).json({ errors: [{ msg: "Token invalide ou expiré" }] });
  }
};

module.exports = isAdmin;
