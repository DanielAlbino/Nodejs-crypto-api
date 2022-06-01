const { get } = require("axios");

const getCurrencyExchangeRate = async (req, res) => {
  try {
    await get(process.env.COINGECKO_URI, {
      headers: {
        Accept: "accept",
        Authorization: "authorize",
      },
    }).then((response) => {
      const { data } = response;
      res.status(200).send(data);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCurrencyExchangeRate,
};
