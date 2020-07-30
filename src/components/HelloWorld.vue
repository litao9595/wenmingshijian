<template>
  <div class="hello">
    <h5>{{msg}}</h5>
    <h5>{{count()}}</h5>
    <van-button type="primary" @click="increment">主要按钮</van-button>
    <van-button type="primary" @click="bian">主要按钮</van-button>
    <ceshi :chuanzhi="mydata"></ceshi>
  </div>
</template>

<script>
  import {config} from './js/httpConfig'
  import{mapGetters,mapActions} from 'vuex'
  import ceshi from '@/components/ceshi'
export default {
    components:{ceshi},
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mydata:1
    }
  },
  created(){
    console.log(config)
  },
  methods:{
    ...mapActions(['increment','reduce','resumeList','dataAppId']),
    ...mapGetters(['count']),
    clickBtn(){
      // this.$store.commit('resumeList',10);
      // this.$store.commit('increment');
    },
    bian(){
      this.mydata++
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
@import "css/style.less";
</style>
