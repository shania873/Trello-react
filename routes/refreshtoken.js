const express = require("express");

const router = express.Router();

const verifyToken = require("../controllers/verifyToken");

router.get("/refreshToken", verifyToken.refreshToken);

module.exports = router;
