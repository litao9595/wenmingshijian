<template>
    <div style="background: #f5f5f5" v-title data-title="团队申请">
      <div class="banner-box"></div>
      <div class="main-box">
        <div class="content-box">
          <div class="input-list">
            <div class="left"><i>*</i>电子邮箱</div>
            <div class="right"><input v-model="formData.email" type="text" placeholder="请输入电子邮箱"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>志愿团队名称</div>
            <div class="right"><input v-model="formData.name" type="text" placeholder="请输入志愿团队名称"/></div>
          </div>
          <div class="input-list" @click="clickSelct('registrationStatus')">
            <div class="left"><i>*</i>登记状态</div>
            <div class="right right-selct"><input v-model="registrationStatusState.text" readonly type="text" placeholder="请选择登记状态"/></div>
          </div>
          <div class="input-list" @click="clickSelct('contactTeam')">
            <div class="left"><i>*</i>联络团体</div>
            <div class="right right-selct"><input v-model="contactTeamState.text" readonly type="text" placeholder="请选择联络团体"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>团体编号</div>
            <div class="right"><input v-model="formData.contactTeamNum" type="text" placeholder="请向联络团体申请编号"/></div>
          </div>
          <div class="input-list" @click="clickSelct('competentUnitType')">
            <div class="left"><i>*</i>主管单位类型</div>
            <div class="right right-selct"><input v-model="competentUnitTypeState.text" readonly type="text" placeholder="请选择主管单位类型"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>主管单位名称</div>
            <div class="right"><input v-model="formData.competentUnitName" type="text" placeholder="请输入主管单位名称"/></div>
          </div>
          <div class="input-list" @click="quyucunzhengSelct=true">
            <div class="left"><i>*</i>服务区域</div>
            <div class="right right-selct"><input v-model="formData.area" readonly type="text" placeholder="请选择服务区域"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>详细地址</div>
            <div class="right"><input v-model="formData.detailAddress" type="text" placeholder="请输入详细地址"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>邮编</div>
            <div class="right"><input v-model="formData.zipCode" type="text" placeholder="请输入邮编"/></div>
          </div>
          <div class="input-list" @click="datetimeState=true">
            <div class="left"><i>*</i>成立日期</div>
            <div class="right right-selct"><input v-model="formData.establishmentTime" readonly type="text" placeholder="请选择成立日期"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>志愿者人数</div>
            <div class="right"><input v-model="formData.teamNum" type="number" placeholder="请输入志愿者人数"/></div>
          </div>
          <div class="input-list" @click="duoxuanState=true">
            <div class="left"><i>*</i>服务类别</div>
            <div class="right right-selct"><input v-model="formData.serviceTypeId==''?'':formData.serviceTypeId.split(',').length+'项'" readonly type="text" placeholder="请选择服务类别"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>联系人姓名</div>
            <div class="right"><input v-model="formData.contactName" type="text" placeholder="请输入联系人姓名"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>联系人手机</div>
            <div class="right"><input v-model="formData.contactPhone" type="number" placeholder="请输入联系人手机"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>负责人姓名</div>
            <div class="right"><input v-model="formData.dutyName" type="text" placeholder="请输入负责人姓名"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>负责人手机</div>
            <div class="right"><input v-model="formData.dutyPhone" type="number" placeholder="请输入负责人手机"/></div>
          </div>
          <div class="input-list">
            <div class="left"><i>*</i>负责人身份证</div>
            <div class="right"><input v-model="formData.dutyIdcardNum" type="number" placeholder="请输入负责人身份证号"/></div>
          </div>
          <div class="textarea-list">
            <div class="top"><i style="opacity: 0">*</i>团队简介</div>
            <div class="bottom">
              <textarea v-model="formData.introduction" placeholder="请输入团队简介"></textarea>
            </div>
          </div>
          <div class="submit-btn" @click="clickSubmit">提交</div>
        </div>
      </div>
      <!--单选下拉-->
      <lianjixiala v-if="selcet" :lj="currentSelct" @lianjixialaData="politicsData"></lianjixiala>
      <!--服务区域-->
      <quyu_cun_zheng v-if="quyucunzhengSelct" @cunzheng="cunzhengData"></quyu_cun_zheng>
      <!--成立日期-->
      <dateTime v-if="datetimeState" :timeType="timeType" @datetimeData="datetimeselctData"></dateTime>
      <!--服务类别-->
      <duoxuan v-if="duoxuanState" :myDuoxuanData="serviceSort" @duoxuanData="getData"></duoxuan>
      <!--loading-->
      <loading v-if="submitState"></loading>
    </div>
