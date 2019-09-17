var async = require('async');
var Task = require('../schemas/tasks');
var User = require('../schemas/users');
var Project = require('../schemas/projects');
var Team = require('../schemas/teams');
var Util = require('../util/util');
function addTask(taskData, callback) {
    console.log(taskData)
    var task = new Task({
        task_name: taskData.task_name,
        owner: taskData.owner,
        project_id: taskData.project._id,
        kanban_id: taskData.kanban_id,
        list_id: taskData.list_id,
        desc: taskData.desc,
        label: taskData.label,
        begin_time: taskData.begin_time,
        end_time: taskData.end_time,
        create_time: new Date(),
        create_by: taskData.create_by,
        update_time: new Date(),
        update_by: taskData.update_by,
    });
    task.save(function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

function updateTask(taskData, callback) {
    var update = {
        task_name: taskData.task_name,
        owner: taskData.owner._id,
        project_id: taskData.project?taskData.project._id:null,
        kanban_id: taskData.kanban_id,
        list_id: taskData.list_id,
        desc: taskData.desc,
        label: taskData.label,
        begin_time: taskData.begin_time,
        end_time: taskData.end_time,
        update_time: new Date(),
        update_by: taskData.update_by,
    }
    Task.update({'_id': taskData._id},{$set: update}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            if (taskData.project_id) {
                Project.findOne({_id: taskData.project_id}, function (err, project) {
                    for (var i = 0; i < project.members.length; i++) {
                        if (project.members[i] === taskData.owner._id) {
                            break;
                        }
                        if (i === project.members.length - 1) {
                            project.members.push(taskData.owner._id);
                            project.save();
                        }
                    }
                })
            }
            callback(null, result);
        }
    })
}

function getAllTasks(id, callback){
    Task.find({'kanban_id': id}, function (err, tasks) {
        if(err){
            console.log(err);
            callback(err, null);
        }else {
            async.eachSeries(tasks, function (task, cb) {
                User.findOne({'_id': task.owner}, function (err, user) {
                    if (!err) {
                        task.owner = JSON.stringify(user);
                    }
                    cb(err);
                });
            }, function (err) {
                if(err){
                    console.log(err);
                    callback(err, null);
                }else {
                    callback(null, tasks);
                }
            })
        }
    });
}

function getAllTaskForList(id, callback){
    Task.find({'_id': id}, function (err, result) {
        if(err){
            console.log(err);
            callback(err, null);
        }else {
            callback(null, result);
        }
    });
}

function deleteTask(id, callback){
    Task.deleteOne({'_id':id},function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

function getAllTasksForTable(id, currentPage, pageTotal,currentTeams,callback) {
    var condition = {};
    if(currentTeams.length===1 && currentTeams[0] === ''){
        condition = {
            $or: [
                {'owner': id},
                {'members': {$in: [id]}}
            ]
        }
    }else {
        condition = {
            '_id': {$in: currentTeams}
        }
    }
    Team.find(condition,function (err,teams) {
        if(err){
            callback(err,null);
        } else {
            var allProjects = [];
            async.eachSeries(teams, function (team, cb) {
                console.log(team.team_name)
                Project.find({'team': team._id}, function (err,projects) {
                    if(!err){
                        projects.forEach(function (item) {
                            console.log(item.project_name)
                            allProjects.push(item._id);
                        });
                    }
                    cb(err);
                });
            },function (err) {
                if(err){
                    callback(err, null);
                }else {
                    console.log(11111)
                    console.log(allProjects)
                    Task.find({'project_id': {$in: allProjects}}, null, {skip: (currentPage-1)*pageTotal, limit: pageTotal}, function (err, tasks) {
                        if(err){
                            callback(err,null);
                        }else {
                            var taskList = [];
                            async.eachSeries(tasks, function(task, cb){
                                Project.findOne({_id: task.project_id}, function (err, result) {
                                    if(!err){
                                        var t = JSON.parse(JSON.stringify(task));
                                        t.project = JSON.stringify(result)
                                        User.findOne({_id: task.owner},{_id:1, username: 1, email: 1}, function (err, user) {
                                            if(!err)
                                                t.owner = JSON.stringify(user);
                                            taskList.push(t);
                                            cb(err);
                                        })
                                    }
                                })
                            },function (err) {
                                if(err){
                                    callback(err, null);
                                }else {
                                    callback(null, taskList);
                                }
                            })
                            //callback(null,tasks);
                        }
                    })
                }
            })
        }
    })
}

function getAllTasksSum(id,currentTeams, callback) {
    var condition = {};
    if(currentTeams.length===1 && currentTeams[0] === ''){
        condition = {
            $or: [
                {'owner': id},
                {'members': {$in: [id]}}
            ]
        }
    }else {
        condition = {
            '_id': {$in: currentTeams}
        }
    }
    Team.find(condition,function (err,teams) {
        if(err){
            callback(err,null);
        } else {
            var allProjects = [];
            async.eachSeries(teams, function (team, cb) {
                Project.find({'team': team._id}, function (err,projects) {
                    if(!err){
                        projects.forEach(function (item) {
                            allProjects.push(item._id);
                        });
                    }
                    cb(err);
                });
            },function (err) {
                if(err){
                    callback(err, null);
                }else {
                    Task.count({'project_id': {$in: allProjects}}, function (err, count) {
                        if(err){
                            callback(err,null);
                        }else {
                            callback(null,count);
                        }
                    })
                }
            })
        }
    })
}


module.exports = {
    addTask: addTask,
    getAllTaskForList: getAllTaskForList,
    getAllTasksForTable: getAllTasksForTable,
    getAllTasks: getAllTasks,
    getAllTasksSum: getAllTasksSum,
    updateTask: updateTask,
    deleteTask: deleteTask,
};