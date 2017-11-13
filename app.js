var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./config');

var index = require('./routes/index');
var register = require('./routes/register');
var upload = require('./routes/upload');
var profile = require('./routes/profile');
var duty = require('./routes/duty');
var login = require('./routes/auth/login');
var logout = require('./routes/auth/logout');
var admin = require('./routes/admin/index');
var createCenter = require('./routes/admin/create');
var location = require('./routes/admin/location');
var schedule = require('./routes/admin/schedule');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false }));

// app.use(express.bodyParser({uploadDir: '/home/pd/tempDir'}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.secret,
    key: config.key,
    resave: true,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/profile', profile);
app.use('/create', createCenter);
app.use('/location', location);
app.use('/upload', upload);
app.use('/schedule', schedule);
app.use('/duty', duty);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
