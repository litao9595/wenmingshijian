<template>
<div class="details-box"  v-title data-title="志愿活动">
  <div class="content-box">
    <div class="title-box">
      <div class="left">{{detils.title}}</div>
      <div class="right" v-if="detils.stateType==2">招募中</div>
      <div class="right" v-if="detils.stateType==3">招募结束</div>
      <div class="right" v-if="detils.stateType==4">活动中</div>
      <div class="right" v-if="detils.stateType==5">活动结束</div>
    </div>
    <p class="text-box">所在地区：{{detils.area}}</p>
    <p class="text-box">招募人数：<span>{{detils.joinNumber}}</span>/{{detils.targetNumber}}</p>
  </div>
  <div class="content-box">
    <div class="text-box">服务类型：{{detils.serviceType}}</div>
    <div class="text-box">服务对象：{{detils.serviceTarget}}</div>
    <div class="text-box">公开范围：{{detils.recruitTarget}}</div>
    <div class="text-box">服务时长：{{detils.serviceTime}}</div>
    <div class="text-box">签到方式：定位签到</div>
    <div class="text-box">联系人：{{detils.linkmanName}}</div>
    <div class="text-box">联系电话：{{detils.linkmanMobile}}</div>
    <div class="text-box">报名时间：{{timeHandle(detils.recruitTime)}}-{{timeHandle(detils.recruitEndTime)}}</div>
    <div class="text-box">活动时间：{{timeHandle(detils.beginTime)}}-{{timeHandle(detils.endTime)}}</div>
    <div class="text-box">活动地址：{{detils.address}}</div>
    <div class="map-box"  style="height: 5rem; background: #ccc; margin-top: 0.2rem">
      <mapBox :dizhi="detils.address"></mapBox>
    </div>
  </div>
  <div class="content-box">
    <p class="title-2">活动介绍</p>
    <p class="text-box" style="padding: 0.2rem 0rem">{{detils.contentDescription}}</p>
    <p class="title-2">
      <span>招募条件</span>
    </p>
    <ul class="biaoqian">
      <li>{{detils.recruitTarget}}</li>
    </ul>
  </div>
  <div class="content-box">
    <p class="title-2">
      <span>活动介绍</span>
      <i @click="max=100" v-if="max!=100">查看所有</i>
    </p>
    <div class="volunteer-list" v-for="(item,i) in volunteer" :key="i" v-if="max>i">
      <div class="left">
        <div class="avatar-box"></div>
        <div class="user-name">{{item.nikeName}}</div>
      </div>
      <div class="right">服务时长：<span>{{item.serviceTime}}小时</span></div>
    </div>
  </div>
  <div v-if="detils.stateType==5" class="submit-btn submit-active-btn">活动结束</div>
  <div v-if="detils.stateType!=5" class="submit-btn" @click="clickParticipate">参加</div>
</div>
</template>

<script>
import {config} from "../js/httpConfig";
import mapBox from '@/components/publicMould/mymap' //地图
export default {
  name: "addActivityDetails",
  components:{mapBox},
  data(){
    return{
      id:'',
      detils:{},
      volunteer:[],//参与活动志愿者
      max:2,
      nickName:sessionStorage.nickName,
      photo:sessionStorage.photo,
      userVolunteer:{},//用户身份
    }
  },
  created(){
    this.id=this.$route.query.id;
    this.detaDelist();
    this.zhiyuanzhe();
    // this.userInfoData();
    this.getFindAppUserType();
  },
  methods:{
    //活动详情
    detaDelist(){
      let _this=this;
      $.ajax({
        url:config.findActivityById,
        data:{id:this.id},
        success:res=>{
          _this.detils=res.data;
        }
      })
    },
    //报名志愿者
    zhiyuanzhe(){
      let _this=this;
      $.ajax({
        url:config.findActivityJoinByActivityId,
        data:{id:this.id},
        success:res=>{
          _this.volunteer=res.data;
        }
      })
    },
    //时间处理
    timeHandle(time){
      let _time=time+"";
      _time=_time.split(" ")[0];
      let _t=_time.split("-");
      return _t[0]+"."+_t[1]+"."+_t[2]
    },
    //参加
    clickParticipate(){
      let _this=this;
      if(this.userVolunteer.volunteerStatus!=1){
        // 0待审核,1审核通过,2审核未通过,-1未注册
        _this.$toast("你还不是志愿者");
        return
      }
      let appUserType;
      if(this.userVolunteer.volunteerTeamStatus==1){
        //团队
        appUserType=2;
      }else{
        appUserType=1
      }
      // volunteerTeamStatus 1团队
      $.ajax({
        url:config.join,
        data:{
          activityId:this.id,
          appId:sessionStorage.appId,
          nickName:this.nickName,
          header:this.photo,
          appUserType:appUserType,//app用户类型 1代表志愿者, 2代表志愿者团队
        },
        success:res=>{
          _this.$toast(res.message)
        }
      })
    },
    //获取两微一端用户信息
    userInfoData(){
      let _this=this;
      $.ajax({
        url:config.getStatisticsByUserId,
        dataType:'json',
        data:{userId:sessionStorage.appId},
        success:res=>{
          _this.nickName=res.data.appUser.nickName;
          _this.photo=res.data.appUser.photo;
        }
      })
    },
    //获取用户类型
    getFindAppUserType(){
      let _this=this;
      $.ajax({
        url:config.findAppUserType,
        data:{appId:sessionStorage.appId},
        success:res=>{
          _this.userVolunteer=res.data;
        }
      })
    },
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/details";
</style>
