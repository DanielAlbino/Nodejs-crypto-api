const { Client } = require("pg");
const { errorLog } = require("../utils/logs");

const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "cryptoAPI",
  password: "root",
  port: 5432,
});

const getUserInfo = async (userId) => {
  // promise
  client.connect();
  const response = await client
    .query(`SELECT name, username, isAdmin FROM users WHERE id = $1`, [userId])
    .then((res) => {
      return res.rows;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    });
  client.end;
  return response;
};

const updateUserInfoWithoutPassword = async (user) => {
  // promise
  client.connect();
  const response = await client
    .query(
      `UPDATE users SET name = $1, username = $2, isAdmin = $3 WHERE id = $4;`,
      [user.name, user.username, user.isAdmin, user.id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    });
  client.end;
  return response;
};

const updateUserInfoWithPassword = async (user) => {
  // promise
  client.connect();
  const response = await client
    .query(
      `UPDATE users SET name = $1, username = $2, isAdmin = $3, password =$4 WHERE id = $4;`,
      [user.name, user.username, user.isAdmin, user.password, user.id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((e) => {
      errorLog(e.stack);
      return false;
    });
  client.end;
  return response;
};

const deleteUserFromDB = async (username) => {
  // promise
  client.connect();
  const response = await client
    .query(`DELETE FROM users WHERE username = $1;`, [username])
    .then((res) => {
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
  getUserInfo,
  updateUserInfoWithoutPassword,
  updateUserInfoWithPassword,
  deleteUserFromDB,
};
