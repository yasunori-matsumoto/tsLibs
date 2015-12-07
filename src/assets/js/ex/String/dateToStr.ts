DateToStr = (_date:string, _seperlator:string = '.'):string => {
  var _str = _date.getFullYear() + _seperlator + (_date.getMonth()+1) + _seperlator + _date.getDate();
  return _str;
}
export = DateToStr;