<template>
  <div>
    <Row>
      <Col span="8" v-for="(itm, idx) in row" :key="idx">
        <span class="expand-key">组员{{idx+1}}：</span>
        <span class="expand-value">{{itm.id + " " + itm.chineseName}}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "expandRow",
    props: {
      row: Array
    }
  }
</script>

<style scoped>

</style>
