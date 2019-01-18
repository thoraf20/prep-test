<template>
  <div class="container-material hold">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.commit('OFF_VISIBILITY'));
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.hold {
  padding: 25px 0;
  height: 100%;
}
.container-material {
  display: block;
}
</style>