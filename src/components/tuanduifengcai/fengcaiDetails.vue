<template>
    <div class="team-main"  v-title data-title="团队风采">
      <div class="content-box">
        <div class="head-box">
          <div class="left"><img :src="img"></div>
          <div class="right">
            <div class="head-title">{{detils.name}}</div>
            <p class="duration-txt">服务时长：{{detils.teamServiceTime}}</p>
            <p class="duration-txt">所在地区：{{detils.area}}</p>
          </div>
        </div>
      </div>
      <div class="content-box">
        <p class="text-txt">团队地址：{{detils.detailAddress}}</p>
        <p class="text-txt" v-if="detils.registrationStatus==1">团队类型：法人组织</p>
        <p class="text-txt" v-if="detils.registrationStatus==3">团队类型：未登记志愿者服务组织</p>
        <p class="text-txt">成立时间：{{detils.establishmentTime}}</p>
        <p class="text-txt">挂靠团队：{{detils.contactTeamName}}</p>
        <p class="text-txt">内容描述：{{detils.serviceType}}</p>
        <p class="text-txt">成员数量：{{detils.teamNum}}</p>
        <p class="text-txt">活动数量：{{detils.enjoyActivityNum}}</p>
        <p class="text-txt">联系人：{{detils.dutyName}}</p>
        <p class="text-txt">联系电话：{{detils.contactPhone}}</p>
      </div>
      <!--团队简介-->
      <div class="content-box">
        <div class="icon-title">
          <div class="left">
            <img :src="tdjjImg">
            <span>团队简介</span>
          </div>
        </div>
        <p class="describe-txt">{{detils.introduction}}</p>
      </div>
      <!--团队活动-->
      <div class="content-box">
        <div class="icon-title">
          <div class="left">
            <img :src="tdhdImg">
            <span>团队活动</span>
          </div>
          <div class="right" @click="clickHuodong">查看更多</div>
        </div>
        <!--<p class="describe-txt">的色粉色法</p>-->
      </div>
      <!--团队成员-->
      <div class="content-box">
        <div class="icon-title">
          <div class="left">
            <img :src="tdcyImg">
            <span>团队成员</span>
          </div>
        </div>
        <div class="volunteer-list" v-for="(item,i) in teamMembersList">
          <div class="left">
            <div class="avatar-box"></div>
            <div class="user-name">{{item.name}}</div>
          </div>
          <div class="right">服务时长：<span>{{item.serviceTime}}小时</span></div>
        </div>

      </div>
      <div class="join-us" @click="joinTheTeam">
        <img :src="jrwmImg">
        <p>加入我们</p>
      </div>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";

  export default {
    name: "fengcaiDetails",
  data(){
      return{
        img:require('../image/02.png'),
        tdjjImg:require('../image/icon-tdjj.png'),
        tdhdImg:require('../image/icon-tdhd.png'),
        tdcyImg:require('../image/icon-tdcy.png'),
        jrwmImg:require('../image/03.png'),
        id:'',
        detils:{},
        teamMembersList:[],
        volunteerData:{},//志愿者信息
        submit:false,
      }
  },
  created(){
    this.id=this.$route.query.id;
    this.isMember();
    this.teamDetils();
    this.teamMembers();
    this.volunteerInformation();
  },
  methods:{
      teamDetils(){
        let _this=this;
        $.ajax({
          url:config.findDetailVolunteerTeamById,
          data:{id:this.id},
          success:res=>{
            _this.detils=res.data;
          }
        })
      },
      clickHuodong(){
        this.$router.push("./tuanduihuodong?id="+this.id)
      },
    //团队成员
    teamMembers(){
        let _this=this;
        $.ajax({
          url:config.findTeamMemberByVolunteerTeamId,
          data:{
            id:this.id,
            pageNo:1,
            pageSize:2
          },
          success:res=>{
            _this.teamMembersList=res.data.list;
          }
        })
    },
    //查询志愿者信息
    volunteerInformation(){
        let _this=this;
        $.ajax({
          url:config.findVolunteer,
          data:{appId:sessionStorage.appId},
          success:res=>{
            _this.volunteerData=res.data;
          }
        })
    },
    //加入团队
    joinTheTeam(){
        let _this=this;
        if(!this.volunteerData){
          this.$toast("您还不是志愿者，请先注册志愿者")
        }
        if(!this.submit){
          this.$toast("你已是该团队成员")
        }
        $.ajax({
          url:config.saveVolunteerTeamMember,
          data:{
            name:this.volunteerData.volunteerName,//用户名称
            appId:sessionStorage.appId,
            volunteerTeamId:this.id,//团队主键
            sex:this.volunteerData.sex,
            phone:this.volunteerData.telephone,
            head:'',//用户头像
            checkStatus:0,//0为提交申请加入志愿团队，为1为同意加入该志愿团队，为2为拒绝加入该志愿团队
          },
          success:res=>{
            _this.$toast(res.message)
          }
        })
    },
    //判断该成员是否是该团队的成员
    isMember(){
      let _this=this;
      $.ajax({
        url:config.judgeAppUserIsTeamMember,
        async:false,
        data:{
          volunteerTeamId:this.id,//团队id
          appId:sessionStorage.appId
        },
        success:res=>{
          if(res.data.isTeamMember){
            //成员
            _this.submit=false
          }else{
            //非成员
            _this.submit=true;
          }
        }
      })
    },


  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/style";
</style>
