var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//we put all utilities in utils folder, for example, config, logging
var libutils = require('./utils');
var logger = libutils.logging().getLogger('app.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var dcRouter = require('./routes/dataCacheRouter');
var api = require('./routes/api');
var app = express();

// using the config util to load the cascading configuration (see utils/config.js for priority order)
var cfgUtil = libutils.config();
var nconf = cfgUtil();
process.env.CDB_URL = nconf.get("CDB_URL");

// Create the DataCache client
var DCClient = libutils.wxs();
if (nconf.get("DC_CLT")) {
  app.locals.dcClt = new DCClient(nconf.get("DC_CLT"));
}else{
  logger.warn("cannot get Elastic Cache service instance credentials.");
}

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : app.get('env');
var env = global.env = process.env.NODE_ENV;
logger.info(process.env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// serve index and view partials
// data cache api
app.use(dcRouter);
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/api/name', api.name);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  logger.info('server started, listen on port %d', server.address().port);
});

module.exports = app;