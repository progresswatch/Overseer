const Task = require('../models/task');

const taskController = {};

taskController.getTasks = (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.json(tasks);
    }).catch((err) => {
      throw err;
    });
};

taskController.addTask = (req, res) => {
  Task.create({
    name: req.body.name
  }).then((result) => {
    res.send('Task Added');
  }).catch((err) => {
    throw err;
  });
};

module.exports = taskController;