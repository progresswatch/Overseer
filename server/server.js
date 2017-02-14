const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const userController = require('./controller/userController');
const passportSetup = require('./passportSetup');
const router = require('./router')(express);
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use(session({
  secret: 'overseerRTK',
  resave: false,
  saveUninitialized: false,
}));

passportSetup(app);

// add session
// add cookierparser

app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => {
  console.log('Port is listening!');
});

module.exports = app;
