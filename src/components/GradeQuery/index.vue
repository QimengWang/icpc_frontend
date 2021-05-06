<template>
  <div class="con">
    <div class="tableBox">
      <Table border :columns="columns" :data="data"></Table>
    </div>
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
          }
        ],
        data: [
          {}
        ]
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
</style>
