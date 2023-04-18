const express = require("express");
const router = express.Router();


    

/**
 * Say hello to a user.
 * @swagger
 * /hello:
 *   get:
 *     summary: Say hello to a user
 *     description: This API returns a greeting message to the specified user.
 *     parameters:
 *       - name: user
 *         in: query
 *         description: The name of the user to greet.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A greeting message for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The greeting message.
 *     tags:
 *       - Greetings
 */
router.get("/", function(req, res) {
  const user = req.query.user;
  res.status(200).json({
    "message":`this is the test of ${user}`
  });
});

module.exports = router;