// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const DocRoutes = require("./routes/doc.routes");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cors({ origin: "http://localhost:45611" })); // Remplacez par l'URL du client Angular
// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));

// Routes
app.use("/api/docs", DocRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
