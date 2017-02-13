const Project = require('../models/project');

const projectController = {};

projectController.addProject = (req, res) => {
  Project.create({ 
    name: req.body.name
  }).then((result) => {
    return res.send('Project created');
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

module.exports = projectController;