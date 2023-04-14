var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const typeController = require("../controllers/type");

router.get("/", auth, typeController.getTypeList);
router.post("/", auth, typeController.createType);
router.delete("/", auth, typeController.deleteType);

module.exports = router;
