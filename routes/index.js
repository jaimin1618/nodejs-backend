const express = require("express");
const router = express.Router();

// all routes
router.use("/", async (req, res) => {
  res.status(200).json({
    message: "Api status Running",
  });
});

module.exports = router;
