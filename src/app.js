var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const express = require("express");
const app = express();
app.use(express.json());


// ======= use swagger =========
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger-config.js");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ==============================

// ===== use .env arguments =====
const dotenv = require("dotenv");
const yargs = require("yargs");

const argv = yargs.options({
  dotenv: {
    default: ".test.env",
    describe: "Path to environment file",
    type: "string"
  }
}).argv;


const env_path = path.resolve(__dirname, "../.env", argv.dotenv);
dotenv.config({ path: env_path});
console.log("this is arg", process.env.ENV_NAME);
// ================================

// declare body parser middleware to parse json body
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// disable cors for those domains
const cors = require("cors")({
  origin: [
    "https://ceranapos.ebg.tw",
    "https://ceranapos.web.app",
    "https://pos.cerana.tech",
    "https://ledger.cerana.tech",
    "http://localhost:5173",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
});
app.use(cors);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

console.log("Listening on port " + process.env.PORT);

// declare routes
app.use("/user", require("./routes/user.js"));
app.use("/staff", require("./routes/staff.js"));
app.use("/type", require("./routes/type.js"));
app.use("/tag", require("./routes/tag.js"));
app.use("/discount", require("./routes/discount.js"));
app.use("/product", require("./routes/product.js"));
app.use("/order", require("./routes/order.js"));
app.use("/preorder", require("./routes/preorder.js"));
app.use("/statistic", require("./routes/statistic.js"));
app.use("/hello",require("./routes/hello.js"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});







module.exports = app;

