const sequelize = require("./DBInit");

const DBConnect = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database successfully connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = DBConnect;
