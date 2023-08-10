const Joi = require("joi");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string(),
  address: Joi.string(),
});

function validateUserData(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

// Set up Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Specify the upload directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Rename the file
//   },
// });

// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // console.log("file before", req.file.originalname);
    // console.log(file.originalname, file.mimetype)
    cb(null, Date.now() + "-" + file.originalname); // Rename the file
    // console.log("file after ", req.file);
  },
});

const upload = multer({ storage });

module.exports = { validateUserData, verifyToken, upload };
