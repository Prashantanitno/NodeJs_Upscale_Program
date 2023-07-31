const express = require("express");
const { register } = require("../controller/UserController");
const { validateUserData } = require("../middleware/UserMiddleware");

const router1 = express.Router();

router1.post("/register", validateUserData, register);

module.exports = router1;
