/**
 * 应用程序接口文件
 * */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var Cookies = require('cookies');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./lib/routes/index');
var usersRouter = require('./lib/routes/users');
var projectRouter = require('./lib/routes/projects');
var kanbanRouter = require('./lib/routes/kanban');
var listRouter = require('./lib/routes/lists');
var taskRouter = require('./lib/routes/tasks');
var teamRouter = require('./lib/routes/teams');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

//bodyparse设置
app.use( bodyParser.urlencoded({extended: true}));

//设置session, 在服务器未重启，登录状态保持七天
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 25200000 }
}));

//cookie设置
app.use(function (req,res, next) {
    //解析登录用户cookies
    console.log('登录状态：'+req.session.login);
    if(req.session.login){
        console.log(req.session.username+' you already login');
        userInfo = {username: req.session.username, email: req.session.email, _id: req.session._id, sex: req.session.sex, login: true};
        res.cookie('userInfo', JSON.stringify(userInfo), { domain: ''});
        //console.log('you username:'+req.session.username);
    }else{
        res.clearCookie('userInfo');
        console.log('you are logout');
    }
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/kanban', kanbanRouter);
app.use('/list', listRouter);
app.use('/tasks', taskRouter);
app.use('/teams', teamRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
