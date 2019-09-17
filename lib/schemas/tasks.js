var mongoose = require('mongoose');

//用户表结构
var TaskSchema = new mongoose.Schema({
    //用户名
    task_name: String,
    owner: String,
    project_id:  {type: String, default: null },
    kanban_id: String,
    list_id: String,
    desc: String,
    label: { type: String, default: null },
    begin_time: { type: Date, default: null },
    end_time: { type: Date, default: null },
    create_time: { type: Date, default: Date.now },
    create_by: String,
    update_time: { type: Date, default: Date.now },
    update_by: String,
})
module.exports = mongoose.model('Task', TaskSchema);