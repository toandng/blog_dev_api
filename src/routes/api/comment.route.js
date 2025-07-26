const express = require("express");

const router = express.Router();
const commentController = require("@/controllers/comment.controller");
const checkAuth = require("@/middlewares/checkAuth");

router.get("/", commentController.index);
router.get("/posts/:postId", checkAuth, commentController.getAllCommentsInPost);

// router.post("/", topicController.create);
// router.put("/:id", topicController.update);
// router.delete("/:id", topicController.remove);

module.exports = router;
