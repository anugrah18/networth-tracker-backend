const express = require("express");
const bodyParser = require("body-parser");
const itemTypeRoute = require("./routes/ItemType");
const sequelize = require("./utils/database");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.port || 8080;

app.get("/", async (req, res) => {
  return res.send("Networth tracker API");
});

//Item Type Route
app.use("/api/itemtypes", itemTypeRoute);

app.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database successfully connected");
    })
    .catch((err) => {
      console.log(err);
    });

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
});
