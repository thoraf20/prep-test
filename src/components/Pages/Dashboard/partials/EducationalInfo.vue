<template>
  <div class="cont">
    <h3 class="title">Educational Background</h3>
    <p class="subtitle">Please provide the following information so we can start composing your profile.</p>
    <div class="row m-0">
      <div class="col-md-12 left-nav p-0">
        <ul>
          <li @click="() => active = 'education'" :class="{active: (active === 'education')}"><span>A</span>Educational Info</li>
          <li @click="() => active = 'teaching'" :class="{active: (active === 'teaching')}"><span>B</span>Teaching Info</li>
          <li  @click="() => active = 'work'" :class="{active: (active === 'work')}"><span>C</span>Work Experience</li>
        </ul>
      </div>
      <div class="col-12 p-0">
        <div class="col-md-12 p-0" v-if="active === 'education'">
          <profile-education :isdash="true"></profile-education>
        </div>
        <div class="col-md-12 p-0" v-if="active === 'teaching'">
          <profile-teaching :isdash="true"></profile-teaching>
        </div>
        <div class="col-md-12 p-0" v-if="active === 'work'">
          <profile-work :isdash="true"></profile-work>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileEducation from '@/components/Pages/Profile/EditEducation';
import ProfileTeaching from '@/components/Pages/Profile/EditTeaching';
import ProfileWork from '@/components/Pages/Profile/EditWork';
import swal from 'sweetalert';
import axios from 'axios';

export default {
  name: 'education-setup',
  components: {
    ProfileEducation,
    ProfileTeaching,
    ProfileWork,
  },
  data() {
    return {
      active: 'education',
    };
  },
  computed: {
    u() {
      return this.$auth.user();
    },
  },
  methods: {
    saveAndContinue() {
      if (!this.u.progress.education) {
        return swal('Please complete the Education info setup');
      }
      if (!this.u.progress.teaching) {
        return swal('Please complete the teaching experience setup');
      }
      if (!this.u.progress.work) {
        return swal('Please complete the Work experience setup');
      }
      axios.post(`${BASE_API}/v1/tutor/steps`, { step: 'educational_background' })
        .then(() => this.$store.dispatch('getUserTutor'));
      return this.$router.push({ name: 'verification-setup' });
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
.mx { margin: 0 10px; }
.foot {
  margin-top: 30px;
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
      &.active {color: #639440; span {background-color: #639440; color: #fff}}
    }
  }
}
</style>