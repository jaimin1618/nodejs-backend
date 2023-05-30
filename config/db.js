const mongoose = require("mongoose");

const DBConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (process.env.ENVIRONMENT === "development") {
      console.log(
        `MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
      );
    }
  } catch (error) {
    console.log(error);
    process.exit(1); // exit the process with failure (1)
  }
};

module.exports = DBConnect;
