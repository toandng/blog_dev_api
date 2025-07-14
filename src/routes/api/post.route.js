const express = require("express");

const router = express.Router();
const postController = require("@/controllers/post.controller");

router.get("/", postController.index);
router.get("/:slug", postController.getBySlug);

router.post("/", postController.create);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;
