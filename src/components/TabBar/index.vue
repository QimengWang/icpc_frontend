<template>
  <div class="nav" :style="scrollStyle">
    <h3 v-for="(item, idx) in titles" :key="idx" @click="changePage(item.to)">{{item.name}}</h3>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      titles: [{
        name: '首页',
        to: '/home'
      }, {
        name: '简介',
        to: '/introduction'
      }, {
        name: '信息',
        to: '/info'
      }, {
        name: '参赛',
        to: '/contest'
      }, {
        name: '登录',
        to: '/login'
      }],
      scrollStyle: {
        backgroundColor: ""
      }
    }
  },
  methods: {
    changePage(arg) {
      if(arg !== '/login') {
        this.$router.push('/visitor' + arg);
      } else {
        // 登录应单独处理，因为不共用tabbar
        this.$router.push(arg);
      }
    },
    handleScroll() {
      if(window.pageYOffset >= 60) {
        this.scrollStyle.backgroundColor = "white";
      } else {
        this.scrollStyle.backgroundColor = "transparent";
      }
    }
  },
  computed: {
    // scrollStyle() {
    //   window.onscroll
    // }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  }
}
</script>

<style scoped>
  .nav {
    padding: 0 15% 0 15%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  h3:hover {
    color: dodgerblue;
  }
</style>
