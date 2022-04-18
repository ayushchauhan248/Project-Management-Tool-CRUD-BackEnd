const router = require("express").Router();
const projectController = require("../controllers/projectController");
const check = require("../middlewares/authorize");

router.use("/create", check.authCheck);
router.use("/", check.authCheck);
router.use("/one/:id", check.authCheck);
router.use("/:projectId", check.authCheck);
router.use("/:dltid", check.authCheck);

router.post("/create", projectController.addProject);
router.get("/", projectController.projectAll);
router.get("/one/:id", projectController.projectOne);
router.put("/:projectId", projectController.updateProject);
router.delete("/:dltid", projectController.deleteProject);

module.exports = router;
