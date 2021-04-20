<template>
  <div class="con">
    <div class="tableBox">
      <Table border :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  import {getCheckedStudents} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        columns: [
          {
            title: '中文名',
            width: 120,
            key: 'chineseName',
            fixed: 'left'
          },
          {
            title: '学校',
            width: 150,
            key: 'school',
            fixed: 'left'
          },
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
          }
        ],
        data: []
      }
    },
    methods: {
      getData() {
        getCheckedStudents().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
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
      this.getData();
    }
  }
</script>

<style scoped>
  .con {
    padding: 20px;
  }
  .tableBox {
    width: 100%;
  }
</style>
