const express = require("express");

const authRouter = require("./auth.route");
const userRouter = require("./user.route");

const postRouter = require("./post.route");
const topicRouter = require("./topic.route");
const commentRouter = require("./comment.route");

const router = express.Router();

// auth
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/profile", userRouter);
router.use("/topics", topicRouter);
router.use("/comments", commentRouter);
router.use("/users", userRouter);

module.exports = router;
