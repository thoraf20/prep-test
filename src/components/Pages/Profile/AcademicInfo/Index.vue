<template>
  <div class="hold">
    <div class="row">
      <h5 style="color:green;">Academic Information</h5>
    </div>
    <div class="row card">
      <div class="col-md-12">
        <ul class="tabs">
          <router-link tag="li" :to="{name: 'profile-subjects'}" class="tab col-4">Subject & Classes</router-link>
          <router-link tag="li" :to="{name: 'tests'}" class="tab col-4" v-bind:class="{ disabled: $auth.user().progress.subjects !== true }">Test</router-link>
          <router-link tag="li" :to="{name: 'subject-profiles'}" class="tab col-4" v-bind:class="{ disabled: $auth.user().progress.tests !== true }">Academic Profile</router-link>
        </ul>
      </div>
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hold {
  margin: 25px;
}
.card {
  margin-top: 10px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);

  .tabs {
    display: flex;
    padding: 0 40px;
    height: 48px;
    width: 100%;
    margin: 0;
    
    .tab {
      display: inline-block;
      text-align: center;
      line-height: 48px;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid #b2b2b2;
      color: #b2b2b2;
      position: relative;
      overflow: hidden;
      cursor: pointer;

      &.router-link-exact-active {
        &::after {
          background: #639440;
          width: 100%;
          position: absolute;
          bottom:0;
          left: 0%;
        }
        color: #333333;
      }


      // &.active { border-bottom: 2px solid #639440; }
    }
  }
}
</style>