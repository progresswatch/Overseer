const Models = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync('password', salt);

  const newUser = {
    firstName: 'Joseph',
    lastName: 'Vu',
    email: 'jvu009@gmail.com',
    username: 'jvu009',
    password: hash,
    salt,
  };

  Models.User.create(newUser)
    .then((user) => {
      return Models.Project.create({
        name: 'First Project',
        userId: user.id,
      });
    })
    .then((project) => {
      return Models.Task.create({
        name: `First task for project: ${project.name}`,
      });
    })
    .then((task) => {
      console.log('DB SEEDED');
    });
};
