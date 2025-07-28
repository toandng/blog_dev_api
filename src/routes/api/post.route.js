const express = require("express");

const router = express.Router();
const postController = require("@/controllers/post.controller");
const checkAuth = require("@/middlewares/checkAuth");
const upload = require("@/middlewares/upload");

router.get("/", postController.index);
router.get("/slug/:slug", postController.getBySlug);
router.get("/:postId/related", postController.getRelatedPosts);
router.get("/user/:username", checkAuth, postController.getByUserName);

router.post("/", upload.single("thumbnail"), postController.create);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;
