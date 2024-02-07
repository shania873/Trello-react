const express = require("express");
const multer = require("multer");
const path = require("path");
const mv = require("mv");
const fs = require("fs");
const app = express();

exports.findUserInformations = async (req, res) => {
  try {
    const token = req.headers.cookie && req.headers.cookie.split("=")[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY,
      { algorithms: ["HS256"] },
      async (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Token invalide" });
        }

        if (!err) {
          try {
            const user = await User.findByPk(decodedToken.userId);
            res.status(200).json({ message: "Token valide", user });
          } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.uploadMedias = async (req, res) => {
  try {
    const uploadedFile = req.file;

    const destinationPath = path.join(
      __dirname,
      "../medias",
      uploadedFile.filename
    );

    fs.rename(uploadedFile.path, destinationPath, (err) => {
      if (err) {
        console.error("Erreur lors du déplacement du fichier :", err);
        return res
          .status(500)
          .json({ message: "Erreur serveur lors du déplacement du fichier" });
      }

      res
        .status(200)
        .json({ message: "Fichier téléchargé et déplacé avec succès !" });
    });
  } catch (error) {
    console.error("Erreur lors de la gestion du fichier téléchargé :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la gestion du fichier téléchargé",
    });
  }
};
