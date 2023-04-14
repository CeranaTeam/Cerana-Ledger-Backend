var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const userController = require("../controllers/user");

router.get("/profile", auth, userController.getUserProfile);
router.post("/profile", auth, userController.createUserProfile);
router.put("/profile", auth, userController.updateUserProfile);

module.exports = router;
