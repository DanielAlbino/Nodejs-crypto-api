const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Then generate JWT Token
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const payload = {
    userId: 1,
    username: user.username,
    time: Date(),
  };

  // Create token
  const token = jwt.sign(payload, jwtSecretKey, { iat: "24h" });
  return token;
};

module.exports = generateToken;
