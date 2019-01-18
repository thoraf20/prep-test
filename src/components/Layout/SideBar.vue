<template>
  <div id="sidebar-main">
    <div class="sidebar-container">
      <div class="sidebar-content">
        <div class="sidebar-content-profile-img">
          <img :src="photo || '../../assets/skq.jpg'" id="sidebar-img">
          <div class="pic-overlay">
            <router-link :to="{name: 'profile-media'}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="512px" height="512px" class=""><g><g> <path d="M55.201,15.5h-8.524l-4-10H17.323l-4,10H12v-5H6v5H4.799C2.152,15.5,0,17.652,0,20.299v29.368   C0,52.332,2.168,54.5,4.833,54.5h50.334c2.665,0,4.833-2.168,4.833-4.833V20.299C60,17.652,57.848,15.5,55.201,15.5z M8,12.5h2v3H8   V12.5z M58,49.667c0,1.563-1.271,2.833-2.833,2.833H4.833C3.271,52.5,2,51.229,2,49.667V20.299C2,18.756,3.256,17.5,4.799,17.5H6h6   h2.677l4-10h22.646l4,10h9.878c1.543,0,2.799,1.256,2.799,2.799V49.667z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><path d="M30,14.5c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S39.925,14.5,30,14.5z M30,48.5c-8.822,0-16-7.178-16-16   s7.178-16,16-16s16,7.178,16,16S38.822,48.5,30,48.5z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><path d="M30,20.5c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S36.617,20.5,30,20.5z M30,42.5c-5.514,0-10-4.486-10-10   s4.486-10,10-10s10,4.486,10,10S35.514,42.5,30,42.5z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><path d="M52,19.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S54.206,19.5,52,19.5z M52,25.5c-1.103,0-2-0.897-2-2s0.897-2,2-2   s2,0.897,2,2S53.103,25.5,52,25.5z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/></g></g></svg>
            </router-link>
          </div>
        </div>
        <div class="sidebar-content-profile-tag">
          <span>{{ name[0] }} <b>{{ name.length > 1 ? name[1] : '' }}</b></span>
          <br>
          <span class="small-text">USER ID : {{this.$auth.user().former_id}}</span>
          <br>
          <div class="sidebar-content-action">
            <b-tooltip target="exButton1" title="Online!"></b-tooltip>
            <i class="zmdi zmdi-settings small-icon"></i> <i id="exButton1" @click.prevent="logout"class="zmdi zmdi-power small-icon"></i>
          </div>
        </div>

        <div class="sidebar-content-links">
          <ul>
            <router-link tag="li" :to="{name:'profile-basic'}">
              <li id="sidebar-link">
                  <i class="sidebar-link-icon zmdi zmdi-account-o"></i>
                  <span id="small-text">Personal Info</span>
              </li>
            </router-link>
            <br><br>
            <router-link tag="li" :to="{name:'profile-education'}">
              <li id="sidebar-link">
                  <i class="sidebar-link-icon zmdi zmdi-accounts-list"></i>
                  <span id="small-text">Credentials</span>
              </li>
            </router-link>
            <br><br>

            <router-link tag="li" :to="{name:'verification'}">
              <li id="sidebar-link">
                  <i class="sidebar-link-icon zmdi zmdi-check-circle"></i>
                  <span id="small-text">Verification</span>
              </li>
            </router-link>
            <br><br>

            <router-link tag="li" :to="{name:'academic-info'}" :class="{ subactive: activeChild(['subjects', 'tests', 'subject-profiles']) }">
              <li id="sidebar-link">
                  <i class="sidebar-link-icon zmdi zmdi-graduation-cap"></i>
                  <span id="small-text">Academic Info</span>
              </li>
            </router-link>

            <br><br>

            <router-link tag="li" :to="{name: 'profile-availability'}">
              <li id="sidebar-link">
                  <i class="sidebar-link-icon zmdi zmdi-calendar-note"></i>
                  <span id="small-text">Availability Info</span>
              </li>
            </router-link>
            <br><br>

            <router-link tag="li" :to="{name: 'tutor-classes'}" :class="{ subactive: activeChild(['classes', 'cycles', 'tickets']) }">
              <li id="sidebar-link">
                  <i class="sidebar-link-icon zmdi zmdi-group"></i>
                  <span id="small-text">Class Session Info</span>
              </li>
            </router-link>
            <br><br>

            <router-link tag="li" :to="{name: 'tutoring-jobs'}">
              <li id="sidebar-link">
                  <i class="sidebar-link-icon zmdi zmdi-accounts"></i>
                  <span id="small-text">Tutoring Jobs</span>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <!-- <router-link :to="{name:'profile-basic'}">Basic Info</router-link> -->
    <!-- <div class="side-links">
      <div :class="{'side-link':true, active:$route.path.match('profile/basic')}">
        Basic Info
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.basic"></i>
        </span>
      </div>

      <div :class="{'side-link':true, active:$route.path.match('profile/location')}">
      Location Details
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.location"></i>
        </span>
      </div>

      <div :class="{'side-link':true, active:$route.path.match('profile/about')}">
        About You
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.about"></i>
        </span>
      </div>

      <div :class="{'side-link':true, active:$route.path.match('profile/education')}">
        Education
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.education"></i>
        </span>
      </div>

      <div :class="{'side-link':true, active:$route.path.match('profile/teaching')}">
        Teaching Experience
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.teaching"></i>
        </span>
      </div>

      <div :class="{'side-link':true, active:$route.path.match('profile/work')}">
        Work Experience
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.work"></i>
        </span>
      </div>

      <div :class="{'side-link':true, active:$route.path.match('profile/social')}">
        Connected Accounts
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.social"></i>
        </span>
      </div>

      <div :class="{'side-link':true, active:$route.path.match('profile/media')}">
        Photos and Video
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.pic"></i>
        </span>
      </div>
      <div :class="{'side-link':true, active:$route.path.match('profile/subjects')}">
        Subjects and Classes
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.subjects"></i>
        </span>
      </div>
      <div :class="{'side-link':true, active:$route.path.match('classes')}">
        <router-link :to="{name: 'classes'}"> Classes</router-link>

      </div>
      <div :class="{'side-link':true, active:$route.path.match('profile/availability')}">
        Days of Availability
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.availability"></i>
        </span>
      </div>
      <div :class="{'side-link': true, active:$route.path.match('tests')}">
        <router-link :to="{name: 'tests'}">Tests</router-link>
        <span class="pull-right" style="position: absolute; right:0">
          <i class="fa fa-check" v-show="progress.availability"></i>
        </span>
      </div>
      <!-- <div :class="{'side-link':true, active:$route.path.match('profile/status')}">
        <router-link :to="{name: 'profile-status'}">Status</router-link>
      </div> -->
    <!--</div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'side-bar',
  data() {
    return {
      photo: this.$auth.user().profile_pic,
    }
  },
  computed: {
    ...mapState('profile', ['progress']),
    test_status() {
      return this.$store.getters.test_status;
    },
    name() {
      return this.$auth.user().name.split(' ');
    },
  },
  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: false,
        success: () => {
          this.$router.push({name: 'login'});
        },
        error() {
          console.log('error logging out ');
        },
      });
    },
    activeChild(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => this.$route.path.indexOf(path) >= 0);
    },
  },
};
</script>

<style lang="scss" scoped>
  .sidebar-content-profile-img {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    align-items: center;

    .pic-overlay {
      top: 0;
      position: absolute;
      width: 130px;
      height: 130px;
      z-index: 1;
      border-radius: 100%;
      background-color: rgba(0, 0, 0, .63);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0;
      transition: all .3s ease-in-out;
      &:hover {opacity: 1;}
      svg {width: 30px; height: auto;}
    }
  }
</style>