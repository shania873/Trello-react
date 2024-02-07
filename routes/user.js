const express = require("express");

const upload = require("../utils/medias");

const router = express.Router();

const profil = require("../controllers/profil");

router.get("/getUser", profil.findUserInformations);

router.post("/uploadMedias", upload.single("file"), profil.uploadMedias);

module.exports = router;
