
function changeUTCTimeToLocalTime(UTCDateString){
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = UTCDateString.indexOf('T');
    var Z_pos = UTCDateString.indexOf('Z');
    var year_month_day = UTCDateString.substr(0,T_pos);
    var hour_minute_second = UTCDateString.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    var timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp/1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60;

    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString();
    return beijing_datetime; // 2017-03-31 16:02:06
}


//合并两个数组，去重
var concat_ = function(arr1,arr2){
    //不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
    var arr = arr1.concat();
    //或者使用slice()复制，var arr = arr1.slice(0)
    for(var i=0;i<arr2.length;i++){
        arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
    }
    return arr;
}

module.exports = {
    changeUTCTimeToLocalTime: changeUTCTimeToLocalTime,
    concat_: concat_,
}