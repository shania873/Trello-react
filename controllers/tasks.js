const jwt = require("jsonwebtoken");

let Tasks = require("../models/tasks");

exports.setTasks = async (req, res) => {
  try {
    const { id, name, status } = req.body;

    const newTask = await Tasks.addTasks(id, name, status);
    console.log("tache ajouté", newTask);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la tâche" });
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

    const tacheUpdated = await Tasks.updateTasks(taskId, updatedData);
    console.log("tache updatée", tacheUpdated);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const allTasks = await Tasks.getTasks();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

exports.deleteTask = async (req, res) => {
  const taskIdToDelete = req.params.taskId;

  try {
    const deletedTask = await Tasks.deleteTaskById(taskIdToDelete);

    if (deletedTask === 1) {
      const allTasks = await Tasks.getTasks();
      res.status(200).json({ list: allTasks });
    } else {
      res.status(404).json({ message: "Tâche non trouvée." });
    }
  } catch (error) {
    res.status(500).json({
      message: `Erreur lors de la suppression de la tâche : ${error.message}`,
    });
  }
};
