const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_PROD_DATABASE,
  process.env.DB_PROD_USERNAME,
  process.env.DB_PROD_PASSWORD,
  {
    host: process.env.DB_PROD_HOST,
    dialect: process.env.DB_PROD_DIALECT,
  }
);

module.exports = sequelize;
