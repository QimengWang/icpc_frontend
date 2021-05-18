<template>
  <div class="con">
    <Table border :columns="columns" :data="data"></Table>

    <Modal
      v-model="modal"
      footer-hide>
      <Divider>
        <h4>{{modalTitle}}</h4>
      </Divider>

      <div class="btnBox">
        <Button type="primary" icon="ios-download-outline" @click="print">打印</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getApplyList, cancelApply} from "../../api/api";

  export default {
    name: "index1",
    data() {
      return {
        columns: [
          {
            title: '赛事名称',
            key: 'name'
          },
          {
            title: '类型',
            key: 'type'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status === '0') {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'blue'
                    }
                  }, '待审核')
                ])
              } else if (params.row.status === '1') {
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
          },
          {
            title: '操作',
            key: 'action',
            width: '250',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.type === '团队赛' ? 'block' : 'none'
                  },
                  on: {
                    click: () => {
                      this.update(params.row.id)
                    }
                  }
                }, '修改报名'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row)
                    }
                  }
                }, '取消报名'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.detail(params.row.id)
                    }
                  }
                }, '准考证')
              ]);
            }
          }
        ],
        data: [
          // {}
        ],
        modal: false,
        modalTitle: '准考证'
      }
    },
    methods: {
      // 获取报名列表
      getData() {
        getApplyList().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
          } else {

          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 修改报名信息（团体赛）
      update() {

      },
      // 取消报名
      cancel(data) {
        console.log(data);
        cancelApply({cid: data.cid, type: data.type === '个人赛' ? 'single' : 'group'}).then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.$Message.success(data.data.message);
          } else {
            this.$Message.error(data.data.message);
          }
          this.getData();
        }).catch(err => {
          console.log(err);
        })
      },
      // 查看准考证
      detail() {
        this.modal = true;
      },
      // 打印准考证
      print() {

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
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
  }
  .btnBox {
     overflow: hidden;
   }
  .btnBox Button {
    float: right;
  }
</style>
