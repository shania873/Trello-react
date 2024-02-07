const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Medias = require("./medias");

const Works = sequelize.define(
  "works",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Works",
  }
);

console.log(Medias);
// Works.hasMany(Medias, { foreignKey: "worksId", as: "medias" });

module.exports = Works;
