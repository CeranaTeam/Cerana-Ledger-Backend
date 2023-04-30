var express = require("express");
var router = express.Router();
const preorderController = require("../controllers/preorder");

/**
 * @swagger
 * /preorder/customer/{userId}:
 *   get:
 *     summary: Get preorder form for a customer
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the customer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preorderForm:
 *                   type: object
 *                   properties:
 *                     storeName:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type_id:
 *                             type: string
 *                           productId:
 *                             type: string
 *                           productName:
 *                             type: string
 *                           productPrice:
 *                             type: number
 *                           productSpec:
 *                             type: string
 *                           productTypeId:
 *                             type: string
 *                           productType:
 *                             type: string
 *                 message:
 *                   type: string
 *             example:
 *               preorderForm:
 *                 storeName: 肥皂店
 *                 products:
 *                   - type_id: dUoM8j33QOoMufngHglh
 *                     productId: 4wbx9iDwlxtxwuxWdxfG
 *                     productName: 米糠皂
 *                     productPrice: 229
 *                     productSpec: 梔子花
 *                     productTypeId: dUoM8j33QOoMufngHglh
 *                     productType: 香皂
 *                   - type_id: dUoM8j33QOoMufngHglh
 *                     productId: kszyiuE1OGZkBALDlaDx
 *                     productName: 米糠皂
 *                     productPrice: 229
 *                     productSpec: 黃香木
 *                     productTypeId: dUoM8j33QOoMufngHglh
 *                     productType: 香皂
 *                   - type_id: dUoM8j33QOoMufngHglh
 *                     productId: M7NCyLbo7bLK8PxqZJp8
 *                     productName: 米糠皂
 *                     productPrice: 249
 *                     productSpec: 純米皂
 *                     productTypeId: dUoM8j33QOoMufngHglh
 *                     productType: 香皂
 *                   - type_id: dUoM8j33QOoMufngHglh
 *                     productId: YhUB8k2KOsGrxn3NbCjr
 *                     productName: 米糠皂
 *                     productPrice: 229
 *                     productSpec: 白茶樹
 *                     productTypeId: dUoM8j33QOoMufngHglh
 *                     productType: 香皂
 *               message: success
 *     tags:
 *          - preorder
 */
router.get("/customer/:userId", preorderController.getPreorderForm);

module.exports = router;
