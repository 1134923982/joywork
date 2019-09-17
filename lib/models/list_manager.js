var async = require('async');
var List = require('../schemas/lists');

function addList(listDate, callback){
    var list = new List({
        list_name: listDate.list_name,
        kanban_id: listDate.kanban_id,
        task_orders: listDate.task_orders,
        order: listDate.order,
        create_time: new Date().toLocaleString(),
        create_by: listDate.create_by,
        update_time: new Date().toLocaleString(),
        update_by: listDate.update_by,
    });
    list.save(function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    });
}

function getAllList(id, callback) {
    List.find({
        'kanban_id': id
    }).sort({'order': 1}).exec(function (err, lists) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, lists);
        }
    });
}

function updateList(listDate, callback){
    var update = {
        list_name: listDate.list_name,
        order: listDate.order,
        task_orders: listDate.task_orders,
        update_time: new Date().toLocaleString(),
        update_by: listDate.update_by,
    };
    List.update({'_id': listDate._id}, {$set: update}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

function updateLists(listDate, callback){
    async.eachSeries(listDate, function (list, cb) {
        updateList(list, function (err, result) {
            cb(err);
        })
    }, function (err) {
        if(err){
            console.log(err);
            callback(err, null);
        }else {
            callback(null, {'update': true});
        }
    })
}

module.exports = {
    addList: addList,
    getAllList: getAllList,
    updateList: updateList,
    updateLists: updateLists,
};