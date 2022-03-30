"use strict";
(() => {
  const timeLog = async function (req, res, next) {
    const data = new Date();
    console.log(
      `[SERVER] ` +
        `${data.toLocaleString()} ` +
        `${req.ip} - ` +
        `${req.method} ` +
        `${req.url} ` +
        `${res.statusCode}`
    );
    next();
  };

  module.exports = {
    timeLog,
  };
})();
