const express = require('express');
const app = express();
app.use(express.json());

// ===== use .env arguments =====
const dotenv = require('dotenv')
const yargs = require('yargs');

const argv = yargs.options({
        dotenv: {
            default: '.env.test',
            describe: 'Path to environment file',
            type: 'string'
        }
    }).argv;

dotenv.config({ path: './.env/' + argv.dotenv });
console.log("this is arg", process.env.ENV_NAME)

app.get('/', function(req, res) {
    res.status(200).json({
        "message":"this is the test of CD"
    });
});

module.exports = app;

