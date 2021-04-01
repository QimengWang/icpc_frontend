<template>
  <div class="con">
    <Navigator></Navigator>
    <div class="main">
      <div class="sidebar">
        <Sidebar></Sidebar>
      </div>
      <div class="contentBox">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigator from '../components/Navigatior/index2'
  import Sidebar from '../components/Sidebar/index'
  export default {
    name: "User",
    components: {Navigator, Sidebar},
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .con {
    display: flex;
    flex-direction: column;
  }
  .main {
    min-height: calc(100vh - 60px);
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }
  .contentBox {
    background-color: whitesmoke;
    flex-grow: 1;
    width: calc(100vh - 240px);
  }
  .content {
    background-color: white;
    margin: 20px;
    min-height: calc(100vh - 100px);
    border-radius: 1%;
  }
</style>
