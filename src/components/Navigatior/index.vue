<template>
  <div>
    <Menu mode="horizontal" theme="dark" :active-name="activeName">
      <MenuItem name="Home" to="/visitor/home">
        <Icon type="md-home" />
        首页
      </MenuItem>
      <MenuItem name="Contest" to="/visitor/contest">
        <Icon type="ios-calendar" />
        竞赛
      </MenuItem>
<!--      <MenuItem name="Info" to="/visitor/info">-->
<!--        <Icon type="ios-color-wand" />-->
<!--        花絮-->
<!--      </MenuItem>-->
      <MenuItem name="Login" :to="personalCenter">
        <Icon type="md-contact" />
        <span v-show="isLogin">个人中心</span>
        <span v-show="!isLogin">登录</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      activeName: 'Home'
    }
  },
  computed: {
    isLogin() {
      return sessionStorage.getItem('authorization') ? 1 : 0;
    },
    personalCenter() {
      return this.isLogin ? '/user'  : '/login';
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
    }
  },
  mounted() {
    this.activeName = this.$route.name;
  }
}
</script>

<style scoped>
  .ivu-menu-dark {
    display: flex;
    justify-content: center;
    background: #333333;
  }

  /*.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {*/
  /*  color: #2d8cf0;*/
  /*}*/


  .ivu-menu-item {
    width: 15%;
  }
</style>
