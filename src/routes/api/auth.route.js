const express = require("express");
const router = express.Router();
const authController = require("@/controllers/auth.controller");
const checkAuth = require("@/middlewares/checkAuth");

router.get("/me", checkAuth, authController.me);

router.post("/register", authController.register);
router.post("/refresh", authController.refreshToken);

router.post("/login", authController.login);
router.post("/forgot-password", authController.forGotPassWord);
router.post("/reset-password", checkAuth, authController.resetPassword);
router.post("/verify-email", authController.verifyEmail);
router.get("/verify-token", authController.verifyToken);

module.exports = router;
