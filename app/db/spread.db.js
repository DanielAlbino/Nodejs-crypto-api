const { Client } = require("pg");
const { errorLog } = require("../utils/logs");

const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "cryptoAPI",
  password: "root",
  port: 5432,
});

const getSpreadInfo = async () => {
  // promise
  client.connect();
  const response = await client
    .query(`SELECT * FROM spread`)
    .then((res) => {
      return res.rows;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    })
    .then(() => client.end());
  return response;
};

const updateSpread = async (newSpread) => {
  // promise
  client.connect();
  const response = await client
    .query(`UPDATE spread SET spread = $1 WHERE id = 1;`, [newSpread])
    .then((res) => {
      return true;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    })
    .then(() => client.end());
  return response;
};

module.exports = {
  getSpreadInfo,
  updateSpread,
};
