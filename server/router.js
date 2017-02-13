const passport = require('passport');
const userController = require('./controller/userController');
const seed = require('./db/seed');

module.exports = function(express) {
    const router = express.Router();
    const isAuthenticated = function(req, res, next) {
        // where is this middlewear being used? what is it going next to?
        if(req.isAuthenticated()) return next();
        // check these routes later
        else res.redirect('/');
    }

    router.post('/signup', userController.signup);

    // fix all of these routes
    router.post('/', passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/rawr',
        // failureFlash: true
    }));

    router.get('/seed', (req, res) => {
      seed();
      res.send('seeded database');
    });

    return router;

}
