const AsyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

/*==============================
Development guide:-
  - Create separate .js file for each endpoints and import these files here (e.g. AdminRoutes.js)
  - Wrap the controller with AsyncHandler, it will deal with try {} catch(e) {} wrapping of async program.

==============================*/

const AuthRoutes = require("./AuthRoutes");

router.use(
  "/",
  AsyncHandler(async (req, res) => {
    res.status(200).json({
      message: "Api status Running",
    });
  })
);

module.exports = router;
