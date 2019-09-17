var express = require('express');
var router = express.Router();
var teamManager = require('../models/team_manager');
var util = require('../util/util')


var responseData;

router.use(function (req, res, next) {
    responseData = {}
    next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', function (req, res, next) {
    var teamData = req.body.teamData;
    teamData.create_by = req.session._id;

    teamManager.addTeam(teamData, function (err, result) {
        if (err) {
            responseData.message = '添加失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '添加成功';
            responseData.code = 0;
            res.json(responseData);
        }
    });
});
router.get('/list', function (req, res, next) {
    var id = req.session._id;
    var currentPage = req.query.currentPage;
    var pageTotal = req.query.pageTotal;
    teamManager.getAllTeam(id, currentPage, pageTotal, function (err, result) {
        if (err) {
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '查询成功';
            responseData.code = 0;
            responseData.teams = result;
            res.json(responseData);
        }
    })
});
router.get('/sum', function (req, res, next) {
    var id = req.session._id;
    teamManager.getTeamsSum(id, function (err, result) {
        if (err) {
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '查询成功';
            responseData.code = 0;
            responseData.count = result;
            res.json(responseData);
        }
    })
});

router.put('/update', function (req, res, next) {
    var teamData = req.body.teamData;
    teamManager.updateTeam(teamData, function (err, result) {
        if (err) {
            responseData.message = '修改失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '修改成功';
            responseData.code = 0;
            res.json(responseData);
        }
    });
});

router.delete('/delete', function (req, res, next) {
    var id = req.body.id;
    teamManager.deleteTeam(id, function (err, result) {
        if (err) {
            responseData.message = '删除失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '删除成功';
            responseData.code = 0;
            res.json(responseData);
        }
    })
})

router.get('/search', function(req, res, next) {
    var query = req.query.keyword;
    teamManager.searchTeams(query, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.teams = result;
            res.json(responseData);
            return;
        }
    });
});




module.exports = router;
