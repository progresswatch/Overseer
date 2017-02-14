const Task = require('../models/task');

const taskController = {};

taskController.getTasks = (req, res) => {
  Task.findAll({ where: { projectId: req.params.id } })
    .then((tasks) => {
      res.json(tasks);
    }).catch((err) => {
      throw err;
    });
};

taskController.addTask = (req, res) => {
  console.log(req.body);
  Task.create({
    name: req.body.name,
    projectId: req.body.projectId,
  }).then((result) => {
    res.json(result);
    // res.send('Task Added');
  }).catch((err) => {
    throw err;
  });
};

taskController.toggleCompletion = (req, res, next) => {
  Task.findById(req.params.taskId)
    .then((task) => {
      task.update({
        completed : !task.completed
      }).then((result) => {
        next();
      })
    })
}
module.exports = taskController;
