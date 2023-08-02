const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const productRoute = require("./routes/ProductRoute");
const userRoute = require("./routes/UserRoute.js");
const mongoose = require("mongoose");
const db = require("./db/dbConnection");

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Db connection setup
db.init();

// Routes setup
app.use("/api", productRoute);
app.use("/api", userRoute);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  req.send("HOme page this is ");
});

app.listen(port, () => {
  console.log(`server is running on Port : ${port}`);
});
