const { validationResult } = require("express-validator");
const Project = require("../models/Project");
const User = require("../models/User");

// get all project
const projectAll = async (req, res) => {
  try {
    // const project = await Project.find();
    res.json(req.user.projects);
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
  const error = validationResult(req);
  // console.log(error);
  const project = new Project({
    title: req.body.title,
    technology: req.body.technology,
    deadline: req.body.deadline,
    description: req.body.description,
  });
  if (!error.isEmpty()) {
    return res.status(400).send(error);
  } else {
    const user_id = req.user._id;
    const savedProject = await project.save();
    await User.findByIdAndUpdate(user_id, {
      $push: { projects: savedProject },
    });
    return res.send(savedProject);
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
    const user_id = req.user._id;
    const removeProject = await Project.findByIdAndDelete(req.params.dltid);
    // console.log(removeProject);
    await User.findOneAndUpdate(
      { _id: user_id },
      {
        $pull: { projects: { $in: [removeProject._id] } },
      },
      { safe: true, multi: false }
    );
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
