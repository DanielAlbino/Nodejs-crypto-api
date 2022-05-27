const express = require("express");
const routes = require("./app/routes/routes");
const jwt = require('jsonwebtoken');

const app = express();

app.use("/", routes);



app.listen(8080, () => {
  console.log("Server is Running!");
});
