const User = require("../model/User");

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const listUsers = await User.find();
    res.status(200).json({
      msg: "Liste de tous les utilisateurs récupérée avec succès ✅",
      listUsers, // nom utilisé dans userAction.js
    });
  } catch (error) {
    res.status(400).json({
      errors: [{ msg: "Impossible de récupérer les utilisateurs ❌" }],
    });
  }
};

// Obtenir un seul utilisateur
exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToGet = await User.findById(id);
    if (!userToGet) {
      return res.status(404).json({
        errors: [{ msg: "Utilisateur non trouvé ❌" }],
      });
    }
    res.status(200).json({
      msg: "Utilisateur récupéré avec succès ✅",
      userToGet, // nom utilisé dans userAction.js
    });
  } catch (error) {
    res.status(400).json({
      errors: [{ msg: "Erreur lors de la récupération de l'utilisateur ❌" }],
    });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        errors: [{ msg: "Utilisateur à supprimer introuvable ❌" }],
      });
    }
    res.status(200).json({
      msg: "Utilisateur supprimé avec succès ✅",
      deletedUser, // on renvoie le user supprimé si tu veux l'afficher
    });
  } catch (error) {
    res.status(400).json({
      errors: [{ msg: "Erreur lors de la suppression de l'utilisateur ❌" }],
    });
  }
};
