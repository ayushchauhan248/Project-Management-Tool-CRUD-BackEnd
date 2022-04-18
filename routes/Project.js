const router = require("express").Router();
const projectController = require("../controllers/projectController");
const check = require("../middlewares/authorize");
const { body } = require("express-validator");

router.use("/create", check.authCheck);
router.use("/", check.authCheck);
router.use("/one/:id", check.authCheck);
router.use("/:projectId", check.authCheck);
router.use("/:dltid", check.authCheck);

router.post(
  "/create",
  [
    body("title", "title should be of 3 length").isLength({ min: 3 }),
    body("technology", "technology should be of 3 length").isLength({ min: 3 }),
    body("description", "description should be of 20 length").isLength({
      min: 20,
    }),
  ],
  projectController.addProject
);
router.get("/", projectController.projectAll);
router.get("/one/:id", projectController.projectOne);
router.put("/:projectId", projectController.updateProject);
router.delete("/:dltid", projectController.deleteProject);

module.exports = router;
