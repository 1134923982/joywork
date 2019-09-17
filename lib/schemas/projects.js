var mongoose = require('mongoose');

//用户表结构
var ProjectSchema = new mongoose.Schema({
    //用户名
    project_name: String,
    owner: String,
    // owner_label: String,
    desc: String,
    members: [String],
    team: String,
    begin_time: { type: Date, default: null },
    end_time: { type: Date, default: null },
    create_time: { type: Date, default: Date.now },
    create_by: String,
    update_time: { type: Date, default: Date.now },
    update_by: String,
})
module.exports = mongoose.model('Project', ProjectSchema);