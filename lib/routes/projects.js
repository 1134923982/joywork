var express = require('express');
var router = express.Router();
var projectManager = require('../models/project_manager')

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
    var projectData = req.body.projectdata;
    projectData.update_by = req.session._id;
    projectData.create_by = req.session._id;
    console.log(projectData)
    projectManager.addProject(projectData, function (err, result) {
        if (err) {
            responseData.message = '添加失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '添加成功';
            responseData.code = 0;
            res.json(responseData);
        }
    })
});

router.put('/update', function (req, res, next) {
    var projectData = req.body.projectdata;
    projectData.update_by = req.session._id;
    projectManager.updateProject(projectData, function (err, result) {
        if (err) {
            responseData.message = '修改失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '修改成功';
            responseData.code = 0;
            res.json(responseData);
        }
    })
});

router.get('/sum', function (req, res, next) {
    var id = req.session._id;
    var currentTeams = req.query.currentTeams.split(',');
    console.log(1111)
    console.log(currentTeams)
    projectManager.getProjectsSum(id, currentTeams, function (err, result) {
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

router.delete('/delete', function (req, res, next) {
    var id = req.body.id;
    projectManager.deleteProject(id, function (err, result) {
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

router.get('/list', function(req, res, next) {
    var id = req.session._id;
    var currentPage = req.query.currentPage;
    var pageTotal = req.query.pageTotal;
    var currentTeams = req.query.currentTeams.split(',');

    projectManager.getAllProject(id, currentPage, pageTotal, currentTeams, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.projects = result;
            res.json(responseData);
            return;
        }
    });
});

router.get('/list_team', function(req, res, next) {
    var team_id = req.query.team_id;
    projectManager.getProjectsForTeam(team_id, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.projects = result;
            res.json(responseData);
            return;
        }
    });
});




module.exports = router;
