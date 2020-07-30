<template>
  <div class="dateTime-box">
    <div class="bg-box" @click="clickCancel"></div>
    <div class="dateTime-content">
      <van-datetime-picker
        v-model="currentDate"
        :type="type"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="clickConfirm"
        @cancel="clickCancel"
        :formatter="formatter"
      />
    </div>
  </div>
</template>

<script>
export default {
    name: "dateTime",
  props:['timeType'],
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      type:'',
    };
  },
  created(){
      this.type=this.timeType
  },
  methods:{
      clickConfirm(e){
        this.$emit('datetimeData',this.timeFormat(e))
      },
    clickCancel(e){
      this.$emit('datetimeData','')
    },
    formatter(type, val){
      if(type==='year'){
        return `${val}年`;
      }else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }else if(type === 'hour'){
        return `${val}时`;
      }else if(type === 'minute'){
        return `${val}分`;
      }
      return val;
    },
    timeFormat(time) { // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = (time.getMonth() + 1)<10?'0'+(time.getMonth() + 1):(time.getMonth() + 1);
      let day = time.getDate()<10?'0'+time.getDate():time.getDate();
      let hour=time.getHours()<10?'0'+time.getHours():time.getHours();
      let minute=time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
      return year + '-' + month + '-' + day +' '+hour+':'+minute+':00'
    },
  },
  mounted() {
    // this.timeFormat(new Date());
  },
}
</script>

<style scoped>
.dateTime-box{
  background: rgba(0,0,0,.5);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0rem;
  top:0rem;
}
.dateTime-box .bg-box{
  position: absolute;
  left: 0rem;
  top:0rem;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.dateTime-content{
  position: absolute;
  left: 0rem;
  bottom: 0rem;
  width: 100%;
  z-index: 10;
}
</style>
