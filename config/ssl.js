const fs = require("fs");

module.exports = {
  key: fs.readFileSync(__dirname + "/privkey.pem", "utf-8"),
  cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
};
