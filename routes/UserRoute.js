const express = require("express");
const {
  register,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  forgotPassword,
  resetPassword,
} = require("../controller/UserController");
const {
  validateUserData,
  verifyToken,
} = require("../middleware/UserMiddleware");

const router1 = express.Router();

router1.post("/register", validateUserData, register);
router1.post("/login", login);
router1.get("/users", verifyToken ,getAllUsers);
router1.get("/user/:id", getUserById);
router1.patch("/update/:id", updateUser);
router1.delete("/delete/:id", deleteUser);
router1.post("/forgot-password", forgotPassword);
router1.post("/reset-password", resetPassword);

module.exports = router1;
