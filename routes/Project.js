const router = require("express").Router();
const jwt = require("jsonwebtoken");
const projectController = require("../controllers/projectController");
router.use("/create", async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    const user = await jwt.verify(token, "ayush24mit8");
    req.user = user.email;
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
});

router.post("/create", projectController.addProject);
router.get("/", projectController.projectAll);
router.get("/one/:id", projectController.projectOne);
router.put("/:projectId", projectController.updateProject);
router.delete("/:projectId", projectController.deleteProject);

module.exports = router;
