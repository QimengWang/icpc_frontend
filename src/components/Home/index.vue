<template>
  <div class="mainBox">
    <div class="baseCon">
      <div class="img">
        <img src="../../assets/2.jpg" alt="">
      </div>
<!--      <div style="height: 300px; background-color: whitesmoke"></div>-->
<!--      <div class="img">-->
<!--        <img src="../../assets/3.jpg">-->
<!--      </div>-->
    </div>
    <div class="mainCon">
      <div class="intro">
        <h1>国际大学生程序设计竞赛</h1>
        <h1>（International Collegiate Programming Contest, ICPC）</h1>
        <div class="introMore">
          <h3>是一项旨在展示大学生创新能力、团队精神和在压力下编写程序、分析和解决问题能力的年度竞赛。经过近半个世纪的发展，国际大学生程序设计竞赛已经发展成为最具影响力的大学生计算机竞赛。</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    mounted() {
      // console.log(this.$router);
      // console.log(this.$route);
    }
  }
</script>

<style scoped>
  .mainBox {
    position: relative;

  }

  .baseCon {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .img {
    width: 100%;
    position: relative;
    z-index: -99;
  }

  img {
    width: 100%;
  }

  .mainCon {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .intro {
    width: 60%;
    margin-top: 120px;
  }

  .introMore {
    margin-top: 30px;
  }

  h3 {
    text-indent: 4em;
    line-height: 30px;
  }

  * {
    color: white;
  }
</style>
