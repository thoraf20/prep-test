<template>
  <div class="hold">
    <div class="sidebar elevated" :class="{active: sidebarActive }">
      <sidebar></sidebar>
    </div>
    <div class="content" :class="{sidebarActive}">
      <navbar></navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default {
  name: 'dashboard-index',
  components: { Sidebar, Navbar },
  computed: {
    sidebarActive() {
      return this.$store.getters.sidebar_visible;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.sidebar {
  width: 215px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background-color: #202030;
  border-radius: 0;
}
.content {
  height: 100vh;
  width: calc(100vw - 215px);
  overflow: auto;
}
.hold {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
@media only screen and (max-width: 600px) {
  .hold {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .sidebar {
    left: -100%;
    position: absolute;
    z-index: 10;
    background-color: #202030;
    transition: all .3s ease;
    &.active {left: 0;}
  }
  .content {
    left: 0;
    position: absolute;
    width: 100vw;
    transition: all .3s ease;
    &.sidebarActive {
      position: absolute;
      left: 215px;
    }
  }
}
</style>