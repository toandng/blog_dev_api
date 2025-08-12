const express = require("express");

const router = express.Router();
const postController = require("@/controllers/post.controller");
const checkAuth = require("@/middlewares/checkAuth");
const upload = require("@/middlewares/upload");

router.get("/", postController.index);
router.get("/me", checkAuth, postController.getListByMe);

router.get("/slug/:slug", postController.getBySlug);
router.get("/topic/:topicId", checkAuth, postController.getByTopicId);
router.get("/user/bookmarks", checkAuth, postController.getListByUserId);

router.get("/:postId/related", postController.getRelatedPosts);
router.get("/user/:username", checkAuth, postController.getByUserName);
router.post("/views/:id", postController.viewsCount);

router.post("/", upload.single("thumbnail"), checkAuth, postController.create);
router.post("/:postId/like", checkAuth, postController.toggleLike);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;
