const jwt = require("jsonwebtoken");

let Tasks = require("../models/tasks");

exports.setTasks = async (req, res) => {
  try {
    const { id, name, status } = req.body;

    const newTask = await Tasks.addTasks(id, name, status);
    console.log("Tâche ajoutée avec succès :", newTask);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
  }
};

exports.updateTasks = async (req, res) => {
  try {
    const { id, name, status } = req.body;
    const taskId = id;
    const updatedData = {
      name: name,
      status: status,
    };

    const tacheModifiee = await Tasks.updateTasks(taskId, updatedData);
    console.log("Tâche mise à jour avec succès :", tacheModifiee);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const allTasks = await Tasks.getTasks();
    console.log("Toutes les tâches :", allTasks);
    res.status(200).json(allTasks);
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};