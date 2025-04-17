// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/connectDB');

// Initialisation
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use("/api/auth", require('./routes/auth.route'));
app.use("/api/user", require('./routes/user.route'));
//route pour manipuler les produits 
app.use("/api/product",require('./routes/product.route'));

// Lancement du serveur
const PORT = process.env.PORT || 7500;
app.listen(PORT, (err) => {
    err
        ? console.error(err)
        : console.log(`✅ Serveur démarré sur : http://localhost:${PORT}`);
});
