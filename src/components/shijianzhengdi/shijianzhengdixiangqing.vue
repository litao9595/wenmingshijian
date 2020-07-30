<template>
    <div style="background: #f5f5f5" v-title data-title="实践阵地">
      <div class="bg-banner" v-if="bgBanner.length">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item class="bg-list" v-for="(item,i) in bgBanner" :kye="item">
            <img class="banner-img" :src="item">
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--详情-->
      <div class="mian-box">
        <p class="name-txt">{{detils.name}}</p>
        <div class="derr-box">
          <div class="place-name">{{detils.address}}</div>
          <div class="navigation" @click="daohang">去这里</div>
          <a :href="'tel:'+detils.administratorPhone" class="contact">联系我们</a>
        </div>
        <div class="title-box">
          <div class="title-name">站所介绍</div>
        </div>
        <div class="content-txt">{{detils.description}}</div>
      </div>

      <div class="mian-box">
        <div class="title-box">
          <div class="title-name">{{detils.name}}风采</div>
        </div>
        <div v-if="detils.imgUrl" class="img-box">
          <img :src="detils.imgUrl">
        </div>
        <div class="title-box" style="margin-top: 0.5rem">
          <div class="title-name">阵地活动</div>
        </div>
      </div>


    </div>
</template>

<script>
  import {config} from "../js/httpConfig";
  export default {
    name: "shijianzhengdixiangqing",
  data(){
      return{
        detils:{},
        bgBanner:[],
        id:'',
      }
  },
  created(){
      this.id=this.$route.query.id;
      this.getdetis();
  },
  methods:{
    getdetis(){
      let _this=this;
      $.ajax({
        url:config.zsgetById,
        data:{id:this.id},
        success:res=>{
          _this.detils=res.data;
          _this.bgBanner=res.data.practiceImgUrl.split(",")
        }
      })
    },
    //导航
    daohang(){
      let _address=this.detils.address+this.detils.name;
      let _url="http://api.map.baidu.com/geocoder?address="+_address+"&output=html&src=webapp.baidu.openAPIdemo";
      window.location.href=_url
    },
  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "css/detilsStyle";
</style>
