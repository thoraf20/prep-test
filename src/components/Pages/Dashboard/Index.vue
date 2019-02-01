<template>
  <div class="hold">
    <div class="sidebar elevated" :class="{active: sidebarActive }">
      <sidebar></sidebar>
    </div>
    <div class="content" :class="{sidebarActive}">
      <div class="nav-coner" :class="{sidebarActive}">
        <navbar></navbar>
      </div>
      <div class="sub-content">
       <router-view></router-view>
      </div>
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
  z-index: 10;
}

.content {
  height: 100vh;
  width: calc(100vw - 215px);
  overflow: auto;
  position: relative;
}
.nav-coner {
  width: calc(100vw - 215px);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
}
.sub-content {
  margin-top: 70px;
}
.hold {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  overflow-y: auto;
}
@media only screen and (max-width: 600px) {
  .hold {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    margin-top: 0 !important;
  }
  .sidebar {
    left: -100%;
    position: absolute;
    background-color: #202030;
    transition: all .3s ease;
    &.active {left: 0;}
  }
  .nav-coner {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    transition: all .3s ease;
    &.sidebarActive {left: 215px;}
  }
  .content {
    left: 0;
    position: absolute;
    width: 100vw;
    transition: all .3s ease;

    overflow-y: scroll; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;
    &.sidebarActive {
      position: absolute;
      left: 215px;
    }
  }
}
</style>