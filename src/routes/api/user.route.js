const express = require("express");

const router = express.Router();
const userController = require("@/controllers/user.controller");
const checkAuth = require("@/middlewares/checkAuth");

router.get("/follow/:userId", checkAuth, userController.checkFollowing);

router.get("/:username", checkAuth, userController.getUserByUsername);
router.post("/follow/:userId", checkAuth, userController.toggleFollow);

module.exports = router;
