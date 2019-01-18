<template>
  <div>
    <nav-bar></nav-bar>
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import '@/assets/css/td.css';
import NavBar from '@/components/Layout/NavBar';

export default {
  components: { NavBar },
  name: 'index',
};
</script>

<style scoped>
.sb {
  width: 300px;
}
.ms {
  width: calc(100% - 300px);
}
.container-fluid {
  padding: 10px 30px;
  /*width: 90;*/
}
</style>