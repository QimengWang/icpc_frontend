<template>
  <div class="con">
    <div class="tableBox">
      <Table border
             ref="selection"
             :columns="columns"
             :data="data"
             @on-select="handleSelect"
             @on-select-all="handleSelect"
             @on-select-cancel="handleSelect"
             @on-select-all-cancel="handleSelect"
      ></Table>
    </div>
    <div class="btnBox">
      <Button type="success" icon="ios-checkmark-circle-outline" @click="pass">通过</Button>
      <Button type="error" icon="ios-close-circle-outline" @click="notPass">不通过</Button>
    </div>
  </div>
</template>

<script>
  import {getUncheckedStudents, studentChecked, studentUnchecked} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left'
          },
          {
            title: '中文名',
            width: 120,
            key: 'chineseName',
            fixed: 'left'
          },
          // {
          //   title: '学校',
          //   width: 150,
          //   key: 'school'
          // },
          {
            title: '英文名',
            width: 150,
            key: 'englishName'
          },
          {
            title: '性别',
            width: 80,
            key: 'sex'
          },
          {
            title: '学号',
            width: 120,
            key: 'id'
          },
          {
            title: '入学年份',
            width: 150,
            key: 'year'
          },
          {
            title: '手机',
            width: 150,
            key: 'phone'
          },
          {
            title: '邮箱',
            width: 150,
            key: 'email'
          },
          {
            title: '国家',
            width: 150,
            key: 'country'
          },
          {
            title: '城市',
            width: 150,
            key: 'city'
          },
          {
            title: '详细地址',
            width: 150,
            key: 'address'
          },
          {
            title: '邮编',
            width: 150,
            key: 'zipCode'
          },
          {
            title: 'QQ',
            width: 150,
            key: 'qq'
          },
          {
            title: '微信',
            width: 150,
            key: 'weChat'
          },
          {
            title: '审核状态',
            width: 120,
            key: 'status',
            fixed: 'right',
            render: (h, params) => {
              if(params.row.status === 0) {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'orange'
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
            title: '操作',
            width: 150,
            fixed: 'right',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#2d8cf0',
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.pass(params.row.sid)
                    }
                  }
                }, '通过'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#2d8cf0'
                  },
                  on: {
                    click: () => {
                      this.notPass(params.row.sid)
                    }
                  }
                }, '不通过')
              ]);
            }
          }
        ],
        data: [],
        selection: []
      }
    },
    methods: {
      // 处理多选
      handleSelect(selection) {
        this.selection = selection;
        // console.log(this.selection);
      },
      // 获取待审核的学生列表
      getData() {
        getUncheckedStudents().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
            // if(this.data.length === 0) {
            //   this.$Message.warning("暂无数据！");
            // }
          } else {
            this.$Message.error(data.data.message);
          }
        }).catch(err => {
          // console.log(err);
          // this.$Message.error('出错啦！');
        })
      },
      // 审核通过
      pass(id) {
        // console.log(typeof id);
        let flag = 1;
        let arr = [];
        if(typeof id !== 'number') {
          // 多选
          if(this.selection.length === 0) {
            flag = 0;
            this.$Message.warning('请选择要审核的学生！');
          } else {
            //处理数据
            for (let item of this.selection) {
              arr.push(item.sid);
            }
          }
        } else {
          // 单选
          arr.push(id);
        }
        // console.log(arr);
        if(flag) {
          studentChecked(arr).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.getData();
              this.selection = [];
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          });
        }
      },
      // 审核不通过
      notPass(id) {
        // console.log(typeof id);
        let flag = 1;
        let arr = [];
        if(typeof id !== 'number') {
          // 多选
          if(this.selection.length === 0) {
            flag = 0;
            this.$Message.warning('请选择要审核的学生！');
          } else {
            //处理数据
            for (let item of this.selection) {
              arr.push(item.sid);
            }
          }
        } else {
          // 单选
          arr.push(id);
        }
        // console.log(arr);
        if(flag) {
          studentUnchecked(arr).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.getData();
              this.selection = [];
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          });
        }
      }
    },
    mounted() {
      this.getData();
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
  .btnBox {
    margin-top: 10px;
  }
  .tableBox {
    width: 100%;
  }
  Button {
    margin-right: 5px;
  }
</style>
