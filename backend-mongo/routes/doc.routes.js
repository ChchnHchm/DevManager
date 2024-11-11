// routes/doc.routes.js
const express = require("express");
const router = express.Router();
const Document = require("../models/doc.model");

// GET : Récupérer tous les documents
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST : Créer un nouveau document
router.post("/", async (req, res) => {
  const { title, dev, status, client } = req.body; // Extraire les données envoyées dans le body

  // Validation des champs (si nécessaire, mais déjà géré par le schéma Mongoose)
  if (!title || !dev || !status || !client) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  // Création d'un nouveau document avec les données reçues
  const newDocument = new Document({
    title,
    dev,
    status,
    client,
  });

  try {
    // Sauvegarder le document dans la base de données
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument); // Réponse avec le document enregistré
  } catch (error) {
    // Si erreur, renvoyer un message d'erreur
    res.status(400).json({ message: error.message });
  }
});

// GET : Récupérer un document par ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (doc == null) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT : Mettre à jour un document
router.put("/:id", async (req, res) => {
  try {
    const { title, dev, status, client } = req.body;

    // Rechercher et mettre à jour le document
    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id, // ID du document
      { title, dev, status, client }, // Champs à mettre à jour
      { new: true, runValidators: true } // "new" pour retourner le document mis à jour, "runValidators" pour valider les champs
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Si la mise à jour est réussie, renvoyer le document mis à jour
    res.status(200).json(updatedDoc);
  } catch (error) {
    // Gestion des erreurs
    res.status(400).json({ message: error.message });
  }
});

// DELETE : Supprimer un document
router.delete("/:id", async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
