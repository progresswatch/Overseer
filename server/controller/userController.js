const userModel = require('../db/userModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.show = function(req, res) {

    // need a signup page
    // res.render('signup');
}

userController.signup = function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(username.length === 0 || password.length === 0 || firstName.length === 0 || lastName.length === 0 || email.length === 0) {
        res.status(404).end();
    } else {
        const salt = bcrypt.genSaltSync(10);
        console.log(password, salt);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            salt
        }
        userModel.create(newUser).then(function() {
            res.status(200).send();
        }).catch(function(error) {
            res.status(404).send();
        })
    }
}

module.exports = userController;

