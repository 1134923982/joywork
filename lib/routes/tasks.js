var express = require('express');
var router = express.Router();
var taskManager = require('../models/task_manager')

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
    var taskData = req.body.taskData;
    taskData.create_by = req.session._id;
    taskData.update_by = req.session._id;
    taskManager.addTask(taskData, function (err, result) {
        if (err) {
            responseData.message = '添加失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '添加成功';
            responseData.code = 0;
            responseData.task = result;
            res.json(responseData);
        }
    })
});

router.get('/sum', function (req, res, next) {
    var id = req.session._id;
    var currentTeams = req.query.currentTeams.split(',');
    taskManager.getAllTasksSum(id, currentTeams, function (err, result) {
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
    taskManager.deleteTask(id, function (err, result) {
        if (err) {
            responseData.message = '删除失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '删除成功';
            responseData.code = 0;
            res.json(responseData);
        }
    });
})

router.get('/list', function(req, res, next) {
    var id = req.query.id;
    console.log(id);
    taskManager.getAllTasks(id, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.taskList = result;
            responseData.message = '查询成功';
            responseData.code = 0;
            res.json(responseData);
            return;
        }
    });
});

router.get('/list_table', function(req, res, next) {
    var id = req.session._id;
    var currentPage = req.query.currentPage;
    var pageTotal = req.query.pageTotal;
    var currentTeams = req.query.currentTeams.split(',');
    taskManager.getAllTasksForTable(id, currentPage, pageTotal, currentTeams, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.tasks = result;
            responseData.message = '查询成功';
            responseData.code = 0;
            console.log(result)
            res.json(responseData);
            return;
        }
    });
});

router.put('/update', function (req, res, next) {
    var taskData = req.body.taskData;

    taskData.update_by = req.session._id;
    taskManager.updateTask(taskData, function (err, result) {
        if(err){
            responseData.message = '修改失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '修改成功';
            responseData.code = 0;
            res.json(responseData);
            return;
        }
    })
})




module.exports = router;
