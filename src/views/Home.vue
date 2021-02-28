<template>
  <div class="home">
    <div class="nav">
      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TabBar from '../components/TabBar/index'

export default {
  name: 'Home',
  components: {
    TabBar
  }
}
</script>
