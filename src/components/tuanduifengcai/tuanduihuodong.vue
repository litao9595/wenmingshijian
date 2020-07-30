<template>
    <div style="background: #ccc">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="box-box">
          <li class="my-list-box" v-for="(item,i) in list" :key="i">
            <p class="title">{{item.createDate}}</p>
            <p class="name">{{item.title}}</p>
            <div class="content-box"><video :src="item.videoPath" controls="controls"></video></div>
            <div class="content-box" v-for="(mylist,index) in item.imagePath.split(',')" :key="index"><img :src="mylist"></div>
            <p class="name">{{item.introduction}}</p>
          </li>
        </ul>

      </van-list>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";
  export default {
        name: "tuanduihuodong",
      data(){
          return{
            id:'',
            loading: false,
            finished: false,
            list:[],
            pageNo:1,
            pageSize:10,
            total:'',//总条数

          }
      },
      created(){
          this.id=this.$route.query.id;
          // this.getDateTeam();
      },
      methods:{
        getDateTeam(){
          let _this=this;
          $.ajax({
            url:config.findVolunteerTeamSceneryPageList,
            data:{
              volunteerTeamId:this.id,
              pageNo:this.pageNo,
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
          this.getDateTeam();
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
