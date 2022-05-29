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

// Base
router.get("/", (req, res) => {
  console.log("Welcome!");
});

// Authentication
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

// User - Read, Update, Delete
router.get("/user/:id", signin);
router.put("/user/:id/update", signup);
router.delete("/user/:id", signout);

// Spread CRUD
router.post("/spread", addNewSpread);
router.get("/spread", getSpread);
router.put("/spread", updateSpread);
router.delete("/spread", deleteSpread);

module.exports = router;
