<!--<script src="../../router/index.js"></script>-->
<template>
    <div style="background: #f5f5f5" v-title data-title="新增活动">
        <div class="banner-box"></div>
        <div class="main-box">
            <!--基本信息-->
            <div class="content-box">
              <p class="title-txt">基本信息</p>
              <div class="input-list">
                <div class="left"><i>*</i>活动名称</div>
                <div class="right"><input v-model="formData.title" type="text" placeholder="请输入项目名称"/></div>
              </div>
              <div class="input-list">
                <div class="left"><i>*</i>团队账号</div>
                <div class="right"><input v-model="formData.teamUserName" type="text" placeholder="请输入团队账号"/></div>
              </div>
              <div class="input-list">
                <div class="left"><i>*</i>团队密码</div>
                <div class="right"><input v-model="formData.teamPassword" type="text" placeholder="请输入团队团队密码"/></div>
              </div>
              <div class="input-list" @click="clickFuwuduixiang">
                <div class="left"><i>*</i>服务对象</div>
                <div class="right right-selct"><input readonly v-model="formData.serviceTarget==''?'':formData.serviceTarget.split(',').length+'项'" type="text" placeholder="请选择服务对象"/></div>
              </div>
              <div class="input-list" @click="quyucunzhengSelct=true">
                <div class="left"><i>*</i>服务区域</div>
                <div class="right right-selct"><input v-model="orgIdName" readonly type="text" placeholder="请选择服务区域"/></div>
              </div>
              <div class="input-list" @click="mapStaus=true">
                <div class="left"><i>*</i>服务地点</div>
                <div class="right right-selct"><input v-model="formData.address" readonly type="text" placeholder="请选择服务地点"/></div>
              </div>
              <div class="input-list" @click="timeSelection('beginTime')">
                <div class="left"><i>*</i>活动开始时间</div>
                <div class="right right-selct"><input v-model="formData.beginTime" readonly type="text" placeholder="请选择活动开始时间"/></div>
              </div>
              <div class="input-list" @click="timeSelection('endTime')">
                <div class="left"><i>*</i>活动结束时间</div>
                <div class="right right-selct"><input v-model="formData.endTime" readonly type="text" placeholder="请选择活动结束时间"/></div>
              </div>
              <div class="input-list" @click="timeSelection('recruitTime')">
                <div class="left"><i>*</i>招募开始时间</div>
                <div class="right right-selct"><input v-model="formData.recruitTime" readonly type="text" placeholder="请选择招募开始时间"/></div>
              </div>
              <div class="input-list" @click="timeSelection('recruitEndTime')">
                <div class="left"><i>*</i>招募结束时间</div>
                <div class="right right-selct"><input v-model="formData.recruitEndTime" readonly type="text" placeholder="请选择招募结束时间"/></div>
              </div>
              <div class="input-list" @click="duoxuanState=true;duoxuanData=fuwuleibie;duoxuanjieshou='serviceType'">
                <div class="left"><i>*</i>服务类别</div>
                <div class="right right-selct"><input v-model="formData.serviceType==''?'':formData.serviceType.split(',').length+'项'" readonly type="text" placeholder="请选择服务类别"/></div>
              </div>
              <div class="input-list" @click="duoxuanState=true;duoxuanData=zhiyuanbaozhuang;duoxuanjieshou='volunteerSafeguard'">
                <div class="left"><i>*</i>志愿者保障</div>
                <div class="right right-selct"><input v-model="formData.volunteerSafeguard==''?'':formData.volunteerSafeguard.split(',').length+'项'" readonly type="text" placeholder="请选择志愿者保障"/></div>
              </div>
              <div class="textarea-list">
                <div class="top"><i>*</i>项目概述</div>
                <div class="bottom">
                  <textarea v-model="formData.contentDescription" placeholder="请输入活动内容"></textarea>
                </div>
              </div>
              <div class="file-box">
                <div class="top">上传图片</div>
                <ul class="bottom">
                  <li v-if="formData.posterUrl!=''" v-for="(item,i) in formData.posterUrl.split(',')" :key="item"><van-icon @click="deletImg(i+1)" class="cols-btn" name="cross"/><img :src="item"></li>
                  <li v-if="formData.posterUrl.split(',').length<3" class="file-btn">
                    <van-uploader accept="image/*" :after-read="fileUploadAll"/>
                  </li>
                </ul>
              </div>
              <div class="input-list" @click="clickSelct(-1)">
                <div class="left"><i>*</i>志愿者招募范围</div>
                <div class="right right-selct"><input v-model="formData.recruitTarget" readonly type="text" placeholder="请选择招募范围"/></div>
              </div>
              <div class="input-list">
                <div class="left"><i>*</i>服务要求人数</div>
                <div class="right"><input v-model="formData.targetNumber" type="number" placeholder="请输入服务要求人数"/></div>
              </div>
              <div class="input-list">
                <div class="left">报名前服务时长要求</div>
                <div class="right"><input v-model="formData.conditionHourNumber" type="number" placeholder="请输入时长(小时)"/></div>
              </div>
              <div class="input-list">
                <div class="left">不可同时报名ID</div>
                <div class="right"><input v-model="formData.differentTimeId" type="text" placeholder="请输入不可同时报名ID"/></div>
              </div>
              <div class="questions-list">
                <div class="top">报名提问</div>
                <div class="bottom"><input v-model="formData.registrationProblem" type="text" placeholder="请输入报名问题"/></div>
              </div>
            </div>
            <!--岗位信息-->
            <div class="content-box">
              <p class="title-txt">岗位信息</p>
              <div v-for="(item,i) in formData.stations" :key="i" style="margin-bottom: 0.2rem">
                <div class="input-list">
                  <div class="left">岗位名称</div>
                  <div class="right"><input v-model="item.stationName" type="text" placeholder="请输入岗位名称"/></div>
                </div>
                <div class="input-list">
                  <div class="left">岗位人数</div>
                  <div class="right"><input v-model="item.stationNumber" type="number" placeholder="请输入岗位人数"/></div>
                </div>
                <div class="textarea-list">
                  <div class="top">岗位概述</div>
                  <div class="bottom">
                    <textarea v-model="item.stationDescription" placeholder="请输入岗位概述"></textarea>
                  </div>
                </div>
                <div class="textarea-list">
                  <div class="top">岗位条件</div>
                  <div class="bottom">
                    <textarea v-model="item.stationCondition" placeholder="请输入岗位条件"></textarea>
                  </div>
                </div>
              </div>
              <div class="add-post" @click="addStation"><van-icon name="plus"/>继续添加</div>
            </div>
            <!--预算经费信息-->
            <div class="content-box">
                <p class="title-txt">预算经费信息</p>
                <div v-for="(item,i) in formData.moneySources" :key="i" style="margin-bottom: 0.2rem">
                  <div class="input-list" @click="clickSelct(i)">
                    <div class="left">来源类型</div>
                    <div class="right right-selct"><input v-model="item.sourceTypeName" readonly type="text" placeholder="请选择来源类型"/></div>
                  </div>
                  <div class="input-list">
                    <div class="left">来源金额</div>
                    <div class="right"><input v-model="item.sourceMoney" type="text" placeholder="请输入来源金额(元)"/></div>
                  </div>
                </div>
                <div class="add-post" @click="addBudget"><van-icon name="plus"/>继续添加</div>
            </div>
            <!--联系人信息-->
            <div class="content-box">
              <p class="title-txt">联系人信息</p>
              <div class="input-list">
                <div class="left"><i>*</i>联系人姓名</div>
                <div class="right"><input v-model="formData.linkmanName" type="text" placeholder="请输入联系人姓名"/></div>
              </div>
              <div class="input-list">
                <div class="left"><i>*</i>联系人手机</div>
                <div class="right"><input v-model="formData.linkmanMobile" type="text" placeholder="请输入联系人手机"/></div>
              </div>
            </div>
            <div class="submit-btn" @click="clickVerification">确定</div>
        </div>
        <!--多选-->
        <duoxuan v-if="duoxuanState" :myDuoxuanData="duoxuanData" @duoxuanData="getData"></duoxuan>
        <!--联级下拉-->
        <lianjixiala v-if="lianjixialaState" :lj="selctData" @lianjixialaData="lianjiData"></lianjixiala>
        <!--时间选择-->
        <dateTime v-if="datetimeState" :timeType="timeType" @datetimeData="datetimeselctData"></dateTime>
        <!--服务区域-->
        <quyu_cun_zheng v-if="quyucunzhengSelct" @cunzheng="cunzhengData"></quyu_cun_zheng>
        <!--地图-->
        <locationMap class="ditu-mian" @e-word="receiveMap" v-if="mapStaus"></locationMap>
    </div>
