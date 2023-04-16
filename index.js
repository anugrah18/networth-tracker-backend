const express = require("express");
const bodyParser = require("body-parser");
const itemTypeRoute = require("./routes/ItemType");
const DBSync = require("./utils/Database/DBSync");
const DBConnect = require("./utils/Database/DBConnect");
const userRoute = require("./routes/User");
const recordRoute = require("./routes/Record");
const cors = require("cors");

const DB_ENVIRONMENT = process.env.APP_ENVIRONMENT || "prod";

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.port || 8080;

DBConnect();

DBSync();

app.get("/", async (req, res) => {
  return res.json({
    name: "Networth tracker API",
    environment: DB_ENVIRONMENT === "prod" ? "Production" : "Development",
  });
});

//Item Type Route
app.use("/api/itemtypes", itemTypeRoute);

//User Route
app.use("/api/users", userRoute);

//Record Route
app.use("/api/records", recordRoute);

app.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
});
