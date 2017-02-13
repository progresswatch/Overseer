const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const userController = require('./controller/userController');
const passportSetup = require('./passportSetup');
const router = require('./router')(express);
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded( {extended: true }));


app.use(session({ secret: 'overseerRTK' }));

passportSetup(app);

// add session
// add cookierparser

app.use('/', router);

app.listen(3000, () => {
  console.log('Port is listening!');
});

module.exports = app;
