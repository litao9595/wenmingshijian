<template>
    <div v-title data-title="团队风采">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="list-box">
          <li @click="clickDetails(item.id)" v-for="(item,i) in list">
            <div class="cover-img"><img :src="img"></div>
            <div class="list-txt-box">
              <div class="team-txt">{{item.name}}</div>
              <div class="location-box">
                <div class="left"></div>
                <div class="right">{{item.area}}</div>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";

  export default {
    name: "index",
  data(){
      return{
        img:require('../image/02.png'),
        loading: false,
        finished: false,
        list:[],
        pageNo:1,
        pageSize:10,
        total:'',//总条数
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
  },
  methods:{
      clickDetails(id){
        this.$router.push('./fengcaiDetails?id='+id)
      },
    getList(){
      let _this=this;
      $.ajax({
        url:config.findVolunteerTeamPageList,
        async:false,
        data:{
          pageNo:this.pageNo,
          pageSize:this.pageSize,
        },
        success:res=>{
          if(res.status==200){
            // res.data.length?_this.nodata=false:_this.nodata=true;
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
      this.getList();
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.list.length >= this.total) {
        this.finished = true;
      }
    },


  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/style";
</style>
