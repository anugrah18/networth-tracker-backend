const Sequelize = require("sequelize");
const ItemType = {
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
};

module.exports = ItemType;
