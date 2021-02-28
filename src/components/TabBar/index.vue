<template>
  <div class="nav">
    <h3 v-for="(item, idx) in titles" :key="idx" @click="changePage(idx)">{{item}}</h3>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      titles: ['首页', '简介', '信息', '参赛', '登录']
    }
  },
  methods: {
    changePage(idx) {
      if(this.titles[idx] !== '登录') {
        alert(`即将前往${this.titles[idx]}!`);
      } else {
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped>
  .nav {
    width: 70%;
    height: 60px;
    margin: auto;

    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  h3:hover {
    color: dodgerblue;
  }
</style>
