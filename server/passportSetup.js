const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Models = require('./models');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function (username, password, done) {
      Models.User.findOne({
        where: {
          // fix username not in model yet. adopt attributes later
          'username': username
        }
      }).then(function (user) {
        if (user === null) {
          return done(null, false, { message: 'Incorrect Username' })
        }
        // don't forget to generate salt and have salt property on user
        const hashedPassword = bcrypt.hashSync(password, user.salt);

        if (user.password === hashedPassword) {
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect Password' })
      })
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Models.User.findOne({
      where: {
        // we need to check this too.
        'id': id
      }
    }).then(function (user) {
      if (user === null) {
        done(new Error('Wrong user id.'))
      }
      done(null, user);
    }).catch((err) => {
      console.log(err);
    })
  })
}
