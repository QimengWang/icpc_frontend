<template>
  <div class="con">
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
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
            key: 'status'
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
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.detail(params.row.cid)
                    }
                  }
                }, '赛事详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row.cid)
                    }
                  }
                }, '取消报名')
              ]);
            }
          }
        ],
        data: []
      }
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
</style>
