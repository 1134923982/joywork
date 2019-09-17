var express = require('express');
var router = express.Router();
var userManager = require('../models/user_manager')

var responseData;

router.use(function (req, res, next) {
    responseData = {}
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/search', function(req, res, next) {
    var query = req.query.keyword;
    userManager.searchUsers(query, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.users = result;
            res.json(responseData);
            return;
        }
    });
});

router.get('/list', function(req, res, next) {
    userManager.getAllUsers(function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.users = result;
            res.json(responseData);
            return;
        }
    });
});

router.post('/register', function(req, res, next) {
  var userdata = req.body.userdata;
  userManager.registerUser(userdata, function (err, result) {
      if(err){
          responseData.code = 2;
          responseData.message = '注册失败';
          res.json(responseData);
          return;
      }
      if(result.repeatEmail){
          responseData.code = 1;
          responseData.message = '邮箱已被人注册过';
          res.json(responseData);
          return;
      }
      responseData.code = 0;
      responseData.message = '注册成功，请'
      res.json(responseData);
  })
});


router.put('/update', function(req, res, next) {
    var userdata = req.body.userdata;
    userManager.updateUser(userdata, function (err, result) {
        if(err){
            responseData.code = 1;
            responseData.message = '修改个人资料失败';
            res.json(responseData);
            return;
        }

        responseData.code = 0;
        responseData.message = '修改个人资料成功';

        req.session.username = userdata.username;
        req.session.sex = userdata.sex;
        console.log(req.session.sex)
        var userInfo = {username: req.session.username, email: req.session.email, _id: req.session._id, sex: req.session.sex, login: true};
        res.cookie('userInfo', JSON.stringify(userInfo), { domain: ''});
        res.json(responseData);
    })
});

router.put('/change_password', function(req, res, next) {
    var userdata = req.body.userdata;
    if(userdata.oldPassword !== req.session.password){
        responseData.code = 2;
        responseData.message = '原密码错误';
        res.json(responseData);
        return;
    }
    userManager.updatePassword(userdata, function (err, result) {
        if(err){
            responseData.code = 1;
            responseData.message = '修改密码失败';
            res.json(responseData);
            return;
        }

        responseData.code = 0;
        responseData.message = '修改密码成功';

        req.session.username = userdata.username;
        req.session.sex = userdata.sex;
        req.session.password = userdata.newPassword;
        console.log(req.session.sex)
        var userInfo = {username: req.session.username, email: req.session.email, _id: req.session._id, sex: req.session.sex, login: true};
        res.cookie('userInfo', JSON.stringify(userInfo), { domain: ''});
        res.json(responseData);
    })
});

router.post('/login', function (req, res) {
    userManager.userLogin(req.body.userdata, function (err, result) {
        if(err){
            return res.json({success: false, error: err});
        }
        if(result.login){
            responseData.message = '登录成功';
            responseData.code = 0;
            responseData.user = result.user;
            //res.cookie('userInfo', JSON.stringify(result.user), { domain: ''});

            console.log(result.user);
            req.session.login = true;
            req.session.email = result.user.email;
            req.session._id = result.user._id;
            req.session.username = result.user.username;
            req.session.password = result.user.password;
            req.session.sex = result.user.sex;
            var userInfo = {username: req.session.username, email: req.session.email,sex: req.session.sex, _id: req.session._id, login: true};
            res.cookie('userInfo', JSON.stringify(userInfo), { domain: ''});
            res.json(responseData);
        } else {
            responseData.code = 1;
            responseData.message = '用户名或密码错误，登录失败';
            res.json(responseData);
        }
    })
});

router.post('/loginout', function (req, res) {

    if (req.session.login = true) {0
        req.session.login = false;
        req.session.email = '';
        req.session.username = '';
        res.clearCookie('userInfo');
        res.json(responseData);
    }
});

module.exports = router;
