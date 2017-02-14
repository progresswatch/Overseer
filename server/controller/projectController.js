const Project = require('../models/project');
const Models = require('../models');

const projectController = {};

projectController.addProject = (req, res) => {
  Project.create({
    name: req.body.name
  }).then((result) => {
    // return res.send('Project created');
    return res.json(result);
  }).catch((err) => {
    throw err;
  });
};

projectController.getProjects = (req, res) => {
  Project.findAll({})
    .then((projects) => {
      res.json(projects);
    }).catch((err) => {
      throw err;
    });
};

projectController.getProjectInformation = (req, res) => {
  Models.Project.findById(req.params.id, {
    include: [
      {
        model: Models.Task
      }
    ]
  }).then((project) => {
    res.json(project);
  }).catch((err) => {
    res.send(err);
  });
}

module.exports = projectController;