</template>

<script>
import {config} from '../js/httpConfig'
import {pu} from '../js/public'
import duoxuan from '@/components/publicMould/duoxuan' //多选下拉
import lianjixiala from '@/components/publicMould/lianjixiala' //联级下拉
import dateTime from '@/components/publicMould/dateTime' //时间下拉
import quyu_cun_zheng from '@/components/publicMould/quyu_cun_zheng' //村镇下拉
import locationMap from '@/components/publicMould/locationMap'//定位地图
export default {
    name: "index",
  components:{duoxuan,lianjixiala,dateTime,quyu_cun_zheng,locationMap},
  data(){
      return{
        duoxuanState:false,
        lianjixialaState:false,
        datetimeState:false,
        fuWuDuiXiang:[],//服务对象
        fuwuleibie:[],//服务类别
        zhiyuanbaozhuang:[],//志愿者保障
        duoxuanData:[],//多选传值
        duoxuanjieshou:'',//多选接收
        timejieshou:'',//时间选择接收
        timeType:'datetime',
        quyucunzhengSelct:false,
        orgIdName:'',
        recruitTarget:[],//招募范围
        sourceTypeName:[],//经费来源类型
        sourceTypeNameindex:'',
        selctData:[],
        mapStaus:false,
        formData:{
          createName:sessionStorage.nickName,//创建人,用户昵称
          appId:sessionStorage.appId,//
          title:'',//活动标题
          teamUserName:'',//团队账号
          teamPassword:'',//团队密码
          serviceTarget:'',//服务对象,多选,最多4个,传入编号以逗号分隔,根据接口传入
          orgId:'',//服务区域
          address:'',//服务地点
          beginTime:'',//活动开始时间
          endTime:'',//活动结束时间
          recruitTime:'',//招募开始时间
          recruitEndTime:'',//招募结束时间
          serviceType:'',//服务类别
          volunteerSafeguard:'',//志愿者保障
          contentDescription:'',//项目概述
          posterUrl:'',//上传图片
          recruitTarget:'',//招募范围
          targetNumber:'',//要求人数
          conditionHourNumber:'',//报名前服务时长要求
          differentTimeId:'',//不可同时报名Id
          registrationProblem:'',//报名提问
          stations:[
            {
              stationName:'',//岗位名称
              stationNumber:'',//岗位人数
              stationDescription:'',//岗位概述
              stationCondition:'',//岗位条件
            },
          ],
          moneySources:[
            {
              sourceTypeName:'',//来源类型
              sourceMoney:'',//来源金额
            },
          ],
          linkmanName:'',//联系人
          linkmanMobile:'',//联系人电话
          addressLng:'104.10194',//经度
          addressLat:'30.65984',//纬度
        },
      }
  },
  created(){
    this.fuwuduixiangData(4);//获取服务对象
    this.fuwuduixiangData(3);//招募范围
    this.fuwuduixiangData(2);//志愿者保障
    this.fuwuduixiangData(1);//预算经费来源类型
    this.fuwuleibieData();//服务类别
  },
  methods:{
    getData(state){
      this.duoxuanData=[];
      this.duoxuanState=false;
      if(state.length==0){
        return false
      }else{
        console.log(state)
      }
      let _serviceTarget="";
      for(let i=0; i<state.length; i++){
        if(state[i].status){
          _serviceTarget!=''?_serviceTarget+=','+state[i].itemName:_serviceTarget+=state[i].itemName
        }
      }
      if(this.duoxuanjieshou=='serviceTarget'){
        //服务对象接收
        this.fuWuDuiXiang=state;
      }else if(this.duoxuanjieshou=='serviceType'){
        //服务类别接收
        this.fuwuleibie=state;
      }else if(this.duoxuanjieshou=='volunteerSafeguard'){
        //志愿者保障接收
        this.zhiyuanbaozhuang=state;
      }
      this.formData[this.duoxuanjieshou]=_serviceTarget;
    },
    lianjiData(state){
      this.lianjixialaState=false;
      if(this.sourceTypeNameindex==-1){
        //招募范围
        this.formData.recruitTarget=state.text;
      }else{
        //经费来源类型
        this.formData.moneySources[this.sourceTypeNameindex].sourceTypeName=state.text;
      }
    },
    datetimeselctData(state){
      this.datetimeState=false;
      this.formData[this.timejieshou]=state;
    },
    receiveMap(state){
      this.formData.address=state.address;
      this.formData.addressLng=state.lng;
      this.formData.addressLat=state.lat;
      this.mapStaus=false;
    },
    clickFuwuduixiang(){
      this.duoxuanState=true;
      this.duoxuanjieshou='serviceTarget';
      this.duoxuanData=this.fuWuDuiXiang;
    },
    //时间选择
    timeSelection(name){
      this.datetimeState=true;
      this.timejieshou=name;
    },
    //经费预算类型下拉
    clickSelct(index){
      this.sourceTypeNameindex=index;
      if(index==-1){
        //招募范围
        this.selctData=this.recruitTarget;
      }else{
        //经费来源类型
        this.selctData=this.sourceTypeName;
      }
      this.lianjixialaState=true;
    },
    //图片上传
    fileUploadAll(file){
      let _this=this;
      let formData = new FormData();
      formData.append('upload', file.file);
      $.ajax({
        url:config.uploadAll,
        type:'post',
        data:formData,
        dataType:'json',
        processData: false,
        contentType: false,
        success:function(res){
          if(_this.formData.posterUrl==''){
            _this.formData.posterUrl=res.data
          }else{
            _this.formData.posterUrl+=','+res.data
          }
        }
      })
    },
    //删除图片
    deletImg(mu){
      let _arr=this.formData.posterUrl.split(',');
      let str="";
      _arr=_arr.splice(mu,1);
      for(let i=0; i<_arr.length; i++){
        if(i){
          str+=','+_arr[i]
        }else{
          str+=_arr[i]
        }
      }
      this.formData.posterUrl=str;
    },
    //获取服务对象
    fuwuduixiangData(code){
      //1预算经费来源类型, 4服务对象, 2志愿者保障, 3招募要求
      let _this=this;
      $.ajax({
        url:config.findAllTypeByCondition,
        data:{code:code},
        success:(res)=>{
          if(res.status==200){
            let _arr=[];
            for(let i=0; i<res.data.length; i++){
              res.data[i].status=false;
              if(code==1 || code==3){
                _arr.push({
                  text:res.data[i].itemName,
                  id:res.data[i].id
                })
              }
            }
            if(code==4){
              _this.fuWuDuiXiang=res.data;
            }else if(code==2){
              _this.zhiyuanbaozhuang=res.data;
            }else if(code==1){
              _this.sourceTypeName=_arr;
            }else if(code==3){
              _this.recruitTarget=_arr;
            }
          }else{
            _this.$toast('获取服务对象失败');
          }
        }
      })
    },
    //服务类别
    fuwuleibieData(){
      let _this=this;
      $.ajax({
        url:config.findAllServiceSort,
        success:(res)=>{
          if(res.status==200){
            let _arr=[];
            for(let i=0; i<res.data.length; i++){
              let _obj={
                id:res.data[i].id,
                itemName:res.data[i].sortName,
                status:false
              };
              _arr.push(_obj)
            }
            _this.fuwuleibie=_arr;
          }else{
            _this.$toast('获取服务类别失败');
          }
        }
      })
    },
    //新增岗位
    addStation(){
      this.formData.stations.push({
        stationName:'',//岗位名称
        stationNumber:'',//岗位人数
        stationDescription:'',//岗位概述
        stationCondition:'',//岗位条件
      })
    },
    //添加预算
    addBudget(){
      this.formData.moneySources.push({
        sourceTypeName:'',//来源类型
        sourceMoney:'',//来源金额
      })
    },
    //服务区域接收
    cunzhengData(state){
      this.quyucunzhengSelct=false;
      this.formData.orgId=state.village;
      this.orgIdName=state.locationName;
    },
    //验证表单
    clickVerification(){
      if(this.formData.title==""){
        this.$toast("活动名称不能为空");
        return
      }
      if(this.formData.teamUserName==""){
        this.$toast("团队账号不能为空");
        return
      }
      if(this.formData.teamPassword==""){
        this.$toast("团队密码不能为空");
        return
      }
      if(this.formData.serviceTarget==""){
        this.$toast("请选择服务对象");
        return
      }
      if(this.formData.orgId==""){
        this.$toast("请选择服务区域");
        return
      }
      if(this.formData.address==""){
        this.$toast("请选择服务地点");
        return
      }
      if(this.formData.beginTime==""){
        this.$toast("请选择活动开始时间");
        return
      }
      if(this.formData.endTime==""){
        this.$toast("请选择活动结束时间");
        return
      }else{
        if(!pu.timeRatioSize(this.formData.beginTime,this.formData.endTime)){
          this.$toast("活动结束时间不能小于开始时间");
          return
        }
      }
      if(this.formData.recruitTime==""){
        this.$toast("请选择招募开始时间");
        return
      }else{
        if(!pu.timeRatioSize(this.formData.recruitTime,this.formData.beginTime)){
          this.$toast("招募开始时间不能大于活动开始时间");
          return
        }
      }
      if(this.formData.recruitEndTime==""){
        this.$toast("请选择招募结束时间");
        return
      }else{
        if(!pu.timeRatioSize(this.formData.recruitEndTime,this.formData.beginTime)){
          this.$toast("招募结束时间不能大于活动开始时间");
          return
        }
        if(!pu.timeRatioSize(this.formData.recruitTime,this.formData.recruitEndTime)){
          this.$toast("招募开始时间不能大于招募结束时间");
          return
        }
      }
      if(this.formData.serviceType==""){
        this.$toast("请选择服务类别");
        return
      }
      if(this.formData.volunteerSafeguard==""){
        this.$toast("请选择志愿者保障");
        return
      }
      if(this.formData.contentDescription==""){
        this.$toast("项目概述不能为空");
        return
      }
      if(this.formData.recruitTarget==""){
        this.$toast("请选择志愿者招募范围");
        return
      }
      if(this.formData.targetNumber==""){
        this.$toast("服务要求人数不能为空");
        return
      }
      if(this.formData.linkmanName==""){
        this.$toast("联系人不能为空");
        return
      }
      if(this.formData.linkmanMobile==""){
        this.$toast("联系人电话不能为空");
        return
      }else{
        if(!pu.checkPhone(this.formData.linkmanMobile)){
          this.$toast("联系人电话格式不正确");
          return
        }
      }
      this.clickSubmitData();
    },
    clickSubmitData(){
      let _data=this.formData;
      // _data.stations=JSON.stringify(_data.stations);
      // _data.moneySources=JSON.stringify(_data.moneySources);
      let _this=this;
      $.ajax({
        url:config.add,
        type:'post',
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        data:JSON.stringify(_data),
        success:res=>{
          if(res.status==200){
            _this.$router.push("./home")
          }else{
            _this.$toast(res.message)
          }
        }
      })
    },

  },
}
</script>

<style scoped>
@import "css/style.css";
</style>
