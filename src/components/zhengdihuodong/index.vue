<template>
  <div class="mian-box" v-title data-title="阵地活动">
      <div class="serch-box">
          <div class="left"><input v-model="serch" @input="emptySerch" type="text" placeholder="搜索活动名称"></div>
          <div class="right" @click="getSerch">搜索</div>
      </div>
    <!--列表-->
    <van-list class="scl-y"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <div class="list-box" v-for="(item,i) in list" :key="i" @click="clickDetails(item.id)">
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



  </div>
</template>

<script>
  import {config} from "../js/httpConfig";
  import {pu} from "../js/public"
  export default {
    name: "index",
  data(){
      return{
        loading: false,
        finished: false,
        list:[],
        count:'',
        page:1,
        pageSize:10,
        serch:'',
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
  },
  methods:{
    getdataList(){
      let _this=this;
      $.ajax({
        url:config.pageSearchAll,
        // url:'http://171.211.195.164:8077/common-web/a/position-activity/pageSearchByExample',
        data:{
          page:this.page,
          pageSize:this.pageSize,
          title:this.serch,
        },
        success:res=>{
          _this.list=_this.list.concat(res.data);
          _this.count=res.count;
          _this.page=_this.page+1;
        }
      })
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
    clickDetails(id){
      this.$router.push('./zhengdihuodongxiang?id='+id)
    },
    //搜索
    getSerch(){
      this.list=[];
      this.page=1;
      this.getdataList();
    },
    emptySerch(){
      if(this.serch==""){
        this.list=[];
        this.page=1;
        this.getdataList();
      }
    },

  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/style";
</style>
