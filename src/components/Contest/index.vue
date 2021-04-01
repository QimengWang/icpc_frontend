<template>
  <div class="con">
    <div class="list">
      <List item-layout="vertical">
        <ListItem v-for="item in data" :key="item.title">
          <ListItemMeta :title="item.title" />
          <div class="content">
            <div class="item">
              <h4>报名时间：</h4>
              <span>{{item.applicationPeriod}}</span>
            </div>
            <div class="item">
              <h4>比赛时间：</h4>
              <span>{{item.holdingTime}}</span>
            </div>
            <div class="intro">
              <h4>简介：</h4>
              <p>
                {{item.introduce}}
              <a>详情</a>
            </p>
            </div>
          </div>
          <template slot="extra">
            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
          </template>
        </ListItem>
      </List>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        data: [
          {
            title: '第27届信息能力检索大赛',
            applicationPeriod: '2021.4.1-2021.4.6',
            holdingTime: '2021.4.2-2021.4.6',
            introduce: '信息能力检索大赛旨在锻炼大学生利用搜索引擎解决问题的能力，它的...'
          },
          {
            title: '第26届信息能力检索大赛',
            applicationPeriod: '2020.4.1-2020.4.6',
            holdingTime: '2020.4.2-2020.4.6',
            introduce: '信息能力检索大赛旨在锻炼大学生利用搜索引擎解决问题的能力，它的...'
          },
          {
            title: '第25届信息能力检索大赛',
            applicationPeriod: '2019.4.1-2019.4.6',
            holdingTime: '2019.4.2-2019.4.6',
            introduce: '信息能力检索大赛旨在锻炼大学生利用搜索引擎解决问题的能力，它的...'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .con {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .list {
    width: 70%;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .item {
    display: flex;
  }
  .intro {
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  >>>.ivu-list-item-meta-title {
    font-weight: bold;
  }
  h4 {
    color: #333333;
  }
  p {
    text-indent: 2em;
  }
</style>
