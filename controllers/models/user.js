const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Medias = require("./medias");

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  roles: {
    type: DataTypes.JSON,
    defaultValue: ["ROLE_USER"],
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 255],
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 255],
    },
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  activation_token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_activate: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
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

User.belongsTo(Medias, { foreignKey: "mediasId" });
module.exports = User;
