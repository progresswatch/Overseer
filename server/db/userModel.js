const Sequelize = require('sequelize');

const sequelize = new Sequelize('overseerUsers', 'overseer', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const OverseerUsers = sequelize.define('user', {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    salt: {
        type: Sequelize.STRING
    }
});

sequelize.sync();

module.exports = OverseerUsers;
