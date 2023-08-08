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
  fileUpload,
} = require("../controller/UserController");
const {
  validateUserData,
  verifyToken,
  upload,
  
} = require("../middleware/UserMiddleware");
const multer =require('multer')
const router1 = express.Router();
// const upload =multer({dest:"./uploads"})
router1.post("/register", validateUserData, register);
router1.post("/login", login);
router1.get("/users", verifyToken, getAllUsers);
router1.get("/user/:id", getUserById);
router1.patch("/update/:id", updateUser);
router1.delete("/delete/:id", deleteUser);
router1.post("/forgot-password", forgotPassword);
router1.post("/reset-password", resetPassword);
router1.post("/upload", upload.single("file"), fileUpload);

module.exports = router1;
