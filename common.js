function getDateStr(addDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  return m + "." + d;
};

function getDateStr_2(addDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  return y + "-" + m + "-" + d;
};
function getDate(time){
  let date = new Date(time);
  let y = date.getFullYear();
  let mouth = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = Number(date.getMinutes())<10 ? date.getMinutes() + '0' : date.getMinutes();
  let result = `${y}-${mouth}-${d} ${h}:${min}`;
  return result;
}

module.exports.getDateStr = getDateStr;
module.exports.getDateStr_2 = getDateStr_2;
module.exports.getDate = getDate;