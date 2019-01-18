<template>
  <div>
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
</style>