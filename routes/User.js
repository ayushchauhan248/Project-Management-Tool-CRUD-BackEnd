const router = require("express").Router();
const userController = require("../controllers/authController");

router.post("/login", userController.loginUser);
router.post("/signup", userController.signupUser);
router.get("/me", userController.meUser);

module.exports = router;
