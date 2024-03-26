const mongoose = require("mongoose");
const logger = require("../logger/logger");
const CONFIG = require("../config/config");

function connectToDb() {
  mongoose.connect(CONFIG.MONGODB_URL);

  mongoose.connection.on("connected", () => {
    logger.info("Mongodb connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("An error occured");
    logger.error(err.message);
  });
}

module.exports = connectToDb;
