<template>
  <div class="cont">
    <h3 class="title">Personal Information</h3>
    <p class="subtitle">Please provide the following information so we can start composing your profile.</p>
    <div class="row m-0">
      <div class="col-md-12 left-nav p-0">
        <ul>
          <router-link tag="li" :to="{ name: 'personal-info-setup' }"><span>A</span>Basic Info</router-link>
          <router-link tag="li" :to="{ name: 'location-info-setup' }" :class="{disabled: !u.progress.basic }"><span>B</span>Location Info</router-link>
          <router-link  tag="li":to="{ name: 'bio-setup' }" :class="{disabled: !u.progress.location }"><span>C</span>Short Bio</router-link>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import ProfileBasic from '@/components/Pages/Profile/EditBasic';
import ProfileLocation from '@/components/Pages/Profile/EditLocation';
import ProfileAbout from '@/components/Pages/Profile/EditAbout';

export default {
  name: 'basic-setup',
  components: {
    ProfileBasic,
    ProfileLocation,
    ProfileAbout,
  },
  computed: {
    u() {
      return this.$auth.user();
    },
  },
  methods: {
    saveAndContinue() {
      if (!this.u.progress.basic) {
        return swal('Please complete the basic info setup');
      }
      if (!this.u.progress.location) {
        return swal('Please complete the Location setup');
      }
      if (!this.u.progress.about) {
        return swal('Please complete the Short Bio setup');
      }
      axios.post(`${BASE_API}/v1/tutor/steps`, { step: 'personal_info' })
        .then(() => this.$store.dispatch('getUserTutor'));
      return this.$router.push({ name: 'education-setup' });
    },
    ac(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => this.$route.path.indexOf(path) >= 0);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.cont {
  padding: 15px 0;
}
h3.title {
  font-size: 20px;
  font-weight: 800;
  margin: 10px 0;
}
p.subtitle {
  margin: 5px 0;
  color: #2A2A2A;
  font-size: 16px;
}
.submit-button {
  width: 130px;
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  vertical-align: middle;
  float: right;
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  &.btn-default {
    box-shadow: 0 2px 2px 0 rgba(112, 112, 112, 0.14), 0 3px 1px -2px rgba(112, 112, 112, 0.12), 0 1px 5px 0 rgba(112, 112, 112, 0.2);
  }
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.elevated {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);
}
.mx { margin: 0 10px; }
.foot {
  margin-top: 30px;
}
.p-0 {
  padding: 0;
}
.left-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
  width: 100%;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1220px;
    position: relative;
    padding: 0;
    &::before {
      content: ' ';
      position: absolute;
      height: 1px;
      width: calc(100% - 40px);
      display: block;
      top: 50%;
      left: 40px;
      background-color: rgba(0, 0, 0, .25);
      z-index: 0;
    }
    li {
      background-color: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      z-index: 2;
      span {
        width: 50px;
        height: 50px;
        background-color: #F0F2F8;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        padding: 10px 0;
        margin: 10px;
        cursor: pointer;
      }
      &:hover{color: #639440;}
      &.active {list-style-image: url(../../../assets/tick.svg); color: #639440; span {background-color: #639440; color: #fff}}
    }
  }
}
</style>