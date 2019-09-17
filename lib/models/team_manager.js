var Team = require('../schemas/teams');
var async = require('async');
var User = require('../schemas/users');

function addTeam(teamData, callback) {
    var team = new Team({
        team_name: teamData.team_name,
        owner: teamData.owner || teamData.create_by,
        members: teamData.members,
        desc: teamData.desc,
        create_by: teamData.create_by,
    });
    team.save(function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

function updateTeam(teamData, callback) {
    var update = {
        team_name: teamData.team_name,
        owner: teamData.owner,
        members: teamData.members,
        desc: teamData.desc,
    }
    Team.update({_id: teamData._id}, update, function (err, result) {
        if(err){
            callback(err, null);
        }else{
            callback(null, result);
        }
    })
}

function getTeamsSum(id,callback) {
    Team.count({
        $or: [
            {'owner': id},
            {'members': {$in: [id]}}
        ]
    }, function (err, count) {
        if(err){
            callback(err, null);
        }else{
            callback(null, count);
        }
    });
}

function getAllTeam(id, currentPage, pageTotal, callback) {
    Team.find({
            $or: [
                {'owner': id},
                {'members': {$in: [id]}}
            ]
        }, null, {skip: (currentPage-1)*pageTotal, limit: pageTotal}, function (err, teams) {
            if (err) {
                callback(err, null);
            } else {
                async.eachSeries(teams, function (team, cb) {
                    var members = [];
                    async.eachSeries(team.members, function (member, cb1) {

                        User.findOne({'_id': member}, {_id: 1, username: 1, email: 1}, function (err, user) {
                            if (!err) {
                                // member = JSON.stringify(user);
                                members.push(JSON.stringify(user))
                            }
                            cb1(err);
                        });
                    }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        team.members=members;
                        cb(err);
                    });
                }, function (err) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else {
                        callback(null, teams);
                    }
                })


            }
        }
    );
}

function deleteTeam(id, callback) {
    Team.deleteOne({'_id':id},function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

function searchTeams(query, callback){
    Team.find({
        'team_name': {$regex:query,$options:"$i"}
    }, function (err, teams) {
        if(err){
            callback(err, null);
        }else{
            callback(null, teams);
        }
    })
}

module.exports = {
    addTeam: addTeam,
    getAllTeam: getAllTeam,
    updateTeam: updateTeam,
    getTeamsSum: getTeamsSum,
    deleteTeam: deleteTeam,
    searchTeams: searchTeams,

};