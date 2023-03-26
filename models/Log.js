const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Log = sequelize.define("Logging", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  log_time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  log_text: {
    type: Sequelize.STRING,
  },
});

module.exports = Log;