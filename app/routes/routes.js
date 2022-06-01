const express = require("express");
const router = express();

const {
  signin,
  signup,
  signout,
} = require("../controllers/auth/authentication.controller");

const {
  getSpread,
  updateSpread,
  addNewSpread,
  deleteSpread,
} = require("../controllers/spread/spread.controller");

const {
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/admin/administrative.controller");

const {
  getCurrencyExchangeRate,
} = require("../controllers/coinmarketAPI/coinmarketcap.controller");
// Base
router.get("/", (req, res) => {
  res.status(200).send("welcome");
});

// Authentication
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

// User - Read, Update, Delete
router.post("/user/new", createUser);
router.get("/user/:id", getUser);
router.put("/user/:id/update", updateUser);
router.delete("/user/:username", deleteUser);

// Spread CRUD
router.get("/spread", getSpread);
router.put("/spread", updateSpread);

//COINMARKETCAP Routes

router.get("/api/BTCUSD", getCurrencyExchangeRate);

module.exports = router;
