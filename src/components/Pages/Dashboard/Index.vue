<template>
  <div class="hold">
    <div class="sidebar elevated" :class="{active: sidebarActive }">
      <sidebar></sidebar>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar';

export default {
  name: 'dashboard-index',
  components: { Sidebar },
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
  width: 300px;
  height: calc(100vh - 65px);
  overflow: hidden;
  overflow-y: auto;
}
.content {
  height: calc(100vh - 65px);
  width: calc(100vw - 300px);
  overflow: auto;
}
.hold {
  display: flex;
  flex-direction: row;
}
@media only screen and (max-width: 600px) {
  .sidebar {
    left: -100%;
    position: absolute;
    z-index: 10;
    background-color: #ffffff;
    transition: all .5s linear;
    &.active {left: 0;}
  }
  .content {
    width: 100vw;
  }
}
</style>