var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const tagController = require("../controllers/tag");

router.get("/", auth, tagController.getTagList);
router.post("/", auth, tagController.createTag);
router.delete("/", auth, tagController.deleteTag);

module.exports = router;
