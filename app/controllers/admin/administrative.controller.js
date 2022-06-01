const {
  getUserInfo,
  updateUserInfoWithoutPassword,
  updateUserInfoWithPassword,
  deleteUserFromDB,
} = require("../../db/administration.db");
const { ecryptPassword } = require("../../utils/encrypt");

const createUser = async (req, res) => {
  if (!req.body.isAdmin) {
    res.status(403).send("Access denied!");
    return;
  }
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
      res.status(200).send({ message: "Created" });
    } else {
      res.status(400).send({ message: "Something went wrong!" });
    }
    // Verify if user/email exists in DB, if not will add the new user
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    let userInfo = null;
    if (!req.body.isAdmin) {
      res.status(403).send("Access denied!");
      return;
    }
    userInfo = await getUserInfo(req.params.id);

    res.status(200).send(userInfo[0]);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateUser = (req, res) => {
  if (!req.body.isAdmin) {
    res.status(403).send("Access denied!");
    return;
  }
  if (req.body.password) {
    updateUserInfoWithPassword(req.body);
  } else {
    updateUserInfoWithoutPassword(req.body);
  }
};

const deleteUser = (req, res) => {
  if (!req.body.isAdmin) {
    res.status(403).send("Access denied!");
    return;
  }
  const isDeleted = deleteUserFromDB(req.body.username);
  if (isDeleted) {
    res.status(200).send("Deleted!");
  } else {
    res.status(404).send("User not found!");
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
