const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const userController = require('./controller/userController');
const passportSetup = require('./passportSetup');
const router = require('./router')(express);
const session = require('express-session');
// const cookieParser = require('cookie-parser');

const app = express();


// app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( {extended: true }));

app.use(session({
  secret: 'overseerRTK',
  resave: false,
  saveUninitialized: false,
}));
// app.get('/checkLoggedIn', (req, res) => {
//     // console.log(req.session)
//   console.log('cookies',req.cookies);
//   console.log(req.session, Date.now());
//   if (req.session.isLoggedIn) return res.send(true);
//   res.send(false);
// })
passportSetup(app);

// add session
// add cookierparser

app.use('/', router);
app.use(express.static(path.join(__dirname, '..', 'client')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => {
  console.log('Port is listening!');
});

module.exports = app;
