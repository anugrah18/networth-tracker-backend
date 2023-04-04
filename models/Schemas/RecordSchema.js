const Sequelize = require("sequelize");

const Record = {
  recordId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  recordDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  itemDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  itemValue: {
    type: Sequelize.STRING,
  },
};

module.exports = Record;
