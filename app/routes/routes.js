const express = require("express");
const routes = express().router();

routes.post("/user/generateToken", (req, res) => {
  // Validate User Here

  // Then generate JWT Token
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 99,
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

module.exports = routes;
