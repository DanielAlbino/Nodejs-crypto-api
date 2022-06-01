const express = require("express");
const routes = require("./app/routes/routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", routes);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is Running!");
});
