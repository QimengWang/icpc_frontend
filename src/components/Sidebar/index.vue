<template>
  <div>
    <Menu theme="light" :active-name="activeName">
<!--      <MenuItem name="News" to="/user/news">-->
<!--        <Icon type="ios-alert" />-->
<!--        最新消息-->
<!--      </MenuItem>-->
      <MenuItem name="Profile" to="/user/profile">
        <Icon type="ios-contact" />
        个人中心
      </MenuItem>
      <MenuItem name="MyContest" to="/user/myContest" v-if="$store.state.status === 'student'">
        <Icon type="ios-calendar-outline" />
        赛程查询
      </MenuItem>
<!--      <Submenu name="4" v-if="$store.state.status === 'student'">-->
<!--        <template slot="title">-->
<!--          <Icon type="ios-list-box" />-->
<!--          成绩查询-->
<!--        </template>-->
<!--        <MenuItem name="4-1">成绩数据</MenuItem>-->
<!--        <MenuItem name="4-2">成绩统计</MenuItem>-->
<!--      </Submenu>-->
      <MenuItem name="GradeQuery" to="/user/gradeQuery" v-if="$store.state.status === 'student'">
        <Icon type="ios-list-box" />
        成绩查询
      </MenuItem>
      <MenuItem name="ContestManagement" v-if="$store.state.status === 'manager'" to="/user/contestManagement">
        <Icon type="ios-clipboard-outline" />
        赛事管理
      </MenuItem>

<!--      <Submenu name="SchoolManagement" v-if="$store.state.status === 'manager'">-->
<!--        <template slot="title">-->
<!--          <Icon type="ios-apps" />-->
<!--          学校管理-->
<!--        </template>-->
<!--        <MenuItem name="SchoolChecking" to="/user/schoolManagement/schoolChecking">学校审核</MenuItem>-->
<!--        <MenuItem name="SchoolList" to="/user/schoolManagement/schoolList">学校列表</MenuItem>-->
<!--      </Submenu>-->

      <MenuItem name="SchoolManagement" v-if="$store.state.status === 'manager'" to="/user/schoolManagement">
        <Icon type="ios-apps" />
        学校管理
      </MenuItem>

      <MenuItem name="TeacherManagement" v-if="$store.state.status === 'manager'" to="/user/teacherManagement">
        <Icon type="ios-contacts-outline" />
        教练管理
      </MenuItem>

      <MenuItem name="SignUpManagement" v-if="$store.state.status === 'manager'" to="/user/signUpManagement">
        <Icon type="ios-hand" />
        报名管理
      </MenuItem>

      <Submenu name="RoomManagement" v-if="$store.state.status === 'manager'">
        <template slot="title">
          <Icon type="ios-cube-outline" />
          考场管理
        </template>
        <MenuItem name="RoomList" to="/user/roomManagement/roomList">考场列表</MenuItem>
        <MenuItem name="RoomArrangement" to="/user/roomManagement/roomArrangement">考场安排</MenuItem>
      </Submenu>

      <MenuItem name="GradeManagement" to="/user/gradeManagement" v-if="$store.state.status === 'manager'">
        <Icon type="ios-calendar" />
        成绩管理
      </MenuItem>
      <MenuItem name="StudentManagement" to="/user/studentManagement" v-if="$store.state.status === 'teacher'">
        <Icon type="ios-calendar-outline" />
        学生管理
      </MenuItem>
<!--      <Submenu name="Contest" v-if="$store.state.status === 'teacher'">-->
<!--        <template slot="title">-->
<!--          <Icon type="ios-calendar-outline" />-->
<!--          学生管理-->
<!--        </template>-->
<!--        <MenuItem name="StudentList" to="/user/studentManagement/studentList">学生列表</MenuItem>-->
<!--        <MenuItem name="StudentChecking" to="/user/studentManagement/studentChecking">学生审核</MenuItem>-->
<!--      </Submenu>-->
<!--      <MenuItem name="StudentList" v-if="$store.state.status === 'teacher'">-->
<!--        <Icon type="ios-calendar" />-->
<!--        学生列表-->
<!--      </MenuItem>-->
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
