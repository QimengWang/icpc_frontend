<template>
  <div>
    <Menu theme="light" active-name="News">
      <MenuItem name="News" to="/user/news">
        <Icon type="ios-alert" />
        最新消息
      </MenuItem>
      <MenuItem name="Profile" to="/user/profile">
        <Icon type="ios-contact" />
        个人中心
      </MenuItem>
      <MenuItem name="3" v-if="$store.state.status === 'student'">
        <Icon type="ios-calendar" />
        赛程查询
      </MenuItem>
      <Submenu name="4" v-if="$store.state.status === 'student'">
        <template slot="title">
          <Icon type="ios-list-box" />
          成绩查询
        </template>
        <MenuItem name="2-1">成绩数据</MenuItem>
        <MenuItem name="2-2">成绩统计</MenuItem>
      </Submenu>
      <MenuItem name="contestManagement" v-if="$store.state.status === 'manager'" to="/user/contestManagement">
        <Icon type="ios-clipboard-outline" />
        赛事管理
      </MenuItem>
      <MenuItem name="6" v-if="$store.state.status === 'manager'">
        <Icon type="ios-calendar" />
        成绩管理
      </MenuItem>
      <MenuItem name="7" v-if="$store.state.status === 'manager'">
        <Icon type="ios-checkmark-circle-outline" />
        信息审核
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
      }
    },
    watch: {
      $route() {
        // console.log(this.$route);
        // this.activeName = this.$route.name;
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
