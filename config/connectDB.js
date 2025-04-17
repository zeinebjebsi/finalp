const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //adresse du cluster en mongoDB atlas
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected");
  } catch (error) {
    console.log("❌ Erreur dans la connexion à la base de données");
    console.error(error.message);
    process.exit(1)
  }
};

module.exports = connectDB;
