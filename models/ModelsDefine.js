const sequelize = require("../utils/Database/DBInit");
const ItemTypeSchema = require("./Schemas/ItemTypeSchema");
const UserSchema = require("./Schemas/UserSchema");

const ItemType = sequelize.define("ItemType", ItemTypeSchema);
const User = sequelize.define("User", UserSchema);

module.exports = { ItemType, User };
