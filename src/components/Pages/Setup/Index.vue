<template>
  <div class="container-material hold">
    <div class="user">
      <div class="user--details">
        <h1>Tutor Sign up</h1>
        <p>Welcome, {{ user.name }}!</p>
        <p>Your username is <b>{{ toUsername(user.name) }}</b> <small style="margin-left: 15px;"><a href="#" style="color: #639440;" @click.prevent="preview">Preview your PrepClass profile</a></small></p>
      </div>
      <div class="user--progress">
        {{ s[steps] }} | {{ steps }} of 5 steps completed
        <div class="progress-bar">
          <div class="bar" :style="{ width: `${width}%` }"></div>
        </div>
        <span>Fill out your profile</span>
      </div>
    </div>
    <div class="steps">
      <h3>Tutor signup steps</h3>
      <div class="steps-nav">
        <div class="steps-nav--item" :class="{ active: ac([ 'basic' ]) }">
          <p>1</p>
          <span><router-link :to="{ name: 'basic-setup' }">Personal Information</router-link></span>
        </div>
        <div class="steps-nav--item" :class="{ active: ac([ 'education' ]) }">
          <p>2</p>
          <span><router-link :to="{ name: 'education-setup' }" :class="{ disabled: !(u.steps && u.steps.personal_info) }">Educational Background</router-link></span>
        </div>
        <div class="steps-nav--item" :class="{ active: ac([ 'verification' ]) }">
          <p>3</p>
          <span><router-link :to="{ name: 'verification-setup' }" :class="{ disabled: !(u.steps && u.steps.educational_background) }">Verification</router-link></span>
        </div>
        <div class="steps-nav--item" :class="{ active: ac([ 'academic-info' ]) }">
          <p>4</p>
          <span><router-link :to="{ name: 'availability-info' }" :class="{ disabled: !((u.steps && u.steps.verification) && u.verified) }">Academic Information</router-link></span>
        </div>
        <div class="steps-nav--item" :class="{ active: ac([ 'how-it-works' ]) }">
          <p>5</p>
          <span><router-link :to="{ name: 'how-it-works-setup' }" :class="{ disabled: !(u.steps && u.steps.academic_info) }">How it Works</router-link></span>
        </div>
      </div>
    </div>
    <div class="alert alert-danger" role="alert" v-for="notification of nots.filter(n => !n.read)" :key="notification.id">
      {{ notification.content }}
      <span style="cursor: pointer; float: right;" @click="removeNotification(notification.id)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve" width="9px" height="9px"><g id="Close"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z" fill="#FFFFFF"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <pre>{{ width }}</pre> -->
  </div>
</template>

<script>
import StepsNav from './partials/StepsNav';

export default {
  name: 'setup-index',
  components: { StepsNav },
  data() {
    return {
      user: this.$auth.user(),
      s: [
        'Personal Information',
        'Educational Background',
        'Verification',
        'Academic Information',
        'How It Works',
      ],
      nots: [],
      r: [],
    };
  },
  computed: {
    u() {
      return this.$auth.user();
    },
    steps() {
      if (this.u.steps) {
        return Object.values(this.u.steps).filter(v => v).length;
      }
      return 0;
    },
    width() {
      return (this.steps * 100) / 5;
    },
  },
  methods: {
    toUsername(val) {
      return val.toLowerCase().replace(' ', '.');
    },
    removeNotification(id) {
      const nots = this.r.findIndex(n => n.id === id);
      this.r[nots].read = true;
      this.nots.splice(nots, 1);
      const notifications = [];

      for (let notification of this.r) {
        notifications.push(notification);
      }

      this.$store.dispatch('updateNotifications', notifications)
        .then(response => console.log(response))
        .catch(response => swal('Failed', response, 'error'));
    },
    ac(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => this.$route.path.indexOf(path) >= 0);
    },
    listen() {
      Echo.channel(`tutor-${this.$auth.user().id}-verified`)
        .listen('TutorVerified', ({ tutor }) => {
          this.$auth.fetch();
          console.log(tutor);
        });
      Echo.channel(`tutor-${this.$auth.user().id}-notifications`)
        .listen('NewNotification', ({notification}) => {
          this.r.push(notification);
          this.nots.push(notification);
        });
    },
    preview() {
      return this.$router.push({ name: 'preview-profile', params: { tutor: this.$auth.user().id }, query: { redirect: window.location.href } })
    }
  },
  mounted() {
    this.$store.dispatch('getUserTutor');
    for (let n of  this.$auth.user().notifications) {
      this.r.push(n);
      this.nots.push(n);
    }
    this.listen();
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.hold {
  padding: 10px 0;
}
.user {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .user--details {
    width: 70%;
    h1 {
      margin: 0;
      font-weight: 800;
      font-size: 30px;
      text-transform: capitalize;
      margin: 10px 0;
    }
    p {
      margin: 5px 0;
    }
  }
  .user--progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #2A2A2A;
    width: 30%;
    .progress-bar {
      margin: 5px;
      width: 100%;
      height: 20px;
      border-radius: 10px;
      background-color: #F0F2F8;
      .bar {
        height: 100%;
        min-width: 20px;
        border-radius: 10px;
        background-color: #639440;
      }
    }
    span {
      font-size: 14px;
      font-weight: 600;
    }
  }
}
.steps {
  margin: 35px 0;
  h3 {
    font-size: 20px;
    font-weight: 800;
    margin: 10px 0;
  }
}
.steps-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 25px 0;
  .steps-nav--item {
    width: 220px;
    height: 90px;
    background-color: #F0F2F8;
    padding: 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    p { width: 30%; font-size: 78px; color: #4D4F5C; line-height: 78px; margin: 0; font-weight: 200; }
    span a { display: inline-block; width: 70%; padding: 10px; font-size: 16px; color: #4D4F5C;}
    &.active { background-color: #639440; p {color: #ffffff;} span a {color: #ffffff;}}
  }
}
.content {
  width: 100%;
  margin: 35px 0;
}
</style>