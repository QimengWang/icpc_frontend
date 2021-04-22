<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Select v-model="id" filterable clearable placeholder="请选择竞赛名称" style="width: 280px">
        <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>
      </Select>
      <Button type="success" icon="ios-search-outline" @click="search">查询</Button>
      <Button type="warning" icon="ios-download-outline" @click="exportFile">导出Excel</Button>
    </div>

    <!--    报名列表-->
    <div class="tableBox">
      <Table border :columns="columns" :data="data" ref="table" v-if="isSingle"></Table>
      <Table border :columns="columns1" :data="data" v-else></Table>
    </div>
  </div>
</template>

<script>
  import {showContestList, getListByCid} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        // 当前所查询竞赛是否为个人赛
        isSingle: true,
        id: '',
        // 导出报名名单的文件名
        cname: 'test',
        contestList: [],
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '中文名',
            key: 'chineseName'
          },
          {
            title: '英文名',
            key: 'englishName'
          },
          {
            title: '学号',
            key: 'id'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '电话',
            key: 'phone'
          },
          {
            title: '入学年份',
            key: 'year'
          }
        ],
        columns1: [
          {
            title: '团队名称',
            key: 'groupName'
          },
          {
            title: '教练',
            key: 'tname'
          },
          {
            title: '小组成员',
            key: 'members'
          }
        ],
        data: []
      }
    },
    methods: {
      // 导出报名表
      exportFile() {
        this.$refs.table.exportCsv({
          filename: this.cname
        });
      },
      // 查询报名信息
      search() {
        console.log(this.id);
        if(this.id) {
          getListByCid(this.id).then(res => {
            const data = res.data;
            if(data.code === 0) {
              if(Object.keys(data.data[0]).includes('gid')) {
                this.isSingle = false;
              } else {
                this.isSingle = true;
              }
              this.data = data.data;
              this.$Message.success("查询成功！");
            } else {
              this.$Message.error("查询失败！");
            }
          }).catch(err => {
            console.log(err);
            this.$Message.error("出错啦！");
          });
        } else {
          this.$Message.warning("请选择竞赛！");
        }
      },
      // 获取赛事列表
      getContests() {
        showContestList().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.contestList = data.data;
          } else {
            this.$Message.error(data.data.message);
          }
        }).catch(err => {
          console.log(err);
          this.$Message.error("出错啦！");
        })
      }
    },
    mounted() {
      this.getContests();
    }
  }
</script>

<style scoped>
  .con {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .tableBox {
    width: 100%;
  }
  .father {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
  }
  Button {
    margin-left: 5px;
  }
</style>
