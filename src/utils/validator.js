const emailValidator = require("email-validator");

const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value !== "" && value !== [];
};

const isEmail = (value) => {
  return emailValidator.validate(value);
};

const isString = (value) => {
  return typeof value === "string";
};

const isInt = (value) => {
  return Number.isInteger(value);
};

module.exports = { isNotEmpty, isEmail, isString, isInt };
