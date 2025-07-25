const express = require("express");

const router = express.Router();
const userController = require("@/controllers/user.controller");

router.get("/:username", userController.getUserByUsername);

module.exports = router;
