const db = require('../db/connection');

const { Sequelize, sequelize } = db;

const Models = {};

Models.User = require('./user');

sequelize.sync();

module.exports = Models;
