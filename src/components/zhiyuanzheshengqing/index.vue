<template>
    <div style="background: #f5f5f5" v-title data-title="志愿者申请">
      <div class="banner-box"></div>
      <div class="main-box">
          <div class="content-box">
            <div class="input-list">
              <div class="left"><i>*</i>电子邮箱</div>
              <div class="right"><input v-model="formData.email" type="text" placeholder="请输入电子邮箱"/></div>
            </div>
            <div class="input-list">
              <div class="left"><i>*</i>真实姓名</div>
              <div class="right"><input v-model="formData.volunteerName" type="text" placeholder="请输入真实姓名"/></div>
            </div>
            <!--<div class="input-list">-->
              <!--<div class="left"><i>*</i>证件类型</div>-->
              <!--<div class="right right-selct"><input v-model="formData.cardType" readonly type="text" placeholder="请选择证件类型"/></div>-->
            <!--</div>-->
            <div class="input-list">
              <div class="left"><i>*</i>身份证号码</div>
              <div class="right"><input v-model="formData.idCard" type="text" placeholder="请输入身份证号码"/></div>
            </div>
            <!--<div class="input-list">-->
              <!--<div class="left"><i>*</i>性别</div>-->
              <!--<div class="right right-selct">-->
                <!--<input readonly type="text" placeholder="请选择性别"/>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="input-list">-->
              <!--<div class="left"><i>*</i>出生日期</div>-->
              <!--<div class="right right-selct"><input readonly type="text" placeholder="请选择出生日期"/></div>-->
            <!--</div>-->
            <div class="input-list" @click="clickSelct('politics')">
              <div class="left"><i>*</i>政治面貌</div>
              <div class="right right-selct"><input v-model="politicsState.text" readonly type="text" placeholder="请选择政治面貌"/></div>
            </div>
            <div class="input-list" @click="clickSelct('nation')">
              <div class="left"><i>*</i>民族</div>
              <div class="right right-selct"><input v-model="nationState.text" readonly type="text" placeholder="请选择民族"/></div>
            </div>
            <div class="input-list" @click="nativePlaceSelct=true">
              <div class="left"><i style="opacity: 0">*</i>籍贯</div>
              <div class="right right-selct"><input v-model="formData.nativePlace" readonly type="text" placeholder="请选择籍贯"/></div>
            </div>
            <div class="input-list">
              <div class="left"><i>*</i>手机号</div>
              <div class="right"><input v-model="formData.telephone" type="text" placeholder="请输入手机号"/></div>
            </div>
            <div class="input-list">
              <div class="left"><i>*</i>微博</div>
              <div class="right"><input v-model="formData.blog" type="text" placeholder="请输入微博号"/></div>
            </div>
            <div class="input-list" @click="clickCunzheng('address')">
              <div class="left"><i>*</i>居住区域</div>
              <div class="right right-selct"><input v-model="formData.address" readonly type="text" placeholder="请选择居住区域"/></div>
            </div>
            <div class="input-list">
              <div class="left"><i>*</i>详细地址</div>
              <div class="right"><input v-model="formData.addressDetail" type="text" placeholder="请输入详细地址"/></div>
            </div>
            <div class="input-list">
              <div class="left"><i style="opacity: 0">*</i>邮编</div>
              <div class="right"><input v-model="formData.postalCode" type="text" placeholder="请输入邮编"/></div>
            </div>
            <div class="input-list" @click="clickSelct('degree')">
              <div class="left"><i>*</i>最高学历</div>
              <div class="right right-selct"><input v-model="degreeState.text" readonly type="text" placeholder="请选择最高学历"/></div>
            </div>
            <div class="input-list"  @click="clickSelct('empState')">
              <div class="left"><i>*</i>从业状态</div>
              <div class="right right-selct"><input v-model="empStateState.text" readonly type="text" placeholder="请选择从业状态"/></div>
            </div>
            <div class="input-list" @click="clickCunzheng('serviceArea')">
              <div class="left"><i>*</i>服务区域</div>
              <div class="right right-selct"><input v-model="serviceAreaText" readonly type="text" placeholder="请选择服务区域"/></div>
            </div>
            <div class="input-list" @click="clickDduoxuan('serviceSort')">
              <div class="left"><i>*</i>服务类别</div>
              <div class="right right-selct"><input v-model="formData.serviceSort==''?'':formData.serviceSort.split(',').length+'项'" readonly type="text" placeholder="请选择服务类别"/></div>
            </div>
            <div class="input-list" @click="clickDduoxuan('serviceType')">
              <div class="left"><i>*</i>服务领域行业</div>
              <div class="right right-selct"><input  v-model="formData.serviceType==''?'':formData.serviceType.split(',').length+'项'" readonly type="text" placeholder="请选择服务领域行业"/></div>
            </div>
            <div :class="submitState?'submit-btn submit-active-btn':'submit-btn'" @click="clickSubmit">提交</div>
          </div>
      </div>
      <!--政治面貌-->
      <lianjixiala v-if="selcet" :lj="currentSelct" @lianjixialaData="politicsData"></lianjixiala>
      <!--籍贯-->
      <jgSelct v-if="nativePlaceSelct" @lct="locationData"></jgSelct>
      <!--多选-->
      <duoxuan v-if="duoxuanState" :myDuoxuanData="duoxuanData" @duoxuanData="getData"></duoxuan>
      <!--村镇-->
      <quyu_cun_zheng v-if="quyucunzhengSelct" @cunzheng="cunzhengData"></quyu_cun_zheng>
      <!---->
      <loading v-if="submitState"></loading>
    </div>
