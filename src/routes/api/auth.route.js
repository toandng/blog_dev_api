const express = require("express");

const router = express.Router();
const authController = require("@/controllers/auth.controller");

router.post("/register", authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authController.forGotPassWord);

router.post("/login", authController.login);

module.exports = router;
