<template>
    <div class="hom-box" v-title data-title="志愿活动">
      <div class="add-btn"><span @click="clickAdd">发起活动</span></div>
      <div class="serch-box">
        <div class="left"><input v-model="serchData.titleOrTeamName" placeholder="搜索活动名称/团队名称" type="text"/></div>
        <div class="right">
          <p @click="getSerch">搜索</p>
        </div>
      </div>
      <div class="whole-box">
        <div class="left">全部</div>
        <div class="content-txt">{{serchData.serviceType}}</div>
        <div class="right" @click="duoxuanState=true"></div>
      </div>
      <div class="screen-box">
          <div class="state-box" @click="lianjixialaState=true">{{stateTypeTxt}}</div>
          <div class="state-box" @click="datetimeState=true">{{beginTimeTxt}}</div>
          <div class="empty-box" @click="clickRest">清空</div>
      </div>
      <van-list class="scl-y"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="list-box" style="border-bottom: solid 0.1rem #f5f5f5;padding: 0.5rem 0rem;" @click="clickDetails(item.id)" v-for="(item,i) in list">
          <div class="title-box">{{item.title}}
            <span v-if="item.stateType==2">招募中</span>
            <span v-if="item.stateType==3">招募结束</span>
            <span v-if="item.stateType==4">活动中</span>
            <span v-if="item.stateType==5">活动结束</span>
          </div>
          <div class="text-box">
            <div class="left">团队名称：</div>
            <div class="right">{{item.teamName}}</div>
          </div>
          <div class="text-box">
            <div class="left">招募人数：</div>
            <div class="right"><span>{{item.joinNumber}}</span>/{{item.targetNumber}}</div>
          </div>
          <div class="text-box-2">
            <div class="left">招募结束时间：</div>
            <!--<div class="right"><span>0</span>天<span>0</span>时<span>0</span>分</div>-->
            <div class="right" v-html="updategetYMDhms(item.recruitEndTime)"></div>
          </div>
          <div class="text-box">
            <div class="left">活动时间：</div>
            <div class="right">{{item.beginTime.split(" ")[0]}} 至 {{item.endTime.split(" ")[0]}}</div>
          </div>
          <div class="text-box">
            <div class="left">活动地址：</div>
            <div class="right">{{item.address}}</div>
          </div>
        </div>
      </van-list>
      <!--联级下拉-->
      <lianjixiala v-if="lianjixialaState" :lj="stateType" @lianjixialaData="lianjiData"></lianjixiala>
      <!--时间选择-->
      <dateTime v-if="datetimeState" :timeType="timeType" @datetimeData="datetimeselctData"></dateTime>
      <!--多选-->
      <duoxuan v-if="duoxuanState" :myDuoxuanData="serviceType" @duoxuanData="getData"></duoxuan>
    </div>
</template>

