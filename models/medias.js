const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Works = require("./works");

const Medias = sequelize.define(
  "medias",
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
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Medias",
  }
);

// Relation Many-to-One avec la classe Works
Medias.belongsTo(Works, { foreignKey: "worksId", as: "works" });

module.exports = Medias;
