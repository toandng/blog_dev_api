const express = require("express");

const router = express.Router();
const bookmarkController = require("@/controllers/bookmark.controller");
const checkAuth = require("@/middlewares/checkAuth");

router.post("/:postId", checkAuth, bookmarkController.create);
router.delete("/all", checkAuth, bookmarkController.remove);

module.exports = router;
