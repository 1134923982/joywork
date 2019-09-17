var mongoose = require('mongoose');

//用户表结构
var TeamSchema = new mongoose.Schema({
    //用户名
    team_name: String,
    members: [String],
    owner: String,
    desc: String,
    create_time: { type: Date, default: Date.now },
    create_by: String,
    delete: {type: Boolean, default: false},
})
module.exports = mongoose.model('Team', TeamSchema);