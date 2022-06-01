const jwt = require("jsonwebtoken");

const checkIfTokenExpired = (req, res) => {
  const token = req.body;
  jwt.verify(
    token,
    req.app.get(process.env.JWT_SECRET_KEY),
    function (err, decoded) {
      // Manage different errors here (Expired, untrusted...)
      if (err) throw new Error(err);

      // If no error, token info is returned in 'decoded'
      req.auth = decoded;
      next();
    }
  );
};

module.exports = checkIfTokenExpired;
