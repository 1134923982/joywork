var mongoose = require('mongoose');

//用户表结构
var ListSchema = new mongoose.Schema({
    //用户名0100
    list_name: String,
    kanban_id: String,
    order: Number,
    task_orders: [String],
    create_time: { type: Date, default: Date.now },
    create_by: String,
    update_time: { type: Date, default: Date.now },
    update_by: String,
})
module.exports = mongoose.model('List', ListSchema);