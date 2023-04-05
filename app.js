const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  res.status(200).json({
    "message":"this is the test of CD"
  });
});

module.exports = app;

