<template>
  <div class="con">
    <Menu mode="horizontal" theme="dark" active-name="" @on-select="handleSelect">
      <div class="imgBox">
        <img src="../../assets/icpcLogo.png">
      </div>
      <MenuItem name="1" to="/visitor">
        <Icon type="md-home" />
        首页
      </MenuItem>
      <Submenu name="2">
        <template slot="title">
          <Icon type="md-contact" />
          {{name}}，欢迎！
        </template>
        <MenuItem name="2-2" @click="exit">退出登录</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
  export default {
    name: "index2",
    data() {
      return {
        name: ''
      }
    },
    methods: {
      // 退出登录
      exit() {
        // 清除token
        sessionStorage.clear();
        // this.$store.commit('saveEmail', undefined);
        this.$router.push('/visitor');
      },
      handleSelect(name) {
        if(name === '2-2') {
          this.exit();
        }
      }
    },
    mounted() {
      this.name = this.$store.state.email;
    }
  }
</script>

<style scoped>
  .con ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .ivu-menu-dark {
    background: #333333;
  }

  /*.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {*/
  /*  color: #2d8cf0;*/
  /*}*/

  .imgBox {
    position: absolute;
    left: 10px;
    top: 12px;
  }

  img {
    /*width: 40px;*/
    height: 36px;
  }
</style>
