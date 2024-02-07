const express = require("express");
require("dotenv").config();

const http = require("http");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const routesTasks = require("./routes/tasks");

const sequelize = require("./utils/database");

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.use(bodyParser.json());
app.use("/", routesTasks);

const port = 3000;

server.listen(port, () => {
  console.log("Server run", port);
});

sequelize
  .sync()
  .then(() => {
    console.log("Base de données synchronisée avec succès.");
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données:",
      error
    );
  });
