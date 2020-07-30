var pu={
  testEmail:function(val){
    //验证邮箱
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (myreg.test(val)){
      return true
    }else{
      return false
    }
  },
  testIdcardReg:function(val){
    //身份证号验证
    var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if(idcardReg.test(val)) {
      return true
    }else{
      return false
    }
  },
  checkPhone:function(val){
    //手机号验证
    if((/^1[3456789]\d{9}$/.test(val))){
      return true;
    }else{
      return false
    }
  },
  getBirth:function(idCard){
    //读取身份证信息出生日期
    var birthday = "";
    if(idCard != null && idCard != ""){
      if(idCard.length == 15){
        birthday = "19"+idCard.slice(6,12);
      } else if(idCard.length == 18){
        birthday = idCard.slice(6,14);
      }
      birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
      //通过正则表达式来指定输出格式为:1990-01-01
    }
    return birthday;
  },
  getSex:function(idCard){
    //读取身份证信息性别
    var sexStr = '';
    if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
      //男
      sexStr = 1;
    }
    else {
      //女
      sexStr = 0;
    }
    return sexStr;
  },
  //计算倒计时
  showCountDown:function(year,month,date){
    var now=new Date();
    var endDate=new Date(year,month-1,date);
    var leftTime=endDate.getTime()-now.getTime();
    var leftsecond=parseInt(leftTime/1000);
    var day=Math.floor(leftsecond/(60*60*24));
    var hour=Math.floor((leftsecond-day*24*60*60)/3600);
    var minute=Math.floor((leftsecond-day*24*60*60-hour*3600)/60);
    var second=Math.floor(leftsecond-day*60*60*24-hour*60*60-minute*60);
    let _obj={
      y:day,
      h:hour,
      m:minute
    };
    return _obj

  },
  checkTime:function(i){
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },
  //时间大小对比
  timeRatioSize:function(beginTime,endTime){
    let _b=new Date(beginTime).getTime();
    let _e=new Date(endTime).getTime();
    if(_b<_e){
      return true
    }else{
      return false
    }
  },
};
export {pu};
