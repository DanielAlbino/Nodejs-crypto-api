const bcrypt = require("bcrypt");

const ecryptPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
module.exports = {
  ecryptPassword,
  comparePasswords,
};
