const express = require("express");

const app = express();
const PORT = process.env.port || 5000;

app.get("/",(req,res)=>{
  return res.send("Networth tracker API")
})

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
