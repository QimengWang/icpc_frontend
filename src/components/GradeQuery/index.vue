<template>
  <div class="con">
    <div class="tableBox">
      <Table border :columns="columns" :data="data"></Table>
    </div>

    <Modal
      v-model="modal"
      footer-hide>
      <Divider>
        <h4>{{modalTitle}}</h4>
      </Divider>

      <div class="btnBox">
        <Button type="primary" icon="ios-download-outline" @click="download">打印</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        columns: [
          {
            title: '竞赛名称',
            key: 'name'
          },
          {
            title: '成绩',
            key: 'grade'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  // style: {
                  //   color: '#2d85e4'
                  // },
                  on: {
                    click: () => {
                      this.getPaper(params.row.id);
                    }
                  }
                }, '查看证书')
              ]);
            }
          }
        ],
        data: [
          {}
        ],
        modal: false,
        modalTitle: ''
      }
    },
    methods: {
      getPaper() {
        this.modalTitle = '证书';
        this.modal = true;
      },
      download() {

      }
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
  .btnBox {
    overflow: hidden;
  }
  Button {
    float: right;
  }
</style>
