const mongoose = require("mongoose");

const dotenv = require("dotenv");

let db = mongoose.connection;

// const logger = require("../utils/logger/logger");

dotenv.config({ path: "./.env" });

const DBConnection = process.env.DATABASE;

function init() {
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);

    mongoose.connect(
      DBConnection,

      {
        autoIndex: true,

        useNewUrlParser: true,

        useUnifiedTopology: true,
      }
    );

    db.on("error", (err) => {
      console.log(`Connection with mongodb failed- ${err}`);

      return reject(err);
    });

    db.once("open", () => {
      console.log("Connection with mongodb successfully established.");

      return resolve();
    });

    db.on("disconnected", function () {
      console.log("Disconnected from mongodb");
    });

    db.on("connected", function () {
      console.log("Connection to mongodb ok");
    });
  });
}

module.exports = {
  init: init,
};
