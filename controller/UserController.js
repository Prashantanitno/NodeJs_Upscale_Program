const User = require("../model/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail'
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  }, 
});

exports.register = async (req, res) => {
  try {
    const { email, password, name, address } = req.body;
    console.log(req.body);
    // Create a new user using the User schema
    const newUser = new User({
      name,
      email,
      password,
      address,
    });

    // Save the user data to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your-secret-key", {
      expiresIn: "1d",
    });
    return res.status(200).json({ token });
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 });
  return res.status(200).json({ users });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  const doc = {
    name: name,
    address: address,
  };
  const user = await User.findByIdAndUpdate({ _id: id }, { $set: { ...doc } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.deleteOne({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User deleted successfully", user });
};


exports.forgotPassword = async (req,res)=>{


}

exports.resetPassword = async(req,res)=>{

  
}
