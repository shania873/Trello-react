const express = require("express");
require("dotenv").config();

const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

const verifyToken = require("./routes/refreshtoken");

const secretKey = process.env.SECRET_KEY;

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 204,
    credentials: true,
  },
});

const routesLogin = require("./routes/login");
const routeUser = require("./routes/user");
const sequelize = require("./utils/database");

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(cookieParser(secretKey));

app.use(bodyParser.json());

app.use("/admin", routesLogin);
app.use("/refresh", verifyToken);
app.use("/api", routeUser);

const port = 3000;

server.listen(port, () => {
  console.log("Server run", port);
});

sequelize
  .sync()
  .then(() => {
    console.log("Base de données synchronisée avec succès.");
    io.on("connection", (socket) => {
      console.log("connected");
    });
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données:",
      error
    );
  });
