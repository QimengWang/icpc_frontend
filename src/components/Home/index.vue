<template>
  <div class="main">
    <div class="baseImg">
<!--      <img src="../../assets/1.jpg" alt="">-->
<!--      <img src="../../assets/2.jpg" alt="">-->
<!--      <img src="../../assets/3.jpg" alt="">-->
    </div>
    <div class="mainImg">
      <img src="../../assets/mainLogo.png">
    </div>
    <h2>首页</h2>
  </div>
</template>

<script>
  export default {
    name: "index",
    mounted() {
      // console.log(this.$router);
      // console.log(this.$route);
    }
  }
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .baseImg {
    /*width: 100%;*/
    height: 600px;
    /*height: auto;*/
    position: absolute;
    z-index: -99;
  }

  .mainImg img{
    /*background-image: url("../../assets/2.jpg");*/
    /*background-color: rgba(0, 0, 0, 0.7);*/
    width: 80%;
  }
</style>
