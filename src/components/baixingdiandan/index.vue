<template>
    <div class="baixindiandan-box" v-title data-title="百姓点单">
      <div class="bxdd-main">
          <div class="bxdd-content">
            <van-list class="scl-y"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ul class="list-box">
                <li @click="clickDetails(item.id)" v-for="(item,i) in list" :key="i">
                  <div class="img-box"><img :src="item.imgUrl"></div>
                  <p class="txt">{{item.name}}</p>
                </li>
              </ul>
            </van-list>
          </div>
      </div>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";
  export default {
    name: "index",
  data(){
      return{
        img:require('../image/bg-banner1.png'),
        list:[],
        page:1,
        pageSize:10,
        total:'',//总条数
        loading: false,
        finished: false,
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
    sessionStorage.nickName=this.$route.query.nickName;
    sessionStorage.header=this.$route.query.header;
  },
  methods:{
      clickDetails(id){
        this.$router.push('./diandanxiangqing?id='+id)
      },
    getDataList(){
      let _this=this;
      $.ajax({
        url:config.findPageList,
        data:{
          page:this.page,
          pageSize:this.pageSize
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
      this.getDataList();
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
@import "css/style.less";
</style>
