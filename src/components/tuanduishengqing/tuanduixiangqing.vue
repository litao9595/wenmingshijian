<template>
    <div style="background: #f5f5f5" v-title data-title="团队申请">
      <div class="banner-box"></div>
      <div class="main-box">
          <div class="head-box">
            <div class="left"></div>
            <div class="right">{{detilsTxt.name}}</div>
          </div>
          <div class="content-box">
              <p>团体人数：{{detilsTxt.teamNum}}人</p>
              <p>服务总时长：{{detilsTxt.teamServiceTime}}小时</p>
              <p>负责人：{{detilsTxt.dutyName}}</p>
              <p>负责人电话：{{detilsTxt.dutyPhone}}</p>
              <p>成立时间：{{detilsTxt.establishmentTime}}</p>
              <p>联络团体：{{detilsTxt.contactTeam}}</p>
          </div>
          <div :class="submit?'submit-btn':'submit-btn submit-active-btn'" @click="clickJoin">申请加入</div>
      </div>
    </div>
</template>

<script>
  import {config} from '../js/httpConfig'
export default {
    name: "tuanduixiangqing",
  data(){
      return{
        banner:require('../zhiyuanzheshengqing/image/banner.png'),
        id:'',
        detilsTxt:{},
        volunteerStatus:'',//-1非志愿者 0志愿者审核中 1已通过志愿者审核
        FindVolunteer:{},//志愿者信息
        submit:false,
      }
  },
  created(){
    this.id=this.$route.query.id;
    this.detilsData();
    this.isMember();
  },
  methods:{
      //获取详情
    detilsData(){
      let _this=this;
      $.ajax({
        url:config.findDetailVolunteerTeamById+'?id='+this.id,
        success:res=>{
          _this.detilsTxt=res.data;
        }
      })
    },
    //判断是否是志愿者
    isVolunteer(){
      let _this=this;
      $.ajax({
        url:config.findAppUserType+'?appId='+sessionStorage.appId,
        async:false,
        success:res=>{
          _this.volunteerStatus=res.data.volunteerStatus
        }
      })
    },
    //点击加入
    clickJoin(){
      this.isVolunteer();
      if(this.volunteerStatus==1){
        this.getFindVolunteer();
        if(this.FindVolunteer.id){
          //存在志愿者信息
          this.joinTeam();
        }else{
          //不存在志愿者信息
          this.$toast('未查询到相关志愿者信息')
        }
      }else{
        this.$toast('请先注册为志愿者')
      }
    },
    //加入团队
    joinTeam(){
      let _this=this;
      $.ajax({
        url:config.saveVolunteerTeamMember,
        data:{
          name:this.FindVolunteer.volunteerName,
          appId:sessionStorage.appId,
          volunteerTeamId:this.id,//志愿团队主键id
          sex:this.FindVolunteer.sex,
          phone:this.FindVolunteer.telephone,
          head:'',
          checkStatus:0,//为0为提交申请加入志愿团队，为1为同意加入该志愿团队，为2为拒绝加入该志愿团队
        },
        success:res=>{
          if(res.status==200){
            _this.submit=false;
          }
          _this.$toast(res.message)
        }
      })
    },
    //获取志愿者信息
    getFindVolunteer(){
      let _this=this;
      $.ajax({
        url:config.findVolunteer+'?appId='+sessionStorage.appId,
        async:false,
        success:res=>{
          _this.FindVolunteer=res.data;
        }
      })
    },
    //判断该成员是否是该团队的成员
    isMember(){
      let _this=this;
      $.ajax({
        url:config.judgeAppUserIsTeamMember,
        data:{
          volunteerTeamId:this.id,//团队id
          appId:sessionStorage.appId
        },
        success:res=>{
          if(res.data.isTeamMember){
              _this.submit=false
          }else{
            _this.submit=true;
          }
        }
      })
    },
  },
}
</script>

<style scoped>
@import "css/details.css";
</style>
