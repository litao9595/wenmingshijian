<template>
  <div class="detalis-box" v-title data-title="我的">
    <div class="detisl-content">
      <div class="title">{{detils.title}}<span>已接单</span></div>
      <p class="txt-box">类型：求助</p>
      <p class="txt-box">联系人：张先生</p>
      <p class="txt-box">联系电话：15883462129</p>
      <p class="txt-box">所属区域：成都市武侯区</p>
      <p class="txt-box">详细地址：人民南路755号</p>
      <div class="map-box"></div>
    </div>
    <div class="detisl-content">
      <p class="title-2">活动介绍</p>
      <div class="details-img"><img :src="img"></div>
      <div class="details-img"><img :src="img"></div>
    </div>
  </div>
</template>

<script>
import {config} from "../js/httpConfig";
export default {
  name: "wodexiangqing",
  data(){
      return{
        img:require('../image/bg-banner3.png'),
        id:'',
        type:'',// 1微心愿 2百姓点单 3困难求助 4志愿者活动
        url:'',
        detils:{},
      }
  },
  created(){
    this.id=this.$route.query.id;
    this.type=this.$route.query.type;
    if(this.type==1){
      this.url=config.wgetById;
    }else if(this.type==2){
      this.url=config.getById;
    }else if(this.type==3){
      this.url=config.findDetailHelpOrderById;
    }else if(this.type==4){
      this.url=config.findActivityById;
    }
    this.severDetils();
  },
  methods:{
    //志愿活动详情
    severDetils(){
      let _this=this;
      $.ajax({
        url:this.url,
        data:{id:this.id},
        success:res=>{
          _this.detils=res.data;
        }
      })
    },


  },
}
</script>

<style scoped>
@import "css/details.css";
</style>
