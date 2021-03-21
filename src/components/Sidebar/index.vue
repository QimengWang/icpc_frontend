<template>
  <div>
    <Menu theme="light" active-name="1" open-names="['1']">
      <MenuItem name="1">
        <Icon type="ios-paper" />
        最新消息
      </MenuItem>
      <MenuItem name="2" to="/user/profile">
        <Icon type="ios-paper" />
        个人中心
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-paper" />
        赛程查询
      </MenuItem>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-people" />
          成绩查询
        </template>
        <MenuItem name="2-1">成绩数据</MenuItem>
        <MenuItem name="2-2">成绩统计</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
