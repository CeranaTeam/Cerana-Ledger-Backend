const express = require('express');
const router = express.Router();

module.exports = function (dependencies) {
    
    router.get('/', function(req, res) {
        res.status(200).json({
            "message":"this is the test of CD"
        });
    });

    return router
}