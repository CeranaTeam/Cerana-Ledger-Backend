const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  res.status(200).json({
    "message":"Hello world!"
  });
});

module.exports = app;

