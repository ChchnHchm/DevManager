// routes/doc.routes.js
const express = require("express");
const router = express.Router();
const Document = require("../models/doc.model");

router.get("/list", async (req, res) => {
  const {
    sortBy,
    sortOrder,
    status,
    dev,
    date,
    title,
    page = 1,
    pageSize = 15,
  } = req.query;
  let sortOptions = {};

  if (isNaN(page) || page < 1) {
    return res
      .status(400)
      .json({ message: "La page doit être un nombre positif." });
  }

  if (isNaN(pageSize) || pageSize < 1) {
    return res
      .status(400)
      .json({ message: "La taille de page doit être un nombre positif." });
  }

  if (sortBy) {
    // Vérifier l'ordre du tri : ascendant (1) ou descendant (-1)
    const order = sortOrder === "desc" ? -1 : 1;
    sortOptions[sortBy] = order; // Exemple : { status: 1 } ou { date: -1 }
  } else {
    // Si aucun champ de tri n'est spécifié, trier par défaut par la date (descendant)
    sortOptions = { status: -1 };
  }

  // Création de l'objet de filtre
  let filter = {};

  if (status) {
    filter.status = { $regex: status, $options: "i" }; // insensible à la casse
  }
  if (dev) {
    filter.dev = { $regex: dev, $options: "i" }; // Recherche insensible à la casse et partielle
  }
  if (date) {
    filter.date = { $eq: new Date(date) }; // Assurez-vous que la date est dans un format valide
  }
  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  try {
    const skip = (page - 1) * pageSize; // Sauter les documents des pages précédentes
    const limit = parseInt(pageSize); // Nombre de documents par page

    const total = await Document.countDocuments(filter); // Nombre total de documents

    // Projection pour récupérer uniquement les champs requis
    const docs = await Document.find(filter, "_id status date dev title")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ docs, total });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des documents", error });
  }
});

// GET : Récupérer tous les documents
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// POST : Créer un nouveau document
router.post("/", async (req, res) => {
  const { title, dev, status, client, commentaire, modifications, bobTable } =
    req.body;

  // Validation des champs obligatoires
  if (!title || !dev || !status) {
    return res.status(400).json({
      message: "Les champs Titre, développeur et status sont requis.",
    });
  }

  // Création d'un nouveau document avec les données reçues
  const newDocument = new Document({
    title,
    dev,
    status,
    client: client || "", // Optionnel, valeur par défaut : chaîne vide
    commentaire: commentaire || "", // Optionnel
    modifications: modifications || [], // Optionnel
    bobTable: bobTable || [], // Optionnel, valeur par défaut : tableau vide
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
