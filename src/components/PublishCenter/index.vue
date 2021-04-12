<template>
<!--  该组件仅作为三层嵌套路由的中间件-->
  <div class="con">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>
  .con {
    /*background-color: navajowhite;*/
    /*width: calc(1024px - 280px);*/
  }
</style>
