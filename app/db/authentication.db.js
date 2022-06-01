const { Client } = require("pg");
const { errorLog } = require("../utils/logs");

const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "cryptoAPI",
  password: "root",
  port: 5432,
});

const verifyUser = async (user) => {
  client.connect();
  const response = await client
    .query(`SELECT password, isAdmin FROM users WHERE username = $1`, [
      user.username,
    ])
    .then((res) => {
      return res.rows[0];
    })
    .catch((e) => {
      return false;
    });
  client.end;
  return response;
};

const checkIfUsernameExists = (req, res) => {
  const { user } = req.body;
  // promise
  client.connect();
  client
    .query(`SELECT username FROM users WHERE username = $1`, [user])
    .then(() => {
      return true;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    });
  client.end;
};

const createNewUser = async (user) => {
  client.connect();
  // promise
  user.isAdmin = false;
  const response = await client
    .query(
      `INSERT INTO users(name, username, password, isAdmin) VALUES($1, $2, $3, $4)`,
      [user.name, user.username, user.password, user.isAdmin]
    )
    .then(() => {
      return true;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    });

  return response;
};

const sendTockenToBlackList = (token) => {
  client.connect();
  const response = client
    .query(`INSERT INTO blacklist(token) VALUES($1)`, [token])
    .then(() => {
      return true;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    });
  client.end;
  return response;
};

module.exports = {
  verifyUser,
  sendTockenToBlackList,
  createNewUser,
  checkIfUsernameExists,
};
