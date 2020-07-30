<template>
    <div style="background: #f5f5f5" v-title data-title="文明实践">
      <div class="bg-banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item class="bg-list" v-for="(item,i) in bgBanner" :kye="item">
            <img class="banner-img" :src="item">
            <ul class="statistics-data" v-if="i==2">
              <li>
                <p>17.95万</p>
                <div>志愿者总人数</div>
              </li>
              <li>
                <p>17.95万</p>
                <div>志愿团队数量</div>
              </li>
              <li>
                <p>17.95万</p>
                <div>总服务量</div>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--栏目列表-->
      <div class="column-box">
        <van-swipe class="my-swipe" indicator-color="blue" indicator-size="10">
          <van-swipe-item>
            <ul class="column-list">
              <li v-if="i<10" v-for="(item,i) in columList" :kye="item" @click="clickSkip(i)">
                <div><img :src="item.img"></div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul class="column-list">
              <li v-if="i>9" v-for="(item,i) in columList" :kye="item" @click="clickSkip(i)">
                <div><img :src="item.img"></div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--新闻流-->
      <div class="new-box">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
         <!--无图-->
         <div class="new-list">
           <div class="txt-box">2020年眉山市新时代文明实践之道德模范、身边好人和文明家庭巡讲会(东坡区)活动</div>
           <div class="fot-box">
             <div class="left">
               <span>文明实践中心</span>
               <span>87浏览</span>
             </div>
             <div class="right">
               <div><van-icon name="cross" /></div>
             </div>
           </div>
         </div>
          <!--大图-->
          <div class="new-list">
            <div class="txt-box">2020年眉山市新时代文明实践之道德模范、身边好人和文明家庭巡讲会(东坡区)活动</div>
            <div class="big-picture"><img :src="bgBanner[0]"/></div>
            <div class="fot-box">
              <div class="left">
                <span>文明实践中心</span>
                <span>87浏览</span>
              </div>
              <div class="right">
                <div><van-icon name="cross" /></div>
              </div>
            </div>
          </div>
          <!--三图-->
          <div class="new-list">
            <div class="txt-box">2020年眉山市新时代文明实践之道德模范、身边好人和文明家庭巡讲会(东坡区)活动</div>
            <ul class="three-figures">
              <li><img :src="bgBanner[0]"></li>
              <li><img :src="bgBanner[1]"></li>
              <li><img :src="bgBanner[2]"></li>
            </ul>
            <div class="fot-box">
              <div class="left">
                <span>文明实践中心</span>
                <span>87浏览</span>
              </div>
              <div class="right">
                <div><van-icon name="cross" /></div>
              </div>
            </div>
          </div>
          <!--右单图-->
          <div class="new-list">
            <div class="about-box">
              <div class="left">2020年眉山市新时代文明实践之道德模范、身边好人和文明家庭巡讲会(东坡区)活动</div>
              <div class="right"><img :src="bgBanner[3]"></div>
            </div>
            <div class="fot-box">
              <div class="left">
                <span>文明实践中心</span>
                <span>87浏览</span>
              </div>
              <div class="right">
                <div><van-icon name="cross" /></div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
</template>

<script>
export default {
    name: "index",
  data(){
      return{
        bgBanner:[require('./image/bg-banner1.png'),require('./image/bg-banner2.png'),require('./image/bg-banner3.png'),require('./image/bg-banner4.png')],
        columList:[
          {name:'志愿者申请',img:require('./image/icon-zhiyuanshengqing.png'),url:'./zhiyuanzheshengqing/index'},
          {name:'团队申请',img:require('./image/icon-tuanduishengqing.png'),url:'./tuanduishengqing/index'},
          {name:'公益活动',img:require('./image/icon-gongyihuodong.png'),url:''},
          {name:'困难求助',img:require('./image/icon-kunnanqiuzhu.png'),url:'./kunnanqiuzhu/index'},
          {name:'百姓点单',img:require('./image/icon-baixingdiandan.png'),url:'./baixingdiandan/index'},
          {name:'微心愿',img:require('./image/icon-weixinyuan.png'),url:'./weixingyuan/index'},
          {name:'志愿活动',img:require('./image/icon-zhiyuanhuodong.png'),url:'./addActivity/home'},
          {name:'团队风采',img:require('./image/icon-tuanduifengcai.png'),url:'./tuanduifengcai/index'},
          {name:'实践阵地',img:require('./image/icon-shijianzhengdi.png'),url:'./shijianzhengdi/index'},
          {name:'我的',img:require('./image/icon-wode.png'),url:'./wode/index'},
          {name:'阵地活动',img:require('./image/icon-zhengdihuodong.png'),url:'./zhengdihuodong/index'},
        ],
        list: [],
        loading: false,
        finished: false,
      }
  },
  created(){
      sessionStorage.appId=this.$route.query.userId;
      sessionStorage.centerId=this.$route.query.centerId;
  },
  methods:{
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    clickSkip(mu){
      if(this.columList[mu].name=='公益活动'){
        window.location.href='http://h5.scrstv.com/html/huodong_h5/zhongchou/index.html#/?userId=e5f0cfd274f140bcbb0f0b38a72ee19e'
      }else{
        this.$router.push(this.columList[mu].url+'?userId='+sessionStorage.appId+'&centerId='+sessionStorage.centerId)
      }
    },
  },
}
</script>

<style scoped>
@import "css/index.css";
</style>
