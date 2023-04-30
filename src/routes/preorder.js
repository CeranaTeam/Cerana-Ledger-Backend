var express = require("express");
var router = express.Router();
const preorderController = require("../controllers/preorder");

router.get("/customer/:userId", preorderController.getPreorderForm);

module.exports = router;
