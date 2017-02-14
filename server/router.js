const passport = require('passport');
const userController = require('./controller/userController');
const seed = require('./db/seed');
const projectController = require('./controller/projectController');
const taskController = require('./controller/taskController');
const session = require('express-session');

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
    // router.post('/', passport.authenticate('local',{
    //     successRedirect: '/dashboard',
    //     failureRedirect: '/rawr',
    //     // failureFlash: true
    // }));

    router.post('/', passport.authenticate('local'), (req, res) => {
        req.session.isLoggedIn = true;
        console.log('COOKIE',req.cookies)
        console.log(req.session, Date.now());
        res.json({
            userName: req.user.username,
        });
    });
    router.get('/a',  (req, res) => {
        if (req.session.isLoggedIn) {
            console.log(req.session);
            return res.json({some:'thing'});
        } console.log('SESSION?',req.session)
        req.session.isLoggedIn = true;
        res.json({other:'thing'});
    })

    router.get('/seed', (req, res) => {
      seed();
      res.send('seeded database');
    });

    router.get('/get_projects', projectController.getProjects);
    router.post('/add_project', projectController.addProject);

    router.get('/get_tasks/:id', taskController.getTasks);
    router.post('/add_task', taskController.addTask);

    return router;

}
