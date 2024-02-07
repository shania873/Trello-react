const express = require("express");
const router = express.Router();

const tasks = require("../controllers/tasks");

router.post("/setTasks", tasks.setTasks);

module.exports = router;
