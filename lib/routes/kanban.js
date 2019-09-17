var express = require('express');
var router = express.Router();
var kanbanManager = require('../models/kanban_manager');

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
    var kanbanData = req.body.kanbandata;
    kanbanData.create_by = req.session._id;
    kanbanData.owner = req.session._id;
    kanbanManager.addKanban(kanbanData, function (err, result) {
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

// router.put('/update', function (req, res, next) {
//     var kanbanData = req.body.kanbandata;
//     kanbanData.update_by = req.session._id;
//     console.log(kanbanData)
//     kanbanManager.updateProject(kanbanData, function (err, result) {
//         if (err) {
//             responseData.message = '修改失败';
//             responseData.code = 1;
//             res.json(responseData);
//         } else {
//             responseData.message = '修改成功';
//             responseData.code = 0;
//             res.json(responseData);
//         }
//     })
// });

router.delete('/delete', function (req, res, next) {
    var id = req.body.id;
    kanbanManager.deleteKanban(id, function (err, result) {
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
    kanbanManager.getAllKanbans(id, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.kanbanList = result;
            responseData.message = '查询成功';
            responseData.code = 0;
            res.json(responseData);
            return;
        }
    });
});

router.get('/kanban_detail', function(req, res, next) {
    var id = req.query.id;
    kanbanManager.getKanban(id, function (err, result) {
        if(err){
            responseData.message = '查询失败';
            responseData.code = 1;
            res.json(responseData);
        } else {
            responseData.kanban = result;
            responseData.message = '查询成功';
            responseData.code = 0;
            res.json(responseData);
            return;
        }
    });
});

router.put('/update', function (req, res, next) {
    var query = {'_id': req.body.id};
    var doc = req.body.doc;
    kanbanManager.updateKanban(query, doc, function (err, result) {
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
