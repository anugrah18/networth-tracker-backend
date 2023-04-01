const express = require("express");
const bodyParser = require("body-parser");
const itemTypeRoute = require("./routes/ItemType");
const DBSync = require("./utils/Database/DBSync");
const DBConnect = require("./utils/Database/DBConnect");
const userRoute = require("./routes/User");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.port || 8080;

DBConnect();

DBSync();

app.get("/", async (req, res) => {
  return res.send("Networth tracker API");
});

//Item Type Route
app.use("/api/itemtypes", itemTypeRoute);

//User Route
app.use("/api/users", userRoute);

app.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
});
