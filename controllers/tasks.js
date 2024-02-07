const jwt = require("jsonwebtoken");

let Tasks = require("../models/tasks");

exports.setTasks = async (req, res) => {
  try {
    const { id, name, status } = req.body;
    // console.log(id, name, status, data);
    // const sql = "INSERT INTO tasks (id, name, status) VALUES ?";
    // const values = { id, name, status };

    // connection.query(sql, [values], (error, results, fields) => {
    //   if (error) {
    //     console.error("Erreur lors de l'INSERT :", error.message);
    //     throw error;
    //   }

    //   console.log("Nouveaux enregistrements insérés avec succès");
    // });

    Tasks.addProduct(id, name, status);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    // res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

exports.updateTasks = async (req, res) => {
  try {
    const { id, name, status } = req.body;
    data.forEach((item) => {
      const sql = "UPDATE tasks SET status = ? WHERE id = ?";
      const values = [status, id];

      connection.query(sql, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'UPDATE :", error.message);
          throw error;
        }

        console.log(`Tâche avec l'ID ${id} mise à jour avec succès`);
      });
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};
