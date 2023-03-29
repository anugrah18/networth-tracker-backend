const express = require("express");
const sequelize = require("./utils/database");

const app = express();
const PORT = process.env.port || 8080;

const Log = require("./models/Log");

app.get("/test", async(req, res) => {
  var datetime = new Date().toISOString();
  const result = await Log.create({log_time:datetime,log_text:"test-log"})
  if (result) {
  return res.send("Logged data to DB");
  }
});

app.get("/", async(req, res) => {  
  return res.send("Networth tracker API");
});


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

  sequelize.sync().then((result)=>{
    if (result) {
      console.log("Database successfully synced")
    }
  }).catch((err)=>{
    console.log("Database unable to sync")
    console.log(err)
  })

});
