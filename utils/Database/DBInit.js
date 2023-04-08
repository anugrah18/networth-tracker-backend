const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();

const DB_ENVIRONMENT = process.env.APP_ENVIRONMENT || "prod";

const DB_DATABASE =
  DB_ENVIRONMENT === "prod"
    ? process.env.DB_PROD_DATABASE
    : process.env.DB_DEV_DATABASE;
const DB_USERNAME =
  DB_ENVIRONMENT === "prod"
    ? process.env.DB_PROD_USERNAME
    : process.env.DB_DEV_USERNAME;
const DB_PASSWORD =
  DB_ENVIRONMENT === "prod"
    ? process.env.DB_PROD_PASSWORD
    : process.env.DB_DEV_PASSWORD;
const DB_HOST =
  DB_ENVIRONMENT === "prod"
    ? process.env.DB_PROD_HOST
    : process.env.DB_DEV_HOST;
const DB_DIALECT =
  DB_ENVIRONMENT === "prod"
    ? process.env.DB_PROD_DIALECT
    : process.env.DB_DEV_DIALECT;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

module.exports = sequelize;
