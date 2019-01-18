<template>
  <div>
    <div class="hold container-material">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jobs-dashboard',
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