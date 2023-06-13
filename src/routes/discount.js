var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const discountController = require("../controllers/discount");

router.get("/", auth, discountController.getDiscountList);
router.post("/", auth, discountController.createDiscount);
router.delete("/:discountId", auth, discountController.deleteDiscount);

module.exports = router;
