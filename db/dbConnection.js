const mongoose = require("mongoose");

const dotenv = require("dotenv");

let db = mongoose.connection;

// const logger = require("../utils/logger/logger");

dotenv.config({ path: "./.env" });

const DBConnection = process.env.DATABASE;

function init() {
  mongoose
    .connect(DBConnection, {
      useNewUrlParser: true,
    })
    .then(() => console.log("database successfully connected "))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = {
  init: init,
};
