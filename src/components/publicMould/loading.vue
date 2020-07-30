<template>
    <div class="loading-main">
       <van-loading class="loading-icon" size="40px" type="spinner" />
    </div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped>
.loading-main{
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  left: 0rem;
  top:0rem;
  background: rgba(0,0,0,.5);
}
  .loading-icon{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
</style>