</template>

<script>
  import {config} from '../js/httpConfig'
  import {pu} from '../js/public'
  import lianjixiala from '@/components/publicMould/lianjixiala' //联级下拉
  import duoxuan from '@/components/publicMould/duoxuan' //多选下拉
  import quyu_cun_zheng from '@/components/publicMould/quyu_cun_zheng' //村镇下拉
  import dateTime from '@/components/publicMould/dateTime' //时间下拉
  import loading from '@/components/publicMould/loading'
export default {
    name: "chuangjiantuandui",
  components:{lianjixiala,duoxuan,quyu_cun_zheng,dateTime,loading},
  data(){
      return{
        selcet:false,
        selctStateTxt:'',
        currentSelct:[],//当前下拉数据
        registrationStatus:[],//登记状态
        registrationStatusState:{},
        contactTeam:[],//联络团队
        contactTeamState:{},
        competentUnitType:[],//主管单位类型
        competentUnitTypeState:{},
        quyucunzhengSelct:false,
        datetimeState:false,
        timeType:'date',
        duoxuanState:false,
        serviceSort:[],//服务类别
        submitState:false,
        formData:{
          centerId:sessionStorage.centerId,
          email:'',//邮箱
          name:'',//团队名称
          registrationStatus:'',//登记状态 3为未登记志愿者服务组织,1为法人组织,默认为0
          contactTeam:'',//联络团队
          contactTeamNum:'',//联络团队编号
          competentUnitType:'',//主管单位类型 传值
          competentUnitName:'',//主管单位名称
          area:'',//服务区域 以"-"隔开
          serviceCityVal:'',//服务区域-市val值
          serviceTownVal:'',//服务区域-区val值
          detailAddress:'',//详细地址
          zipCode:'',//邮政编码
          establishmentTime:'',//成立时间
          teamNum:'',//志愿者人数
          serviceTypeId:'',//服务类别
          contactName:'',//联系人姓名
          contactPhone:'',//联系人手机
          contactPhoneIsOpen:1,//联系人手机号是否公开(1公开,0未公开)
          dutyName:'',//负责人姓名
          dutyPhone:'',//负责人手机
          dutyPhoneIsOpen:1,//责任人手机号是否公开(1公开,0未公开)
          dutyIdcardNum:'',//负责人身份证
          introduction:'',//团队简介
        },
      }
  },
  created(){
      this.registrationStatus=[
        {text:'未登记志愿者服务组织',id:3},
        {text:'法人组织',id:1},
        ];
      this.getfindVolunteerTeamPageList();
      this.getfindAllCoreCompetentUnitType();
      this.findAllServiceSortData();
  },
  methods:{
    //接收单选下拉
    politicsData(state){
      if(state){
        let name=this.selctStateTxt+'State';
        this[name]=state;
        this.formData[this.selctStateTxt]=state.id;
      }
      this.selcet=false;
    },
    //服务区域接收
    cunzhengData(state){
      this.formData.area=state.locationName;
      this.formData.serviceCityVal=state.city;//市
      this.formData.serviceTownVal=state.area;//县
      this.quyucunzhengSelct=false;
    },
    clickSelct(str){
      this.selctStateTxt=str;
      this.currentSelct=this[str];
      this.selcet=true;
    },
    //成立时间接收
    datetimeselctData(state){
      this.datetimeState=false;
      this.formData.establishmentTime=state.split(' ')[0];
    },
    //服务类别接收
    getData(state){
      if(state.length){
        this.serviceSort=state;
        let _serviceTarget="";
        for(let i=0; i<state.length; i++){
          if(state[i].status){
            // _serviceTarget!=''?_serviceTarget+=','+state[i].id:_serviceTarget+=state[i].id
            _serviceTarget!=''?_serviceTarget+=','+state[i].itemName:_serviceTarget+=state[i].itemName
          }
        }
        this.formData.serviceTypeId=_serviceTarget
      }
      this.duoxuanState=false;
    },
    //查询团队列表
    getfindVolunteerTeamPageList(){
      let _this=this;
      $.ajax({
        url:config.findVolunteerTeamPageList,
        data:{pageNo:1,pageSize:100},
        success:res=>{
          let _arr=[];
          if(res.status==200){
            for(let i=0; i<res.data.list.length; i++){
                let _obj={text:res.data.list[i].name,id:res.data.list[i].id};
              _arr.push(_obj)
            }
            _this.contactTeam=_arr
          }else{_this.$toast(res.message)}
        }
      })
    },
    //查询主管单位类型
    getfindAllCoreCompetentUnitType(){
      let _this=this;
      $.ajax({
        url:config.findAllCoreCompetentUnitType,
        success:res=>{
          let _arr=[];
          if(res.status==200){
            for(let i=0; i<res.data.length; i++){
              let _obj={text:res.data[i].name,id:res.data[i].id};
              _arr.push(_obj)
            }
            _this.competentUnitType=_arr
          }else{_this.$toast(res.message)}
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
    //提交表单
    clickSubmit(){
      if(this.formData.email==""){
        this.$toast("邮箱不能为空");
        return
      }else{
          if(!pu.testEmail(this.formData.email)){
            this.$toast("邮箱格式不正确");
            return
          }
      }
      if(this.formData.name==""){
        this.$toast("志愿者团队名称不能为空");
        return
      }
      if(this.formData.registrationStatus==""){
        this.$toast("请选择登记状态");
        return
      }
      if(this.formData.contactTeam==""){
        this.$toast("请选择联络团体");
        return
      }
      if(this.formData.contactTeamNum==""){
        this.$toast("联络团体编号不能为空");
        return
      }
      if(this.formData.competentUnitType==""){
        this.$toast("请选择主管单位类型");
        return
      }
      if(this.formData.competentUnitName==""){
        this.$toast("主管单位名称不能为空");
        return
      }
      if(this.formData.area==""){
        this.$toast("请选择服务区域");
        return
      }
      if(this.formData.detailAddress==""){
        this.$toast("详细地址不能为空");
        return
      }
      if(this.formData.zipCode==""){
        this.$toast("邮编不能为空");
        return
      }
      if(this.formData.establishmentTime==""){
        this.$toast("请选择成立日期");
        return
      }
      if(this.formData.teamNum==""){
        this.$toast("志愿者人数不能为空");
        return
      }
      if(this.formData.serviceTypeId==""){
        this.$toast("请选择服务类别");
        return
      }
      if(this.formData.contactName==""){
        this.$toast("联系人姓名不能为空");
        return
      }
      if(this.formData.contactPhone==""){
        this.$toast("联系人手机号不能为空");
        return
      }else{
        if(!pu.checkPhone(this.formData.contactPhone)){
          this.$toast("联系人手机号格式不正确");
          return
        }
      }
      if(this.formData.dutyName==""){
        this.$toast("负责人姓名不能为空");
        return
      }
      if(this.formData.dutyPhone==""){
        this.$toast("负责人手机号不能为空");
        return
      }else{
        if(!pu.checkPhone(this.formData.dutyPhone)){
          this.$toast("负责人手机号格式不正确");
          return
        }
      }
      if(this.formData.dutyIdcardNum==""){
        this.$toast("负责人身份证号不能为空");
        return
      }else{
        if(!pu.testIdcardReg(this.formData.dutyIdcardNum)){
          this.$toast("负责人身份证号格式不正确");
          return
        }
      }
      this.getSubmit();
    },
    getSubmit(){
      let _this=this;
      _this.submitState=true;
      $.ajax({
        url:config.saveVolunteerTeam,
        data:this.formData,
        success:res=>{
          _this.submitState=false;
          _this.$toast(res.message)
        }
      })
    },
  },
}
</script>

<style scoped>
@import "css/chuangjiantuandui.css";
</style>
