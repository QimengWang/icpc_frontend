<template>
  <div class="nav" :style="scrollStyle">
<!--    <h3 v-for="(item, idx) in titles" :key="idx" >{{item.name}}</h3>-->
    <Dropdown v-for="(item, idx) in titles" :key="idx">
      <h3 href="javascript:void(0)" @click="changePage(item.to)">
        {{item.name}}
      </h3>
      <DropdownMenu slot="list" v-if="item.hasOwnProperty('children')">
        <DropdownItem v-for="(val, idx) in item.children" :key="idx">{{val}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
        to: '/introduction',
        children: ["ICPC简介", "ICPC历史", "赛站简介"]
      }, {
        name: '信息',
        to: '/info',
        children: ["竞赛规则", "比赛环境", "判题用例", "奖励规则"]
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
        // 登录应单独处理，因为不共用navigator
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
