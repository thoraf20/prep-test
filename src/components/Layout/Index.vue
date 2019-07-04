<template>
  <div>
    <nav-bar v-if="navbarVisible"></nav-bar>
    <div class="gst">
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
  computed: {
    navbarVisible() {
      return this.$store.getters.navbar_visible;
    },
  },
  created() {
    if (this.$route.path.indexOf('dashboard') >= 0) {
      this.$store.commit('OFF_NAVBAR_VISIBILITY');
    }
  },
  updated() {
    if (this.$route.path.indexOf('dashboard') >= 0) {
      this.$store.commit('OFF_NAVBAR_VISIBILITY');
    }
  },
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
.gst {
  min-height: 100vh;
  background-color: #fcfcfc;
}
</style>