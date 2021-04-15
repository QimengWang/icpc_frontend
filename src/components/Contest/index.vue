<template>
  <div class="box">
    <div class="list">
        <List item-layout="vertical">
          <ListItem v-for="item in data" :key="item.title">
<!--            <ListItemMeta :title="item.name" />-->
            <h3>{{item.name}}</h3>
            <div class="content">
              <div class="item">
                <h4>报名时间：</h4>
                <span>{{item.startApp}} ~ {{item.endApp}}</span>
              </div>
              <div class="item">
                <h4>比赛时间：</h4>
                <span>{{item.startHold}} ~ {{item.endHold}}</span>
              </div>
              <div class="intro">
                <h4>简介：</h4>
                <p>
                  {{item.remark}}
                  <a @click="toDetail(item.cid)">详情</a>
                </p>
<!--                <router-link :to="'/visitor/detail'">详情</router-link>-->
              </div>
            </div>
<!--            <template slot="extra">-->
<!--              <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">-->
<!--            </template>-->
          </ListItem>
        </List>
      </div>
  </div>
</template>

<script>
  import {getContests} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        data: []
      }
    },
    methods: {
      getContestList() {
        getContests().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
          } else {

          }
        }).catch(err => {
          this.$Message.error(err);
        })
      },
      toDetail(id) {
        // console.log(id);
        this.$router.push({path:'/visitor/contest/'+id});
      }
    },
    mounted() {
      this.getContestList();
    }
  }
</script>

<style scoped>
  .box {
    position: relative;
  }
  .list {
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .content {
    margin-top: 10px;
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
  /*>>>.ivu-list-item-meta-title {*/
  /*  font-weight: bold;*/
  /*}*/
  h4,h3 {
    color: #333333;
  }
  p {
    text-indent: 2em;
  }
</style>
