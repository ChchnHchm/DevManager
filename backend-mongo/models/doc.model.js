// models/document.js
const mongoose = require("mongoose");

// Définir le schéma pour les documents
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dev: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["terminé", "en cours", "annulé"], // Valeurs autorisées
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Créer un modèle basé sur le schéma
const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
