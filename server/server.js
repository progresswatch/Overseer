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

const isDevelopment = process.env.NODE_ENV === 'development';

// add hot reload if in development
if (isDevelopment) {
  console.log('DEVELOPMENT MODE');
  console.log('HOTLOADING CHANGES');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true
    },
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

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
