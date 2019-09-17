var mongoose = require('mongoose');

//用户表结构
var KanbanSchema = new mongoose.Schema({
    //用户名
    kanban_name: String,
    //owner: String,
    // owner_label: String,
    owner: String,
    background_color: String,
    projects: [String],
    team: { type: String, default: null },
    shared: { type: Boolean, default: false },
    create_time: { type: Date, default: Date.now },
    create_by: String,
    update_time: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Kanban', KanbanSchema);