const { getSpreadInfo } = (require = "../../db/spread.db.js");

const getSpread = (req, res) => {
  if (!req.body.isAdmin) {
    res.status(403).send("Access denied!");
    return;
  }
  const spread = getSpreadInfo();
  if (!spread) {
    res.status(400).send({ message: "something went wrong!" });
  }
  res.status(200).send(spread);
};

const updateSpread = (req, res) => {
  if (!req.body.isAdmin) {
    res.status(403).send("Access denied!");
    return;
  }
  const response = updateSpread(req.body.spread);
  if (response) res.status(200).send({ message: "success" });
  else res.status(400).send({ message: "Something went wrong" });
};

module.exports = {
  getSpread,
  updateSpread,
};
