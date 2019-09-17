var express = require('express');
var router = express.Router();
var listManager = require('../models/list_manager');
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
    var listData = req.body.listData;
    listData.create_by = req.session._id;
    listData.update_by = req.session._id;

    listManager.addList(listData, function (err, result) {
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
    var id = req.query.id;
    listManager.getAllList(id, function (err, result) {
        if (err) {
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.message = '查询成功';
            responseData.code = 0;
            responseData.lists = result;
            res.json(responseData);
        }
    })
});
router.put('/update', function (req, res, next) {
    var listData = req.body.listData;
    listData.update_by = req.session._id;
    listManager.updateList(listData, function (err, result) {
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

router.put('/update_list', function (req, res, next) {
    var listData = req.body.listData;
    listData.forEach(function (item) {
        item.update_by =req.session._id;
    })
    listManager.updateLists(listData, function (err, result) {
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


module.exports = router;
