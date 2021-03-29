<template>
  <div class="con">
    <Menu mode="horizontal" theme="dark" active-name="">
      <MenuItem name="1" to="/visitor">
        <Icon type="md-home" />
        首页
      </MenuItem>
      <Submenu name="2">
        <template slot="title">
          <Icon type="md-contact" />
          Wqm，欢迎！
        </template>
        <MenuItem name="2-2" replace to="/visitor">退出登录</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "index2",
    data() {
      return {

      }
    },
    methods: {
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
</style>
