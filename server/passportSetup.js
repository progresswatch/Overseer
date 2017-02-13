const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('./db/userModel');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function(username, password, done) {
            userModel.findOne({
                where: {
                    // fix username not in model yet. adopt attributes later
                    'username': username
                }
            }).then(function(user) {
                if(user === null) {
                    return done(null, false, { message: 'Incorrect credentials.' })
                }
                // don't forget to generate salt and have salt property on user
                const hashedPassword = bcrypt.hashSync(password, user.salt);
                console.log('password', password);
                console.log('salt', user.salt);

                console.log('user password', user.password);
                console.log('hashedPassword', hashedPassword);

                if(user.password === hashedPassword) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Incorrect credentials.' })
            })
        }
    ));

    passport.serializeUser(function(user, done) {
        // console.log('serializeUser: ', user._id);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        userModel.findOne({
            where: {
                // we need to check this too.
                'id': id
            }
        }).then(function(user) {
            if(user === null) {
                done(new Error('Wron user id.'))
            }
            done(null, user);
        }).catch((err) => {
            console.log('rawr');
        })
    })
}