const express = require("express");

const router = express.Router();
const topicController = require("@/controllers/topic.comtroller");

router.get("/", topicController.index);
router.get("/slug/:slug", topicController.getBySlug);
router.get("/id/:id", topicController.getOne);

router.post("/", topicController.create);
router.put("/:id", topicController.update);
router.delete("/:id", topicController.remove);

module.exports = router;
