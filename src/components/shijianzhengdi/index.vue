<template>
    <div class="zhengdi-shijian" v-title data-title="实践阵地">
        <div class="map-box" style="background: #ccc">
          <div class="map-content">
            <baidu-map :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" class="bm-view">
              <!--<bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>-->
              <bm-info-window :position="center" :show="infoWindow" :closeOnClick="close">
                <p class="my-title" @click="skipDetils">{{list[index].name}}</p>
                <p class="my-address" @click="skipDetils">{{list[index].address}}</p>
                <div class="my-cover" @click="skipDetils" v-if="list[index].imgUrl"><img :src="list[index].imgUrl"></div>
                <div class="my-contact">
                  <a :href="'tel:'+list[index].administratorPhone" class="left">联系我们</a>
                  <div class="right" @click.stop="daohang(index)">去这里</div>
                </div>
              </bm-info-window>

            </baidu-map>
          </div>
        </div>
        <div class="zhengdi-main">
            <div class="serch-box">
              <div class="left"><input type="text"  @input="search($event)" v-model="name" placeholder="请输入站点名称搜索"/></div>
              <div class="right" @click="getserch">搜索</div>
            </div>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="list-box" v-for="(item,i) in list" :key="i" @click="clickList(i)">
              <div class="left">
                <p>{{item.name}}</p>
                <div>地址：{{item.address}}</div>
              </div>
              <div class="right" @click.stop="daohang(i)">
                <div></div>
                <p>路线</p>
              </div>
            </div>
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
      name:'',
      page:1,
      pageSize:10,
      list:[],
      loading: false,
      finished: false,
      total:'',

      center: {lng: 0, lat: 0},
      zoom: 5,
      address:'成都市',
      active:'',
      infoWindow:true,
      close:false,
      index:0,
    }
  },
  created(){
    sessionStorage.appId=this.$route.query.userId;
    sessionStorage.centerId=this.$route.query.centerId;
    this.listData();
  },
  methods:{
    listData(){
      let _this=this;
      $.ajax({
        url:config.zsfindPageList,
        data:{
          page:this.page,
          pageSize:this.pageSize,
          name:this.name,
        },
        success:res=>{
          _this.total=res.data.total;
          _this.page=_this.page+1;
          _this.list=_this.list.concat(res.data.list);
          _this.address=_this.list[0].address+_this.list[0].name
        }
      })
    },
    onLoad(){
      this.listData();
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.list.length >= this.total) {
        this.finished = true;
      }
    },
    //搜索
    getserch(){
      this.list=[];
      this.page=1;
      this.listData();
    },
    search(event){
      if(this.name==""){
        this.list=[];
        this.page=1;
        this.listData();
      }
    },
    clickList(i){
      this.index=i;
      this.center={
        lng: this.list[i].addressLng,
        lat: this.list[i].addressLat
      }
    },
    skipDetils(){
      this.$router.push("./shijianzhengdixiangqing?id="+this.list[this.index].id)
    },
    //地图
    handler ({BMap, map}) {
      //地址逆解析
      let _this=this;
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(_this.address, function(point){
          // console.log(point.lat)
          _this.center.lng = point.lng; //经度
          _this.center.lat = point.lat;//纬度
          _this.zoom = 15;
        },
        "四川省");
    },
    //导航
    daohang(i){
      let _address=this.list[i].address+this.list[i].name;
      let _url="http://api.map.baidu.com/geocoder?address="+_address+"&output=html&src=webapp.baidu.openAPIdemo";
      console.log(_url);
      window.location.href=_url
    },

  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "css/style";
</style>
