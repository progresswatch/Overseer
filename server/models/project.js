const db = require('../db/connection');

const {Sequelize, sequelize} = db;

const Project = sequelize.define('project', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    percentProgress: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    // creator: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
});

module.exports = Project;