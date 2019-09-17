var async = require('async');
var Kanban = require('../schemas/kanban');
var Project = require('../schemas/projects');
var Team = require('../schemas/teams');

function addKanban(kanbanData, callback) {
    var projects = [];
    kanbanData.projects.forEach(function (item) {
       projects.push(item._id);
    });
    kanbanData.projects = projects;
    console.log(kanbanData)
    var kanban = new Kanban({
        kanban_name: kanbanData.kanban_name,
        owner: kanbanData.owner,
        background_color: kanbanData.background_color,
        team: kanbanData.team._id,
        projects: kanbanData.projects,
        shared: kanbanData.shared,
        create_time: new Date(),
        create_by: kanbanData.create_by,
    });
    console.log(111)
    kanban.save(function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, {add: true})
        }
    })
}

function deleteKanban(id, callback) {
    Kanban.deleteOne({'_id': id}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

function getAllKanbans(id, callback) {
    Team.find({'members': {$in: [id]}}, function (err, teams) {
        if(err){
            callback(err, null);
        }
        //console.log(teams);
        var team_id = [];
        teams.forEach(function (item) {
            team_id.push(item.id)
        })
        console.log(team_id);
        Kanban.find({
            $or: [
                {'create_by': id},
                {'team': {$in: team_id}}
            ]
        }, function (err, kanbans) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, kanbans);
            }
        })
    })
    // Kanban.find({
    //     'create_by': id
    // }, function (err, kanbans) {
    //     if (err) {
    //         callback(err, null);
    //     } else {
    //         callback(null, kanbans);
    //     }
    // })
}

function getKanban(id, callback) {
    Kanban.findOne({
        '_id': id
    }, function (err, kanban) {
        if (err) {
            callback(err, null);
        } else {
            var result = [];

            async.eachSeries(kanban.projects, function (project, cb) {
                Project.findOne({'_id': project}, function (err, p) {
                    if (!err) {
                        project = JSON.stringify(p);
                        result.push(project)
                    }
                    cb(err);
                });
            }, function (err) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    kanban.projects = result;
                    if(kanban.team){
                        Team.findOne({'_id': kanban.team}, function (err, result) {
                            kanban.team = JSON.stringify(result);
                            callback(null, kanban);
                        })
                    }else {
                        callback(null, kanban);
                    }
                }
            })

        }
    })
}

function updateKanban(query, doc, callback) {
    Kanban.update(query, {$set: doc}, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

module.exports = {
    addKanban: addKanban,
    getAllKanbans: getAllKanbans,
    deleteKanban: deleteKanban,
    getKanban: getKanban,
    updateKanban: updateKanban,
};