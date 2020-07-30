<template>
    <div class="diangdan-box" v-title data-title="微心愿">
      <div class="diangdan-main">
        <div class="diangdan-top">
          <div class="img-box"><img :src="detilsDeta.imgUrl"></div>
          <div class="txt-box">
            <div class="title-box">
              <div class="left">{{detilsDeta.name}}</div>
            </div>
            <div class="information-box">
              <div class="information-txt">
                <p class="text-box">爱心积分：{{detilsDeta.score}}</p>
                <p class="text-box">联系人：{{detilsDeta.linkman}}</p>
                <p class="text-box">详细地址：{{detilsDeta.address}}</p>
              </div>
              <div class="btn-box">
                <a :href="'sms:'+detilsDeta.telephone" class="taotao-btn"><van-icon name="chat-o" /> 发消息</a>
                <a :href="'tel:'+detilsDeta.telephone" class="phone-btn"><van-icon name="phone-o" /> 打电话</a>
              </div>
            </div>
          </div>
        </div>
        <div class="diangdan-bottom">
          <p class="title">心愿描述：</p>
          <p class="text">{{detilsDeta.describes}}</p>
        </div>
        <!--status 1进行中 2已领取 3待确认完成 4确认完成-->
        <div v-if="detilsDeta.status==1" @click="clickHelp" class="submit-btn">帮助TA</div>
        <div v-if="detilsDeta.status==2" class="submit-btn submit-active-btn">帮助TA</div>
        <div v-if="detilsDeta.status==3" class="submit-btn submit-active-btn">帮助TA</div>
        <div v-if="detilsDeta.status==4" class="submit-btn submit-active-btn">帮助TA</div>
      </div>
    </div>
</template>

<script>
  import {config} from "../js/httpConfig";
  export default {
    name: "weixingyuanxiangqing",
  data(){
      return{
        img:require('../image/bg-banner2.png'),
        id:'',
        detilsDeta:{},
        nickName:'',
        photo:'',
      }
  },
  created(){
      this.id=this.$route.query.id;
      this.detaDetils();
      this.userInfoData();
  },
  methods:{
      detaDetils(){
        let _this=this;
        $.ajax({
          url:config.wgetById,
          data:{id:this.id},
          success:res=>{
            _this.detilsDeta=res.data;
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
    clickHelp(){
        let _this=this;
        $.ajax({
          url:config.lianxinHelp,
          data:{
            appId:sessionStorage.appId,
            nikeName:this.nickName,
            coreLianxinId:this.id,
            header:this.photo,
          },
          success:res=>{
            if(res.code==200){
              _this.detilsDeta.status=2
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
