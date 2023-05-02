var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const productController = require("../controllers/product");

router.get("/", auth, productController.getProductList);
router.post("/", auth, productController.createProduct);
router.delete("/:productId", auth, productController.deleteProduct);
router.put("/:productId", auth, productController.updateProduct);


module.exports = router;
