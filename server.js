/*==============================
core packages
==============================*/
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
dotenv.config();

/*==============================
security and application logging packages
==============================*/
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("./middlewares/RateLimiterMiddleware");
const logger = require("morgan");

/*==============================
http & https Server
==============================*/
const http = require("http");
// const https = require("https"); // for production use

/*==============================
include middlewares, custom middlewares, Routes and Database connection
==============================*/
const Routes = require("./routes");
const DBConnect = require("./config/db");
const constants = require("./config/constants");
const HandleNotFound = require("./middlewares/HandleNotFoundMiddleware");
const HandleApiError = require("./middlewares/ApiErrorMiddleware");
const ErrorLogger = require("./config/logger");
// const HttpsRequestOnly = require("./middlewares/HttpsRequestOnly"); // for production use

/*==============================
include environment variables
==============================*/
const ENVIRONMENT = process.env.ENVIRONMENT || "production";
const HTTP_PORT = process.env.HTTP_PORT || 80;
// const HTTPS_PORT = process.env.HTTPS_PORT || 443; // for production use
// const SERVER_DOMAIN = process.env.SERVER_DOMAIN || null; // for production use

/*==============================
server application configurations
==============================*/
DBConnect();
const app = express();
app.use(logger(ENVIRONMENT === "development" ? "dev" : "common")); // log everything in console
app.use(logger("combined", ErrorLogger)); // only log 4XX and 5XX in file
app.use(helmet());
app.use(xss());
app.use(rateLimiter);
app.use(cors(constants.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(HttpsRequestOnly); // for production use

/*==============================
routes, not found and custom api error handler
==============================*/
app.use("/api/v1", Routes); // routes and prefix
app.use(HandleNotFound); // endpoint not found response
app.use(HandleApiError); // Custom API Error handler

/*==============================
public endpoint for file/media access
==============================*/
app.use("/public", express.static(path.join(__dirname, "public")));

/*==============================
create http (development) server instance
==============================*/
const httpServer = http.createServer(app);

/*==============================
create https (production) server instance
==============================*/
// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync("./config/privkey.pem", "utf-8"),
//     cert: fs.readFileSync("./config/cert.pem", "utf-8"),
//     ca: fs.readFileSync("./config/chain.pem", "utf-8"),
//   },
//   app
// ); // for production use

/*==============================
start server listen
==============================*/
httpServer.listen(HTTP_PORT, () => console.log("http server started!"));
// httpsServer.listen(HTTPS_PORT, SERVER_DOMAIN, async () => {
//   if (process.env.ENVIRONMENT === "development")
//     console.log(
//       "Listening on %s:%s",
//       httpsServer.address().address,
//       httpsServer.address().port
//     );
//   else console.log("Server started!");
// }); // for production use
