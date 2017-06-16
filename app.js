const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const fileUtils = require('./util/file-util');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// adding services to DI service
const di = require('./services/di');
di.add('db', require('./services/database'));

// autobinding routes inside routes file
const routesDir = './routes';
const routerService = require('./services/router');

fs.readdirSync(routesDir).forEach(file => {
  const routeName = fileUtils.removeFileExtension(file);
  const routes = require('./' + path.join(routesDir, file));
  
  console.log('Registering /' + routeName);

  // Injecting the dependencies
  routes.services = di.services();
  
  // Registering
  routerService.registerRoutes(app, '/'+routeName, routes);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  res.status(404);
  res.send('Oops!');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Internal Error');
});

console.log('App is ready!')

module.exports = app;
