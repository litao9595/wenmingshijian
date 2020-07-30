<template>
    <div class="detalis-box" v-title data-title="困难求助">
      <div class="detisl-content">
          <div class="title">{{detils.title}}
            <span v-if="detils.receiveStatus==0">待接单</span>
            <span v-if="detils.receiveStatus==1">进行中</span>
            <span v-if="detils.receiveStatus==2">待确认</span>
            <span v-if="detils.receiveStatus==3" class="complete">已完成</span>
          </div>
        <!--0咨询,1投诉,2求助,3建议,4意见,5其他-->
          <p class="txt-box" v-if="detils.hardType==0">类型：咨询</p>
          <p class="txt-box" v-if="detils.hardType==1">类型：投诉</p>
          <p class="txt-box" v-if="detils.hardType==2">类型：求助</p>
          <p class="txt-box" v-if="detils.hardType==3">类型：建议</p>
          <p class="txt-box" v-if="detils.hardType==4">类型：意见</p>
          <p class="txt-box" v-if="detils.hardType==5">类型：其他</p>
          <p class="txt-box">联系人：{{detils.name}}</p>
          <p class="txt-box">联系电话：{{detils.phone}}</p>
          <p class="txt-box">所属区域：{{detils.orgName}}</p>
          <p class="txt-box">详细地址：{{detils.address}}</p>
          <div class="map-box">
            <mapBox :dizhi="detils.address" style="height: 100%;"></mapBox>
          </div>
      </div>
      <div class="detisl-content">
        <p class="title-2">活动介绍</p>
        <div class="details-img">{{detils.hardDescription}}</div>
        <div v-if="detils.imgUrl">
          <div class="details-img" v-if="detils.imgUrl.split(',').length==1"><img :src="detils.imgUrl.split(',')[0]"></div>
          <div class="details-img" v-if="detils.imgUrl.split(',').length==2"><img :src="detils.imgUrl.split(',')[1]"></div>
          <div class="details-img" v-if="detils.imgUrl.split(',').length==3"><img :src="detils.imgUrl.split(',')[2]"></div>
        </div>
        <div class="details-img" v-if="detils.videoUrl">
          <video :src="detils.videoUrl"></video>
        </div>
      </div>
      <div class="submit-btn" @click="clickLianxinHelp">确定</div>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";
  import mapBox from '@/components/publicMould/mymap' //地图
  export default {
    name: "qiuzhuxiangqing",
    components:{mapBox},
  data(){
      return{
        id:'',
        detils:{},
        nickName:sessionStorage.nickName,//用户名
        photo:sessionStorage.photo,//用户头像
      }
  },
  created(){
      this.id=this.$route.query.id;
      this.getDetils();
      // this.userInfoData();
  },
  methods:{
      //获取详情
    getDetils(){
      let _this=this;
      $.ajax({
        url:config.findDetailHelpOrderById,
        data:{id:this.id},
        success:res=>{
          if(res.status==200){
            _this.detils=res.data;
          }else{
            _this.$toast(res.message)
          }
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
    //帮助他
    clickLianxinHelp(){
      let _this=this;
      $.ajax({
        url:config.lianxinHelp,
        data:{
          appId:sessionStorage.appId,//用户id
          nikeName:this.nickName,//用户昵称
          coreLianxinId:this.id,//心愿主键
          header:this.photo,//用户头像
        },
        success:res=>{
          if(res.status==200){
            _this.$router.push("/kunnanqiuzhu/index")
          }else{
            _this.$toast(res.message)
          }
        }
      })
    },
  },
}
</script>

<style scoped>
@import "css/style.css";
</style>
