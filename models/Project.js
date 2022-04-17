const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  title: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
