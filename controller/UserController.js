const User = require("../model/UserSchema");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { email, password, name, address } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the User schema
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      address,
    });

    // Save the user data to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      "your-secret-key"
    );
    return res.status(200).json({ token });
  });
};

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Permission denied" });
  }

  res.json(
    users.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
    }))
  );
};
exports.getUserById = async (req, res) => {
  if (req.user.role !== "admin" && parseInt(req.params.id) !== req.user.id) {
    return res.status(403).json({ message: "Permission denied" });
  }

  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ id: user.id, username: user.username, role: user.role });
};
exports.updateUser = async (req, res) => {
  if (req.user.role !== "admin" && parseInt(req.params.id) !== req.user.id) {
    return res.status(403).json({ message: "Permission denied" });
  }

  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user details here (e.g., user.username = req.body.username; user.role = req.body.role;)

  res.json({ id: user.id, username: user.username, role: user.role });
};
exports.deleteUser = async (req, res) => {
  if (req.user.role !== "admin" && parseInt(req.params.id) !== req.user.id) {
    return res.status(403).json({ message: "Permission denied" });
  }

  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "User deleted successfully" });
};
