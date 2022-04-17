const Project = require("../models/Project");

// get all project
const projectAll = async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (error) {
    res.json({ message: error });
  }
};

// get one project
const projectOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.json({ message: error });
  }
};

// add new project
const addProject = async (req, res) => {
  const project = new Project({
    title: req.body.title,
    technology: req.body.technology,
    deadline: req.body.deadline,
    description: req.body.description,
  });

  try {
    const savedProject = await project.save();
    res.send(savedProject);
  } catch (error) {
    res.status(400).send(error);
  }
};

// update a project
const updateProject = async (req, res) => {
  try {
    const project = {
      title: req.body.title,
      technology: req.body.technology,
      deadline: req.body.deadline,
      description: req.body.description,
    };

    const updatedProject = await Project.findByIdAndUpdate(
      { _id: req.params.projectId },
      project
    );
    res.json(updatedProject);
  } catch (error) {
    res.json({ message: error });
  }
};

// delete a project
const deleteProject = async (req, res) => {
  try {
    const removeProject = await Project.findByIdAndDelete(req.params.projectId);
    res.json(removeProject);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  projectAll,
  projectOne,
  addProject,
  updateProject,
  deleteProject,
};
