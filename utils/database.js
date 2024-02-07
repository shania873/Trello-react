const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("api", "root", "Foutaise.1", {
  host: "localhost",
  dialect: "mysql",
  port: 3308,
  logging: console.log,
});

module.exports = sequelize;
