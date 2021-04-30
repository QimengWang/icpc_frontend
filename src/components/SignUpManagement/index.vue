<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Select v-model="id" filterable clearable placeholder="请选择竞赛名称" style="width: 280px; margin-right: 5px">
        <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>
      </Select>
      <Button type="primary" icon="ios-search-outline" @click="search">查询</Button>
      <Button type="warning" icon="ios-download-outline" @click="exportFile">导出Excel</Button>
    </div>

    <!--    报名列表-->
    <div class="tableBox">
      <Table border :columns="columns" :data="data" ref="table" v-if="isSingle" @on-select="handleSelect"></Table>
      <Table border :columns="columns1" :data="data" v-else @on-select="handleSelect"></Table>
    </div>

<!--    审核按钮-->
    <div class="btnBox">
      <Button type="success" icon="ios-checkmark-circle-outline" @click="pass">通过</Button>
      <Button type="error" icon="ios-close-circle-outline" @click="notPass">不通过</Button>
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
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            type: 'index',
            width: 70,
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
          },
          {
            title: '审核状态',
            key: 'status',
            render: (h, params) => {
              if(params.row.status === 0) {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'blue'
                    }
                  }, '待审核')
                ])
              } else if(params.row.status === 1) {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'green'
                    }
                  }, '已通过')
                ])
              } else {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'orange'
                    }
                  }, '未通过')
                ])
              }
            }
          },
          {
            title: '备注',
            key: 'remark'
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
            title: '审核状态',
            key: 'status',
            render: (h, params) => {
              if(params.row.status == 0) {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'blue'
                    }
                  }, '待审核')
                ])
              } else if(params.row.status == 1) {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'green'
                    }
                  }, '已通过')
                ])
              } else {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'orange'
                    }
                  }, '未通过')
                ])
              }
            }
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        // table数据
        data: [],
        // 多选
        selection: []
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
        // console.log(this.id);
        if(this.id) {
          getListByCid(this.id).then(res => {
            const data = res.data;
            if(data.code === 0) {
              if(data.data.length === 0) {
                this.$Message.success("查询成功, 暂无数据！");
              } else {
                this.isSingle = !Object.keys(data.data[0]).includes('gid');
                this.data = data.data;
                this.$Message.success("查询成功！");
              }
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
      },
      // 多选
      handleSelect(selection) {
        this.selection = selection;
      },
      // 审核通过
      pass() {
        if(this.selection.length === 0) {
          this.$Message.warning("请选择要审核的报名信息！");
        } else {

        }
      },
      // 审核不通过
      notPass() {
        if(this.selection.length === 0) {
          this.$Message.warning("请选择要审核的报名信息！");
        } else {

        }
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
    align-items: flex-start;
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
    margin-right: 5px;
  }
  .btnBox {
    margin-top: 10px;
  }
</style>
