const Sequelize = require('sequelize');

const db = {};

<<<<<<< HEAD
const sequelize = new Sequelize('progresswatch', 'admin', 'password', {
=======
const sequelize = new Sequelize('progresswatch', 'shahrodkhalkhali', 'password', {
>>>>>>> 4bf0046f4935899a01ee55dbd607baf1b14cc808
    host: 'localhost',
    dialect: 'postgres',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
