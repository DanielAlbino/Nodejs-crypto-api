const generateToken = require("./token-generator.controller");

const signin = (req, res) => {
  try {
    const user = req.body;
    const token = generateToken(user);
    res.status(200).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
};

const signout = (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: "logged out!" });
};

const signup = (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: "logged out!" });
};

module.exports = {
  signin,
  signout,
  signup,
};
