const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signupUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser === null) {
      const savedUser = await user.save();
      // return res.json(savedUser);
      return res.json({ token: generateToken(savedUser._id) });
    }
    res.json({ message: "User already exists" });
  } catch (error) {
    res.json({ message: "error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email: email });
    if (userDetail.password === password) {
      return res.json({ token: generateToken(userDetail._id) });
    }
    res.json({ message: "Invalid credentials" });
  } catch (error) {
    res.json({ message: "error" });
  }
};

const meUser = (req, res) => {
  res.json(req.user);
};

const generateToken = (id) => {
  return jwt.sign({ id }, "ayush24mit8", {
    expiresIn: 60000,
    algorithm: "HS256",
  });
};

module.exports = {
  signupUser,
  meUser,
  loginUser,
};
