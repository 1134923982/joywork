var mongoose = require('mongoose');

//用户表结构
var UserSchema = new mongoose.Schema({
    //用户名
    username: String,
    password: String,
    role: { type: Number, default: 0 },
    create_time: { type: Date, default: Date.now },
    sex: String,
    email: String,
    delete: {type: Boolean, default: false},
})
module.exports = mongoose.model('User', UserSchema);