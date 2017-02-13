const passport = require('passport');
const userController = require('./controller/userController');

module.exports = function(express) {
    const router = express.Router();
    const isAuthenticated = function(req, res, next) {
        // where is this middlewear being used? what is it going next to?
        if(req.isAuthenticated()) return next();
        // check these routes later
        else res.redirect('/');
    }

    router.get('/signup', userController.show);

    router.post('/signup', userController.signup);
    
    // fix all of these routes
    router.post('/', passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/rawr',
        // failureFlash: true
    }))

    // fix routes
    router.get('/', function(req, res) {
        // we dont have a home
        res.render('home');
    })

    router.get('/dashboard', isAuthenticated, function(req, res) {
        // no dashboard
        res.render('dashboard');
    })

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })
    
    return router;

}