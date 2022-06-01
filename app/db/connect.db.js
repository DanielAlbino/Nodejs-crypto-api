const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "cryptoAPI",
  password: "root",
  port: 5432,
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});
const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "cryptoAPI",
  password: "root",
  port: 5432,
});
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});
