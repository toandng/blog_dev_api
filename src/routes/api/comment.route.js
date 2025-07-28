const express = require("express");

const router = express.Router();
const commentController = require("@/controllers/comment.controller");
const checkAuth = require("@/middlewares/checkAuth");

router.get("/", commentController.index);
router.get("/post/:postId", commentController.getAllCommentsInPost);

router.post("/", checkAuth, commentController.create);
router.post("/:commentId/like", checkAuth, commentController.toggleLike);

router.put("/:id", commentController.update);
router.delete("/:id", commentController.remove);

module.exports = router;
