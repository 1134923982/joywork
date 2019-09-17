var User = require('../schemas/users');

function registerUser(userdata, callback) {
    //检查邮箱是否注册过账号
    User.findOne({'email':userdata.email},function (err,userInfo) {
        if(err){
            callback(err,null)
        } else {
            if (userInfo) {
                callback(null,{repeatEmail: true})
            } else {
                var user = new User({
                    username: userdata.username,
                    password: userdata.password,
                    email: userdata.email,
                    sex: userdata.sex,
                });
                user.save(function (err, result) {
                    if(err){
                        callback(err,null)
                    } else {
                        callback(null,{register: true})
                    }
                });
            }
        }
    })
}

function userLogin(userdata, callback){
    User.findOne({'email':userdata.account, 'password': userdata.password},function (err,userInfo) {
        if(err){
            callback(err,null)
        } else {
            if (userInfo) {
                callback(null,{login: true, user: userInfo})
            } else {
                callback(null,{login: false});
            }
        }
    })
}

function searchUsers(query,callback) {
    User.find({
        $or: [
            {'email': {$regex:query,$options:"$i"}},
            {'username': {$regex:query,$options:"$i"}}
        ]
    }, function (err, users) {
        if(err){
            callback(err, null);
        }else{
            callback(null, users);
        }
    })
}

function getAllUsers(callback){
    User.find({},{_id:1, username: 1, email: 1},function (err, users) {
        if(err){
            callback(err, null);
        }else{
            callback(null, users);
        }
    })
}

function updateUser(userdata, callback){
    console.log(userdata)
    var update = {
        username: userdata.username,
        // email: userdata.email,
        sex: userdata.sex
    }
    User.update({_id: userdata._id}, {$set: update}, function (err, result) {
        if(err){
            callback(err, null);
        }else {
            callback(null, result);
        }
    })
}

function updatePassword(userdata, callback){
    var update = {
        password: userdata.newPassword,
    }
    User.update({_id: userdata._id}, {$set: update}, function (err, result) {
        if(err){
            callback(err, null);
        }else {
            callback(null, result);
        }
    })
}

module.exports = {
    registerUser: registerUser,
    userLogin: userLogin,
    updateUser: updateUser,
    searchUsers: searchUsers,
    getAllUsers: getAllUsers,
    updatePassword: updatePassword,
};