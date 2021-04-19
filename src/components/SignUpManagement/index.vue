<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Select v-model="id" filterable clearable placeholder="请选择竞赛名称" style="width: 200px">
        <Option v-for="(item, key) in contestList" :key="key" :value="item.id">{{item.name}}</Option>
      </Select>
      <Button type="success" icon="ios-search-outline">查询</Button>
      <Button type="warning" icon="ios-download-outline" @click="exportFile">导出Excel</Button>
    </div>

    <!--    报名列表-->
    <div class="tableBox">
      <Table border :columns="columns" :data="data" ref="table"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        id: '',
        cname: 'test',
        contestList: [
          {
            id: '0001',
            name: '第19届上海大学程序设计联赛'
          },
          {
            id: '0002',
            name: '第20届信息能力检索大赛'
          }
        ],
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
        data: [
          {
            chineseName: '哈哈',
            englishName: 'hh',
            id: '17123079',
            phone: '1883888888',
            sex: '女',
            year: '2017'
          }
        ]
      }
    },
    methods: {
      // 导出报名表
      exportFile() {
        this.$refs.table.exportCsv({
          filename: this.cname + '.xlsx'
        });
      },
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
