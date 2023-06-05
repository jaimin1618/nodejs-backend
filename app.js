require("dotenv").config();
require("express-async-errors");

// security and application logging
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("./middlewares/RateLimiterMiddleware");
const logger = require("morgan");

// server
const http = require("http");
// const https = require("https");
const express = require("express");
const cookieParser = require("cookie-parser");
const DBConnect = require("./config/db");
const constants = require("./config/constants");

// server config
const app = express();
const ENVIRONMENT = process.env.ENVIRONMENT || "production";
const HTTP_PORT = process.env.HTTP_PORT || 80;
// const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || null;
const HandleNotFound = require("./middlewares/HandleNotFoundMiddleware");
const HandleApiError = require("./middlewares/ApiErrorMiddleware");
const HandleBadRequest = require("./middlewares/HandleBadRequestMiddleware");
const ErrorLogger = require("./config/logger");
// const HttpsRequestOnly = require("./middlewares/HttpsRequestOnly");
// const SSL = require("./config/ssl");

// log middlewares (console print and file logs)
app.use(logger(ENVIRONMENT === "development" ? "dev" : "common")); // log everything in console
app.use(logger("combined", ErrorLogger)); // only log 4XX and 5XX in file

// middlewares
// app.use(HttpsRequestOnly);
app.use(helmet());
app.use(xss());
app.use(rateLimiter);
app.use(cors(constants.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes main
const Routes = require("./routes");

// implement routes, prefix and bad request error throw middleware
app.use("/api/v1", Routes);
app.use(HandleBadRequest);

// Custom API Error handler or error catcher and sending error response
app.use(HandleNotFound);
app.use(HandleApiError);

// Main function
const main = async () => {
  // server configuration completed

  // connect to database
  DBConnect();

  // start HTTP and HTTPS servers
  const httpServer = http.createServer(app);
  // const httpsServer = https.createServer(SSL, app);

  httpServer.listen(HTTP_PORT, SERVER_DOMAIN, async () => {
    if (ENVIRONMENT === "development")
      console.log(
        "Listening on %s:%s",
        httpServer.address().address,
        httpServer.address().port
      );
    else console.log("Server started!");
  });
  // httpsServer.listen(HTTPS_PORT);
};

main().catch((e) => {
  console.log("Server error: ", e);
});
