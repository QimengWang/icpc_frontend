<template>
  <div>
    <Menu theme="light" :active-name="activeName">
      <MenuItem name="News" to="/user/news">
        <Icon type="ios-alert" />
        最新消息
      </MenuItem>
      <MenuItem name="Profile" to="/user/profile">
        <Icon type="ios-contact" />
        个人中心
      </MenuItem>
      <Submenu name="Contest" v-if="$store.state.status === 'student'">
        <template slot="title">
          <Icon type="ios-calendar" />
          赛程查询
        </template>
        <MenuItem name="SignUp" to="/user/contest/signUp">已报名</MenuItem>
        <MenuItem name="3-2">进行中</MenuItem>
      </Submenu>
      <Submenu name="4" v-if="$store.state.status === 'student'">
        <template slot="title">
          <Icon type="ios-list-box" />
          成绩查询
        </template>
        <MenuItem name="4-1">成绩数据</MenuItem>
        <MenuItem name="4-2">成绩统计</MenuItem>
      </Submenu>
      <MenuItem name="ContestManagement" v-if="$store.state.status === 'manager'" to="/user/contestManagement">
        <Icon type="ios-clipboard-outline" />
        赛事管理
      </MenuItem>
      <MenuItem name="SchoolManagement" v-if="$store.state.status === 'manager'" to="/user/schoolManagement">
        <Icon type="ios-apps" />
        学校管理
      </MenuItem>
      <MenuItem name="SignUpManagement" v-if="$store.state.status === 'manager'" to="/user/signUpManagement">
        <Icon type="ios-contacts" />
        报名管理
      </MenuItem>
      <MenuItem name="7" v-if="$store.state.status === 'manager'">
        <Icon type="ios-checkmark-circle-outline" />
        信息审核
      </MenuItem>
      <MenuItem name="6" v-if="$store.state.status === 'manager'">
        <Icon type="ios-calendar" />
        成绩管理
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        activeName: 'News'
      }
    },
    mounted() {
      // 解决刷新后侧边栏与路由不匹配问题
      this.activeName = this.$route.name;
    }
  }
</script>

<style scoped>

</style>