</template>

<script>
import {config} from '../js/httpConfig'
import {pu} from '../js/public'
import lianjixiala from '@/components/publicMould/lianjixiala' //联级下拉
import jgSelct from '@/components/publicMould/jgSelct' //籍贯下拉
import duoxuan from '@/components/publicMould/duoxuan' //多选下拉
import quyu_cun_zheng from '@/components/publicMould/quyu_cun_zheng' //村镇下拉
import loading from '@/components/publicMould/loading'
export default {
    name: "index",
  components:{lianjixiala,jgSelct,duoxuan,quyu_cun_zheng,loading},
  data(){
      return{
        formData:{
          id:'',//不传为新增、传了为修改
          status:0,
          centerId:'',
          appId:'',//app用户id
          country:'4544',//国家
          email:'',//邮箱
          volunteerName:'',//姓名
          cardType:'5429',//证件类型
          idCard:'',//身份证号码
          sex:'',//性别
          birthday:'',//出生日期
          politics:'',//政治面貌
          nation:'',//民族
          nativePlace:'',//籍贯
          provinceVal:'7946',//籍贯-省val值
          cityVal:'',//籍贯-市val值
          areaVal:'',//籍贯-区val值
          telephone:'',//手机号
          blog:'',//微博
          address:'',//居住区域
          houseCityVal:'',//居住地-市val值
          houseAreaVal:'',//居住地-区val值
          addressDetail:'',//详细地址
          postalCode:'',//邮编
          degree:'',//最高学历
          empState:'',//从业状态
          serviceArea:'',//服务区域
          serviceCityVal:'',//服务区域-市val值
          serviceTownVal:'',//服务区域-区val值
          serviceSort:'',//服务类别
          serviceType:'',//服务领域行业
        },
        duoxuanState:false,
        duoxuanData:[],
        duoxuanStateText:'',
        selcet:false,
        selctStateTxt:'',
        currentSelct:[],//当前下拉数据
        nativePlaceSelct:false,
        quyucunzhengSelct:false,
        quyucunzhengText:'',
        politics:[],//政治面貌
        politicsState:{},
        nation:[],//民族
        nationState:{},
        degree:[],//所有学历
        degreeState:{},
        empState:[],//从业状态
        empStateState:{},
        serviceType:[],//服务领域行业
        serviceSort:[],//服务类别
        serviceAreaText:'',
        submitState:false,
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
    this.formData.appId=this.$route.query.userId;
    this.formData.centerId=this.$route.query.centerId;
    this.findAllPoliticsData();
    this.findAllNationData();
    this.findAllDegreeData();
    this.findAllEmpStateData();
    this.findAllServiceSortData();
    this.findAllServiceTypeData();
    this.provinceData();
      // console.log(pu.checkPhone('1588346212'))
  },
  methods:{
    clickSubmit(){
      let _this=this;
        if(_this.formData.appId=="" || !_this.formData.appId){
          _this.$toast('用户Id不能为空');
          return false
        }
        if(_this.formData.centerId=="" || !_this.formData.centerId){
          _this.$toast('centerId不能为空');
          return false
        }
        if(_this.formData.email==""){
          _this.$toast('邮箱不能为空');
          return false
        }else{
          if(!pu.testEmail(_this.formData.email)){
            _this.$toast('请输入正确的邮箱格式');
            return false
          }
        }
        if(_this.formData.volunteerName==""){
          _this.$toast('真实姓名不能为空');
          return false
        }
        if(_this.formData.idCard==""){
          _this.$toast('身份证号不能为空');
          return false
        }else{
          if(pu.testIdcardReg(_this.formData.idCard)){
            _this.formData.sex=pu.getSex(_this.formData.idCard);
            _this.formData.birthday=pu.getBirth(_this.formData.idCard);
          }else{
            _this.$toast('请输入正确的身份证号');
            return false
          }
        }
        if(_this.formData.politics==""){
          _this.$toast('请选择政治面貌');
          return false
        }
        if(_this.formData.nation==""){
          _this.$toast('请选择民族');
          return false
        }
        if(_this.formData.nativePlace==""){
          _this.$toast('请选择籍贯');
          return false
        }
        if(_this.formData.telephone==""){
          _this.$toast('手机号不能为空');
          return false
          }else{
            if(!pu.checkPhone(_this.formData.telephone)){
              _this.$toast('请输入正确的手机号');
              return false
            }
          }
          if(_this.formData.blog==""){
            _this.$toast('微博不能为空');
            return false
          }
          if(_this.formData.address==""){
            _this.$toast('居住区域不能为空');
            return false
          }
          if(_this.formData.addressDetail==""){
            _this.$toast('详细地址不能为空');
            return false
          }
          if(_this.formData.degree==""){
            _this.$toast('请选择最高学历');
            return false
          }
          if(_this.formData.empState==""){
            _this.$toast('请选择从业状态');
            return false
          }
          if(_this.formData.serviceArea==""){
            _this.$toast('请选择服务区域');
            return false
          }
          if(_this.formData.serviceSort==""){
            _this.$toast('请选择服务类别');
            return false
          }
          if(_this.formData.serviceType==""){
            _this.$toast('请选择服务行业领域');
            return false
          }
        this.submitGet();
    },
    submitGet(){
      let _this=this;
      _this.submitState=true;
      $.ajax({
        url:config.saveVolunteer,
        data:this.formData,
        success:res=>{
          if(res.status==200){}
          _this.$toast(res.message);
          _this.submitState=false;
        }
      })
    },
    clickSelct(str){
      this.selctStateTxt=str;
      this.currentSelct=this[str];
      this.selcet=true;
    },
    clickDduoxuan(str){
      this.duoxuanStateText=str;
      this.duoxuanData=this[str];
      this.duoxuanState=true;
    },
    clickCunzheng(str){
      this.quyucunzhengSelct=true;
      this.quyucunzhengText=str;
    },
    //政治面貌
    findAllPoliticsData(){
      let _this=this;
      $.ajax({
        url:config.findAllPolitics,
        success:res=>{
          if(res.status==200){
            for(let i=0; i<res.data.length; i++){
              let _obj={
                id:res.data[i].id,
                text:res.data[i].politicsName
              }
              _this.politics.push(_obj);
            }
          }else{_this.$toast('政治面貌获取失败')}
        }
      })
    },
    //查询所有民族
    findAllNationData(){
      let _this=this;
      $.ajax({
        url:config.findAllNation,
        success:res=>{
          if(res.status==200){
            for(let i=0; i<res.data.length; i++){
              let _obj={
                id:res.data[i].id,
                text:res.data[i].nationName
              }
              _this.nation.push(_obj);
            }
          }else{_this.$toast('民族获取失败')}
        }
      })
    },
    //查询所有学历
    findAllDegreeData(){
      let _this=this;
      $.ajax({
        url:config.findAllDegree,
        success:res=>{
          if(res.status==200){
            for(let i=0; i<res.data.length; i++){
              let _obj={
                id:res.data[i].id,
                text:res.data[i].name
              }
              _this.degree.push(_obj);
            }
          }else{_this.$toast('学历获取失败')}
        }
      })
    },
    //查询所有从业状态
    findAllEmpStateData(){
      let _this=this;
      $.ajax({
        url:config.findAllEmpState,
        success:res=>{
          if(res.status==200){
            for(let i=0; i<res.data.length; i++){
              let _obj={
                id:res.data[i].id,
                text:res.data[i].name
              }
              _this.empState.push(_obj);
            }
          }else{_this.$toast('从业状态获取失败')}
        }
      })
    },
    //查询服务类别
    findAllServiceSortData(){
      let _this=this;
      $.ajax({
        url:config.findAllServiceSort,
        success:res=>{
          if(res.status==200){
            let _arr=[];
            for(let i=0; i<res.data.length; i++){
              let _obj={
                status:false,
                itemName:res.data[i].sortName,
                id:res.data[i].id
              };
              _arr.push(_obj)
            }
            _this.serviceSort=_arr
          }else{
            _this.$toast('服务类别获取失败')
          }
        }
      })
    },
    //查询服务领域行业
    findAllServiceTypeData(){
      let _this=this;
      $.ajax({
        url:config.findAllServiceType,
        success:res=>{
          if(res.status==200){
            let _arr=[];
            for(let i=0; i<res.data.length; i++){
              let _obj={
                status:false,
                itemName:res.data[i].typeName,
                id:res.data[i].id
              };
              _arr.push(_obj)
            }
            _this.serviceType=_arr
          }else{_this.$toast('服务领域行业获取失败')}

        }
      })
    },
    //查询省市区id
    provinceData(){
      let _this=this;
      $.ajax({
        url:config.findAreaNameAndValue,
        success:res=>{
          if(res.status==200){
            // _this.formData.provinceVal=res.data.province.id;
            _this.formData.houseCityVal=res.data.city.id;
            _this.formData.houseAreaVal=res.data.area.id;
            _this.formData.serviceCityVal=res.data.city.id;
            _this.formData.serviceTownVal=res.data.area.id;
          }else{_this.$toast(res.message)}
        }
      })
    },
    //接收单选下拉
    politicsData(state){
      if(state){
        let name=this.selctStateTxt+'State';
        this[name]=state;
        // this.formData[this.selctStateTxt]=state.id;
        this.formData[this.selctStateTxt]=state.text;
      }
      this.selcet=false;
    },
    //接收多选下拉
    getData(state){
      if(state.length){
        this[this.duoxuanStateText]=state;
        let _serviceTarget="";
        for(let i=0; i<state.length; i++){
          if(state[i].status){
            // _serviceTarget!=''?_serviceTarget+=','+state[i].id:_serviceTarget+=state[i].id
            _serviceTarget!=''?_serviceTarget+=','+state[i].itemName:_serviceTarget+=state[i].itemName
          }
        }
        this.formData[this.duoxuanStateText]=_serviceTarget
      }
      this.duoxuanState=false;
    },
    //籍贯组件接收
    locationData(state){
      if(state){
        this.formData.nativePlace=state.locationName;
        this.formData.cityVal=state.cityId;
        this.formData.areaVal=state.countyId;
      }
      this.nativePlaceSelct=false;
    },
    //区域村镇接收
    cunzhengData(state){
      if(state){
        if(this.quyucunzhengText=='address'){
          //居住区域
          this.formData[this.quyucunzhengText]=state.locationName;
        }else if(this.quyucunzhengText=='serviceArea'){
          //服务区域
          this.formData[this.quyucunzhengText]=state.village;
          this.serviceAreaText=state.locationName;
        }
      }
      this.quyucunzhengSelct=false;
    },
  },
}
</script>

<style scoped>
@import "css/style.css";
</style>
