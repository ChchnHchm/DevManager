// models/document.js
const mongoose = require("mongoose");

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
    enum: [
      "en cours",
      "terminé",
      "en attente de chiffrage",
      "annulé",
      "À faire",
    ],
    required: true,
  },
  client: {
    type: String,
    required: false, // Optionnel
  },
  date: {
    type: Date,
    default: Date.now, // Par défaut : la date actuelle
  },
  commentaire: {
    type: String,
    required: false,
  },
  modifications: {
    type: [String],
    required: false,
  },
  bobTable: [
    {
      ecran: { type: String, required: true },
      type: { type: String, required: true },
      nouveau: { type: Boolean, required: true },
    },
  ],
});
// Créer un modèle basé sur le schéma
const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
