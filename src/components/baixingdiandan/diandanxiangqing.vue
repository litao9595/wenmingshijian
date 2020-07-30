<template>
    <div class="diangdan-box" v-title data-title="百姓点单">
        <div class="diangdan-main">
          <div class="diangdan-top">
            <div class="img-box"><img :src="img"></div>
            <div class="txt-box">
              <div class="title-box">
                <div class="left">{{detailsData.name}}</div>
                <div class="right">
                  <div class="icon-box"><van-icon class="zan" name="good-job-o" /><span>{{detailsData.dianZhanNum}}/{{detailsData.needNum}}</span></div>
                </div>
              </div>
              <p class="text-box">发布单位：{{detailsData.publishUnit}}</p>
              <p class="text-box">联系电话：{{detailsData.telephone}}</p>
              <p class="text-box">活动地址：{{detailsData.taskAddress}}</p>
            </div>
          </div>
          <div class="diangdan-bottom">
              <p class="title">内容描述：</p>
              <p class="text">{{detailsData.content}}</p>
          </div>
          <div :class="detailsData.isDianzZhan?'submit-btn submit-active-btn':'submit-btn'" @click="clickPartake">我要参与</div>
        </div>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";

  export default {
    name: "diandanxiangqing",
  data(){
      return{
        img:require('../image/bg-banner1.png'),
        id:'',
        detailsData:{},
        nickName:sessionStorage.nickName,//用户名
        photo:sessionStorage.photo,
      }
  },
  created(){
      this.id=this.$route.query.id;
      this.getDetils();
      // this.userInfoData();
  },
  methods:{
    getDetils(){
      let _this=this;
      $.ajax({
        url:config.getById,
        data:{
          id:this.id,
          appId:sessionStorage.appId
        },
        success:res=>{
          _this.detailsData=res.data
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
    //我要参与
    clickPartake(){
      let _this=this;
      $.ajax({
        url:config.orderDianzhan,
        data:{
          appId:sessionStorage.appId,
          nikeName:this.nickName,
          coreOrderId:this.id,
          header:this.photo,
        },
        success:res=>{
          if(res.code==200){
            _this.detailsData.isDianzZhan=1
          }
          _this.$toast(res.msg)
        }
      })
    },
  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/style";
</style>
