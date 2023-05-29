require("dotenv").config();
require("express-async-errors");

// security and application logging
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("./middlewares/RateLimiterMiddleware");
const logger = require("morgan");

// server
const express = require("express");
const cookieParser = require("cookie-parser");
const DBConnect = require("./config/db");
const constants = require("./config/constants");

// server config
const app = express();
const ENVIRONMENT = process.env.ENVIRONMENT || "production";
const PORT = process.env.PORT || 5000;
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || null;
const HandleNotFound = require("./middlewares/HandleNotFoundMiddleware");
const HandleApiError = require("./middlewares/ApiErrorMiddleware");
const ErrorLogger = require("./config/logger");

// log middlewares (console print and file logs)
app.use(logger(ENVIRONMENT === "development" ? "dev" : "common")); // log everything in console
app.use(logger("combined", ErrorLogger)); // only log 4XX and 5XX in file

// middlewares
app.use(helmet());
app.use(xss());
app.use(rateLimiter);
app.use(cors(constants.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes main
const Routes = require("./routes");
app.use("/api/v1", Routes);

// API Error handling
app.use(HandleNotFound);
app.use(HandleApiError);

// Main function
const main = async () => {
  // server configuration completed

  // connect to database
  DBConnect();

  // run the server
  const server = app.listen(PORT, SERVER_DOMAIN, async () => {
    if (ENVIRONMENT === "development")
      console.log(
        "Listening on %s:%s",
        server.address().address,
        server.address().port
      );
    else console.log("Server started!");
  });
};

main().catch((e) => {
  console.log("Server error: ", e);
});
