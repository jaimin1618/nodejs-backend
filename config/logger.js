const path = require("path");
const rfs = require("rotating-file-stream"); // version 2.x

// Note this is rotating log stream that will create new access.log after 7 days
const LogStream = rfs.createStream("access.log", {
  interval: "7d", // rotate daily
  path: path.join(__dirname, "../logs"),
});

module.exports = {
  skip: (req, res) => res.statusCode < 400,
  stream: LogStream,
};