<script>
import {config} from "../js/httpConfig";
import {pu} from "../js/public";
import duoxuan from '@/components/publicMould/duoxuan' //多选下拉
import lianjixiala from '@/components/publicMould/lianjixiala' //联级下拉
import dateTime from '@/components/publicMould/dateTime' //时间下拉
  export default {
    name: "home",
    components:{duoxuan,lianjixiala,dateTime},
  data(){
      return{
        list:[],
        page:1,
        pageSize:10,
        total:"",
        serchData:{
          titleOrTeamName:'',//团队名搜索
          beginTime:'',//活动时间搜索
          stateType:'',//状态搜索
          serviceType:'',//服务类型搜索
        },
        loading: false,
        finished: false,
        lianjixialaState:false,
        stateType:[],
        stateTypeTxt:'活动状态',
        datetimeState:false,
        timeType:'datetime',
        beginTimeTxt:'选择日期',
        duoxuanState:false,
        serviceType:[],
        volunteerStatus:'',//-1非志愿者 0志愿者审核中 1已通过志愿者审核
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
    sessionStorage.nickName=this.$route.query.nickName;
    sessionStorage.header=this.$route.query.header;
    this.stateType=[
      {id:2,text:'招募中'},
      {id:3,text:'招募结束'},
      {id:4,text:'活动中'},
      {id:5,text:'活动结束'},
    ];
    this.findAllServiceSortData();
    this.isVolunteer();
  },
  methods:{
    clickAdd(){
      //-1非志愿者 0志愿者审核中 1已通过志愿者审核
      if(this.volunteerStatus==-1){
        this.$toast("请先注册志愿者")
      }else if(this.volunteerStatus==0){
        this.$toast("志愿者审核中,待通过后再试")
      }else{
        this.$router.push('./index')
      }
    },
    clickDetails(id){
      this.$router.push('./addActivityDetails?id='+id)
    },
    getdataList(){
      let _this=this;
      $.ajax({
        url:config.findActivityPageByCondition,
        data:{
          page:this.page,
          pageSize:this.pageSize,
          titleOrTeamName:this.serchData.titleOrTeamName,
          beginTime:this.serchData.beginTime,
          stateType:this.serchData.stateType,
          serviceType:this.serchData.serviceType
        },
        success:res=>{
          _this.list=_this.list.concat(res.data);
          _this.count=res.count;
          _this.page=_this.page+1;
        }
      })
    },
    //倒计时显示处理
    updategetYMDhms(time){
      let _time=time.split(" ")[0];
      _time=_time.split("-");
      let _arr=pu.showCountDown(parseInt(_time[0]),parseInt(_time[1]),parseInt(_time[2]));
      let yer=_arr.y;
      let h=_arr.h;
      let m=_arr.m;
      if(yer<0){
        return "<span style='color: #f75959;'>0</span>天<span style='color: #f75959;'>0</span>时<span style='color: #f75959;'>0</span>分"
      }else{
        return "<span style='color: #f75959;'>"+yer+"</span>天<span style='color: #f75959;'>"+h+"</span>时<span style='color: #f75959;'>"+m+"</span>分"
      }

    },
    //搜索
    getSerch(){
      this.list=[];
      this.page=1;
      this.getdataList();
    },
    onLoad(){
      this.getdataList();
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.list.length >= this.total) {
        this.finished = true;
      }
    },
    clickRest(){
      this.list=[];
      this.page=1;
      this.stateTypeTxt='活动状态';
      this.beginTimeTxt='选择日期';
      this.serchData={
        titleOrTeamName:'',
          beginTime:'',
          stateType:'',
          serviceType:'',
      };
      this.getdataList();
    },
    lianjiData(state){
      this.lianjixialaState=false;
      if(state){
        this.stateTypeTxt=state.text;
        this.serchData.stateType=state.id;
        this.list=[];
        this.page=1;
        this.getdataList();
      }
    },
    datetimeselctData(state){
      this.datetimeState=false;
      if(state){
        this.beginTimeTxt=state;
        this.serchData.beginTime=state;
        this.list=[];
        this.page=1;
        this.getdataList();
      }
    },
    getData(state){
      if(state.length){
        for(let i=0; i<state.length; i++){
          if(state[i].status){
            if(this.serchData.serviceType==""){
              this.serchData.serviceType+=state[i].itemName
            }else{
              this.serchData.serviceType+=","+state[i].itemName
            }
          }
        };
        this.list=[];
        this.page=1;
        this.getdataList();
      };
      this.duoxuanState=false;
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
            _this.serviceType=_arr
          }else{
            _this.$toast('服务类别获取失败')
          }
        }
      })
    },
    //查询志愿者身份
    isVolunteer(){
      let _this=this;
      $.ajax({
        url:config.findAppUserType,
        data:{
          appId:sessionStorage.appId,
        },
        success:res=>{
          _this.volunteerStatus=res.data.volunteerStatus
        }
      })
    },

  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/home";
</style>
