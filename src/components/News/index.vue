<template>
  <div class="con">
    <List>
      <ListItem>
        <div class="infoBox">
          <h3>报名审核通过！</h3>
          <ListItemMeta description="This is description, this is description." />
        </div>
<!--        <template slot="action" v-if="$store.state.status === 'manager'">-->
<!--          <li>-->
<!--            <a href="">处理</a>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="">更多</a>-->
<!--          </li>-->
<!--        </template>-->
      </ListItem>
      <ListItem>
        <div class="infoBox">
          <h3>成绩发布通知！</h3>
          <ListItemMeta description="This is description, this is description." />
        </div>
<!--        <template slot="action" v-if="$store.state.status === 'manager'">-->
<!--          <li>-->
<!--            <a href="">处理</a>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="">更多</a>-->
<!--          </li>-->
<!--        </template>-->
      </ListItem>
    </List>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>
  .con {
    width: 100%;
    padding: 4% 8%;
  }
  .ivu-list-item {
    display: flex;
    /*flex-direction: column;*/
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 0;
  }
  .infoBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
