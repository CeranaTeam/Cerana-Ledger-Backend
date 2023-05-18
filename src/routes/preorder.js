var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const preorderController = require("../controllers/preorder");



/**
 * @swagger
 * /preorder:
 *   post:
 *     summary: Create a new preorder.
 *     description: Create a new preorder with the provided user id, preorder form details and product details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID associated with the preorder.
 *               preorderForm:
 *                 type: object
 *                 properties:
 *                   preorderPickUpTime:
 *                     type: string
 *                     description: The date and time for when the preorder will be picked up.
 *                   preorderContact:
 *                     type: string
 *                     description: The contact number associated with the preorder.
 *                   preorderNote:
 *                     type: string
 *                     description: Any additional notes for the preorder.
 *                   preorderCreateTime:
 *                     type: string
 *                     description: The date and time the preorder was created.
 *                   products:
 *                     type: array
 *                     description: The list of products included in the preorder.
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           description: The ID of the product included in the preorder.
 *                         amount:
 *                           type: integer
 *                           description: The amount of the product included in the preorder.
 *                         example:
 *                           productId: "4wbx9iDwlxtxwuxWdxfG"
 *                           amount: 5
 *     responses:
 *       200:
 *         description: Success message with the preorderId.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preorderId:
 *                   type: string
 *                   description: The ID of the newly created preorder.
 *                   example: "819552d9-9a08-4cb9-8fe9-50d51a90ff21"
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "success"
 *       400:
 *         description: Bad request error.
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - preorder
 */

router.post("/", preorderController.createPreorder);


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

router.get("/store", auth, preorderController.getPreorders);

router.head("/complete/:preorderId", auth, preorderController.completePreorder);

router.head("/reject/:preorderId", auth, preorderController.rejectPreorder);
module.exports = router;
