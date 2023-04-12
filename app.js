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


const hello = (require('./src/routes/hello.js'))({})

app.use(hello)


module.exports = app;

