<template>
    <div class="main-box" v-title data-title="困难求助">
        <div class="add-seek-help" @click="clickLaunch">发起求助</div>
        <div class="content-box">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul class="list-box">
              <li @click="clickDetails(item.id)" v-for="(item,i) in list" :key="item.id">
                <div class="left"></div>
                <div class="right">
                  <p class="title">{{item.title}}
                    <span v-if="item.receiveStatus==0">待接单</span>
                    <span v-if="item.receiveStatus==1">进行中</span>
                    <span v-if="item.receiveStatus==2">待确认</span>
                    <span v-if="item.receiveStatus==3" class="complete">已完成</span>
                  </p>
                  <p class="txt">地址：{{item.orgName}}</p>
                  <p class="txt">详细地址：{{item.address}}</p>
                </div>
              </li>
            </ul>
          </van-list>

        </div>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";
  export default {
    name: "index",
  data(){
      return{
        list:[],
        pageNo:1,
        pageSize:10,
        loading: false,
        finished: false,
        total:'',//总条数
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
    sessionStorage.nickName=this.$route.query.nickName;
    sessionStorage.header=this.$route.query.header;
      this.listGetData();
  },
  methods:{
    listGetData(){
      let _this=this;
      $.ajax({
        url:config.findHelpOrderPageList,
        async:false,
        data:{
          pageNo:this.pageNo,
          pageSize:this.pageSize,
        },
        success:res=>{
          if(res.status==200){
            _this.total=res.data.total;
            _this.pageNo=_this.pageNo+1;
            _this.list=_this.list.concat(res.data.list)
          }else{
            _this.$toast(res.message)
          }
        }
      })
    },
    onLoad(){
      this.listGetData();
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.list.length >= this.total) {
        this.finished = true;
      }
    },
    clickDetails(id){
      this.$router.push('./qiuzhuxiangqing?id='+id);
    },
    clickLaunch(){
        this.$router.push('./faqiqiuzhu')
      },
  },
}
</script>

<style scoped>
@import "css/style.css";
</style>
