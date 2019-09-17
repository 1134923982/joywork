var async = require('async');
var Project = require('../schemas/projects');
var User = require('../schemas/users');
var Team = require('../schemas/teams');


function addProject(projectData, callback) {
    var project = new Project({
        project_name: projectData.project_name,
        owner: projectData.owner._id,
        desc: projectData.desc,
        team: projectData.team._id,
        begin_time: projectData.begin_time,
        end_time: projectData.end_time,
        update_by: projectData.update_by,
    });
    project.save(function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            Team.findOne({_id: projectData.team._id}, function (err, team) {
                if(err){
                    callback(err, null);
                }
                if(team.owner != projectData.owner._id && team.members.indexOf(projectData.owner._id)<0){
                    team.members.push(projectData.owner._id);
                    team.save();
                }
            });
            callback(null, {add: true})
        }
    })
}function updateProject(projectData, callback) {
    var condition = {
        _id: projectData._id
    }
    var update ={
        project_name: projectData.project_name,
        owner: projectData.owner._id,
        desc: projectData.desc,
        team: projectData.team._id,
        begin_time: projectData.begin_time,
        end_time: projectData.end_time,
        update_by: projectData.update_by,
        update_time: new Date(),
    };
    //console.log('.....'+new DateLocaleProvider())
    Project.findOneAndUpdate(condition, update, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            Team.findOne({_id: projectData.team._id}, function (err, team) {
                if(err){
                    callback(err, null);
                }
                if(team.owner != projectData.owner._id && team.members.indexOf(projectData.owner._id)<0){
                    team.members.push(projectData.owner._id);
                    console.log(team.members)
                    team.save();
                }
                callback(null, result);
            });

        }
    })
}



function deleteProject(id, callback) {
    Project.deleteOne({'_id':id},function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

function getAllProject(id, currentPage, pageTotal, currentTeams, callback) {
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
    Team.find(condition, function (err, teams) {
        if (err) {
            callback(err, null);
        }
        var projects = [];
        teams.forEach(function (item) {
            projects.push(item._id);
        });
        var projectCondition = {};
        if(currentTeams.length===1 && currentTeams[0] === ''){
            projectCondition = {
                $or: [
                    {'owner': id},
                    {'members': {$in: [id]}},
                    {'team': {$in: projects}},
                ]
            }
        }else {
            projectCondition = {'team': {$in: projects}};
        }

        Project.find(projectCondition, null, {skip: (currentPage-1)*pageTotal, limit: pageTotal}, function (err, projects) {
            if (err) {
                callback(err, null);
            } else {
                async.eachSeries(projects, function (project, cb) {
                    User.findOne({'_id': project.owner}, function (err, user) {
                        if (!err) {
                            project.owner = JSON.stringify(user);
                        }
                        cb(err);
                    });
                }, function (err) {
                    if(err){
                        console.log(err);
                        callback(err, null);
                    }else {
                        async.eachSeries(projects, function (project, cb) {
                            Team.findOne({'_id': project.team}, function (err, team) {
                                if (!err) {
                                    project.team = JSON.stringify(team);
                                }
                                cb(err);
                            });
                        }, function (err) {
                            if(err){
                                console.log(err);
                                callback(err, null);
                            }else {
                                callback(null, projects);
                            }
                        })
                        // callback(null, projects);
                    }
                })
            }
        })

    });

}

function getProjectsForTeam(team_id, callback) {
    Project.find({team: team_id}, function (err, projects) {
        if(err){
            callback(err,null);
        }else {
            callback(null, projects);
        }
    })
}

function getProjectsSum(id,currentTeams, callback){
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
    console.log(condition)
    Team.find(condition, function (err, teams) {
        if (err) {
            callback(err, null);
        }
        var projects = [];
        teams.forEach(function (item) {
            projects.push(item._id);
        });
        var projectCondition = {};
        if (currentTeams.length === 1 && currentTeams[0] === '') {
            projectCondition = {
                $or: [
                    {'owner': id},
                    {'members': {$in: [id]}},
                    {'team': {$in: projects}},
                ]
            }
        } else {
            projectCondition = {'team': {$in: projects}};
        }

        Project.count(projectCondition, function (err, count) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, count);
            }
        });
    })

}


module.exports = {
    addProject: addProject,
    getAllProject: getAllProject,
    deleteProject: deleteProject,
    updateProject: updateProject,
    getProjectsSum: getProjectsSum,
    getProjectsForTeam: getProjectsForTeam,
};