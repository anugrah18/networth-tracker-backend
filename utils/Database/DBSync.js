const sequelize = require("./DBInit");

const DBSync = () => {
  sequelize
    .sync()
    .then((result) => {
      if (result) {
        console.log("Database successfully synced");
      }
    })
    .catch((err) => {
      console.log("Database unable to sync");
      console.log(err);
    });
};
module.exports = DBSync;
