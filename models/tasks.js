const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Tasks = sequelize.define("tasks", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.JSON,
    defaultValue: ["ROLE_USER"],
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
});

Tasks.addTasks = async function (id, name, status) {
  try {
    const newTask = await Tasks.create({
      id,
      name,
      status,
    });
    return newTask;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    throw error;
  }
};

Tasks.updateTasks = async function (taskId, updatedData) {
  try {
    const [updatedRowsCount, updatedRows] = await Tasks.update(updatedData, {
      where: { id: taskId },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      throw new Error("La tâche avec l'ID spécifié n'a pas été trouvée.");
    }

    return updatedRows[0];
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    throw error;
  }
};

Tasks.getTasks = async function () {
  try {
    const tasks = await Tasks.findAll();
    return tasks;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    throw error;
  }
};

module.exports = Tasks;
