var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const orderController = require("../controllers/order");

router.get("/", auth, orderController.getOrderList);
router.post("/", auth, orderController.createOrder);
router.delete("/:orderId", auth, orderController.deleteOrder);

module.exports = router;
