const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authCheck = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const user = await jwt.verify(token, "ayush24mit8");
    req.user = await User.findById(user.id).populate("projects");
    next();
  } catch (error) {
    res.status(401).json({
      errors: [
        {
          msg: error,
        },
      ],
    });
  }
};

module.exports = {
  authCheck,
};
