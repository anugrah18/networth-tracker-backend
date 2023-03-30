const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const ItemType = sequelize.define("ItemType", {
  itemTypeId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  itemCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ItemType;
