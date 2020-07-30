<template>
    <div v-title data-title="团队申请">
      <div class="banner-box"></div>
      <div class="add-team" @click="clickAddTeam">
        <van-icon name="friends-o" />创建团队
      </div>
      <div class="main-box">
        <div class="serch-box">
            <div class="left"><input type="text" v-model="serchName" @input="serchChange($event)"/></div>
            <div class="right">
              <p @click="serchSubmit">搜索</p>
            </div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul class="team-box">
            <li @click="clickJump(item.id)" v-for="(item,i) in list" :kye="item.id">
              <div class="left"></div>
              <div class="right">
                <p class="title">{{item.name}}</p>
                <p class="team-txt">团队人数：{{item.teamNum}}</p>
                <p class="team-txt">负责人：{{item.dutyName}}</p>
                <p class="team-txt">联系电话：{{item.dutyPhone}}</p>
              </div>
            </li>
            <!--<li>-->
              <!--<div class="left"></div>-->
              <!--<div class="right">-->
                <!--<p class="title">眉山市粮食局志愿者服务团队</p>-->
                <!--<p class="team-txt">团队人数：0</p>-->
                <!--<p class="team-txt">负责人：孙绍全</p>-->
                <!--<p class="team-txt">联系电话：18990326819</p>-->
              <!--</div>-->
            <!--</li>-->
          </ul>
        </van-list>
      </div>
      <p v-if="nodata" class="no-data">未查询到相关内容</p>
    </div>
</template>

<script>
  import {config} from '../js/httpConfig'
export default {
    name: "index",
  data(){
      return{
        appId:'',
        centerId:'',
        volunteerStatus:'',//-1非志愿者 0志愿者审核中 1已通过志愿者审核
        list: [],
        loading: false,
        finished: false,
        pageNo:1,
        pageSize:10,
        total:'',//总条数
        serchName:'',
        nodata:false,
      }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
    this.appId=this.$route.query.userId;
    this.centerId=this.$route.query.centerId;
    this.isVolunteer();
    this.getList();
  },
  methods:{
      clickJump(id){
        this.$router.push('./tuanduixiangqing?id='+id)
      },
    clickAddTeam(){
      //-1非志愿者 0志愿者审核中 1已通过志愿者审核
        if(this.volunteerStatus==-1){
          this.$toast("请先注册志愿者")
        }else if(this.volunteerStatus==0){
          this.$toast("志愿者审核中,待通过后再试")
        }else{
          this.$router.push('./chuangjiantuandui')
        }
    },
    isVolunteer(){
        let _this=this;
        $.ajax({
          url:config.findAppUserType,
          data:{
            appId:this.appId,
          },
          success:res=>{
            _this.volunteerStatus=res.data.volunteerStatus
          }
        })
    },
    getList(){
        let _this=this;
        $.ajax({
          url:config.findVolunteerTeamPageList,
          async:false,
          data:{
            pageNo:this.pageNo,
            pageSize:this.pageSize,
            name:this.serchName,
          },
          success:res=>{
            if(res.status==200){
              res.data.length?_this.nodata=false:_this.nodata=true;
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
    serchSubmit(){
        if(this.serchName==""){
          this.$toast('搜索内容不能为空')
        }else{
          this.list=[];
          this.pageNo=1;
          this.getList();
        }
    },
    serchChange(e){
        let val=e.target.value;
        if(val==''){
          this.list=[];
          this.pageNo=1;
          this.getList();
        }
    },
  },
}
</script>

<style scoped>
@import "css/style.css";
</style>
