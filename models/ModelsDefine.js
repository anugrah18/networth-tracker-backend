const sequelize = require("../utils/Database/DBInit");
const ItemTypeSchema = require("./Schemas/ItemTypeSchema");
const UserSchema = require("./Schemas/UserSchema");
const RecordSchema = require("./Schemas/RecordSchema");

//ItemType Table Definition.
const ItemType = sequelize.define("ItemType", ItemTypeSchema);
//User Table Definition.
const User = sequelize.define("User", UserSchema);
//Record Table Definition.
const Record = sequelize.define("Record", RecordSchema);
ItemType.hasOne(Record, {
  foreignKey: {
    name: "itemTypeId",
  },
});

User.hasMany(Record, {
  foreignKey: "userId",
});

module.exports = { ItemType, User, Record };
