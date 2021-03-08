<template>
  <div class="con">
    <div class="nav">
      <tab-bar></tab-bar>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
  import TabBar from '../components/TabBar/index'
  import Footer from '../components/Footer/index'
  export default {
    name: "Visitor",
    components: {TabBar, Footer}
  }
</script>

<style scoped>
  .con {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .nav {
    position: fixed;
    width: 100%;
  }

  .main {
    background-color: lightgrey;
    flex-grow: 1;
  }

  .footer {
  }
</style>
