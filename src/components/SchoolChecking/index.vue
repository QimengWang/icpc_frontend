<template>
  <div class="con">
    <div class="tableBox">
      <Table border ref="selection" :columns="columns" :data="data"  @on-select="handleSelect"></Table>
    </div>
    <div class="btnBox">
      <Button type="primary" icon="ios-checkmark-circle-outline" @click="pass">通过</Button>
      <Button type="warning" icon="ios-close-circle-outline" @click="notPass">不通过</Button>
    </div>
  </div>
</template>

<script>
  import {getUncheckedSchool, schoolChecked, schoolUnchecked} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '学校名称',
            key: 'name'
          },
          {
            title: '学校地址',
            key: 'address'
          },
          {
            title: '操作',
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
                      this.pass(params.row.id)
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
                      this.notPass(params.row.id)
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
      },
      // 获取待审核的学校列表
      getData() {
        getUncheckedSchool().then(res => {
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
          console.log(err);
          this.$Message.error('出错啦！');
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
            this.$Message.warning('请选择要审核的学校！');
          } else {
            //处理数据
            for (let item of this.selection) {
              arr.push(item.id);
            }
          }
        } else {
          // 单选
          arr.push(id);
        }
        // console.log(arr);
        if(flag) {
          schoolChecked(arr).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.getData();
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            console.log(err);
            this.$Message.error("出错啦！");
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
            this.$Message.warning('请选择要审核的学校！');
          } else {
            //处理数据
            for (let item of this.selection) {
              arr.push(item.id);
            }
          }
        } else {
          // 单选
          arr.push(id);
        }
        // console.log(arr);
        if(flag) {
          schoolUnchecked(arr).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.getData();
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            console.log(err);
            this.$Message.error("出错啦！");
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
