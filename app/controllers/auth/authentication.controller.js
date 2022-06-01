const {
  verifyUser,
  createNewUser,
  sendTockenToBlackList,
} = require("../../db/authentication.db");
const generateToken = require("../../utils/token-generator.controller");
const { ecryptPassword, comparePasswords } = require("../../utils/encrypt");

const signin = async (req, res) => {
  try {
    const user = req.body;
    // code to check if user exists in DB and verify user and password
    const response = await verifyUser(user);
    // Generate the user token with 24h expiration date.
    if (response) {
      const isCorrectPassword = await comparePasswords(
        user.password,
        response.password
      );
      if (isCorrectPassword) {
        const token = generateToken(user);
        const isAdmin = response.isAdmin;
        const jsonResponse = { token, isAdmin };
        localStorage.setItem("user", jsonResponse);
        res.status(200).send(jsonResponse);
      } else {
        res.status(400).send({ message: "Invalid username/password" });
      }
    } else {
      res.status(400).send({ message: "Username doesn't exist!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
    throw err;
  }
};

const signout = (req, res) => {
  try {
    const token = req.body.token;
    //Code to send token to DB blacklist
    const toBlackList = sendTockenToBlackList(token);
    if (toBlackList) {
      res.status(200).send({ message: "logged out!" });
    } else {
      res.status(400).send({ message: "Something went wrong!" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const signup = async (req, res) => {
  try {
    const user = req.body;
    let newUserCreated = null;
    //encrypt password
    const hashedPassword = await ecryptPassword(user.password).then(
      (hash) => hash
    );

    if (hashedPassword) {
      user.password = hashedPassword;
      newUserCreated = await createNewUser(user);
    }
    if (newUserCreated) {
      res.status(200).send({ message: "Signed Up!" });
    } else {
      res.status(400).send({ message: "Something went wrong!" });
    }
    // Verify if user/email exists in DB, if not will add the new user
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  signin,
  signout,
  signup,
};
