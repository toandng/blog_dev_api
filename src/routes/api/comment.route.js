const express = require("express");

const router = express.Router();
const commentController = require("@/controllers/comment.controller");
const checkAuth = require("@/middlewares/checkAuth");

router.get("/", commentController.index);
router.get("/slug/:slug", commentController.getBySlug);
router.get("/id/:id", commentController.getOne);
router.get("/post/:postId", checkAuth, commentController.getAllCommentsInPost);

router.post("/", checkAuth, commentController.create);
router.post("/:commentId/like", checkAuth, commentController.toggleLike);
// router.post(
//   "/:commentId/like",
//   checkAuth,
//   (req, res, next) => {
//     console.log("Params:", req.params); // ← Xem có commentId không
//     next();
//   },
//   commentController.toggleLike
// );

router.delete("/:id", commentController.remove);
router.put("/:id", checkAuth, commentController.update);

module.exports = router;
