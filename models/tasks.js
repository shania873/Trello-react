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
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Tasks;
