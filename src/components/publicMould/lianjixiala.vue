<template>
    <div class="lianji-box">
      <div class="bg-box" @click="clickCancel"></div>
      <div class="lianji-content">
        <van-picker show-toolbar :columns="columns" @confirm="clickConfirm"  @cancel="clickCancel"/>
      </div>
    </div>
</template>

<script>
export default {
    name: "lianjixiala",
  props:['lj'],
  data(){
      return{
        columns:[
          // {
          //   text: '浙江',
          //   id:'1',
          //   children: [
          //     {
          //       text: '杭州',
          //       id:'22',
          //       children: [{ text: '西湖区' }, { text: '余杭区' }],
          //     },
          //     {
          //       text: '温州',
          //       id:'33',
          //       children: [{ text: '鹿城区' }, { text: '瓯海区' }],
          //     },
          //   ],
          // },
        ],
      }
  },
  created(){
      this.columns=this.lj;
  },
  methods:{
    clickConfirm(e){
      this.$emit('lianjixialaData',e)
    },
    clickCancel(e){
      this.$emit('lianjixialaData',false)
    },
  },
}
</script>

<style scoped>
.lianji-box{
  background: rgba(0,0,0,.5);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0rem;
  top:0rem;
  z-index: 99;
}
.lianji-box .bg-box{
  position: absolute;
  left: 0rem;
  top:0rem;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.lianji-box .lianji-content{
  position: absolute;
  left: 0rem;
  bottom: 0rem;
  width: 100%;
  z-index: 10;
}
</style>
