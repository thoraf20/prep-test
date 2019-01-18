<template>
  <div style="min-height:100vh">
    <transition name="fade">
      <loader style="z-index: 1000" v-if="visible" />
    </transition>
    <router-view style='min-height:100vh'></router-view>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>

<script>
import Loader from "@/components/Preloaders/Main";
export default {
  name: "app",
  components: { Loader },
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    this.$auth.ready(() => {
      this.visible = false;
    });
  }
};
</script>

<style>
</style>
