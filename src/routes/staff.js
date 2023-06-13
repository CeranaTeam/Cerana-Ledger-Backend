var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const staffController = require("../controllers/staff");

router.get("/", auth, staffController.getStaffList);
router.post("/", auth, staffController.createStaff);
router.put("/", auth, staffController.updateStaff);
router.delete("/:staffId", auth, staffController.deleteStaff);

module.exports = router;
