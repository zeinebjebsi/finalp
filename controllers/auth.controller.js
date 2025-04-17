const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ errors: [{ msg: "Cet email existe déjà" }] });
    }

    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      phone
    });

    await newUser.save();

    // Création du token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "8h" });

    res.status(200).json({
      success: true,
      message: "Register successfully",
      user: newUser,
      token,
    });

  } catch (error) {
    console.error("Erreur:", error);
    res.status(400).json({ errors: [{ msg: 'Fail in register' }] });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ errors: [{ msg: "Email ou mot de passe incorrect" }] });
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      return res.status(400).json({ errors: [{ msg: "Email ou mot de passe incorrect" }] });
    }

    // Création du token
    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, { expiresIn: "2h" });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: foundUser,
      token ,
    });

  } catch (error) {
    console.error("Erreur:", error);
    res.status(400).json({ errors: [{ msg: 'Fail in login' }] });
  }
};
