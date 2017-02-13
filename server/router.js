const passport = require('passport');
const userController = require('./controller/userController');
const seed = require('./db/seed');
const projectController = require('./controller/projectController');
const taskController = require('./controller/taskController');

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

    router.get('/get_projects', projectController.getProjects);
    router.post('/add_project', projectController.addProject);

    router.get('/get_tasks', taskController.getTasks);
    router.post('/add_task', taskController.addTask);

    return router;

}
