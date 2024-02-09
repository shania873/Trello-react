const express = require("express");
const router = express.Router();

const tasks = require("../controllers/tasks");

router.post("/setTasks", tasks.setTasks);
router.post("/updateTasks", tasks.updateTasks);
router.get("/getTasks", tasks.getTasks);
router.delete("/deleteTask/:taskId", tasks.deleteTask);

module.exports = router;
