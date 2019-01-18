<template>
  <div class="cont" ref="theform">
    <h3 class="title">Personal Information</h3>
    <p class="subtitle">Please provide the following information so we can start composing your profile.</p>
    <div class="row m-0">
      <div class="col-12 p-0" ref="profile_picture">
        <profile-picture @next="moveToNext"></profile-picture>
      </div>
      <div class="col-12 p-0" ref="social_verification">
        <social-verification @next="moveToNext"></social-verification>
      </div>
      <div class="col-12 p-0" ref="identity_verification">
        <identity-verification @next="moveToNext"></identity-verification>
      </div>
    </div>
    <div class="foot">
      <button class="btn btn-lg btn-default submit-button mx">Skip For Now</button>
      <button class="btn btn-lg btn-success submit-button mx" @click="saveAndContinue">Save & Continue</button>
    </div>
    <!-- <pre>{{ u }}</pre> -->
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import ProfilePicture from '@/components/Pages/Profile/ProfilePicture';
import SocialVerification from '@/components/Pages/Verification/Social';
import IdentityVerification from '@/components/Pages/Verification/Identity';

export default {
  name: 'basic-setup',
  components: {
    ProfilePicture,
    SocialVerification,
    IdentityVerification,
  },
  data() {
    return {
      nots: [],
      r: [],
    };
  },
  computed: {
    u() {
      return this.$auth.user();
    },
  },
  methods: {
    saveAndContinue() {
      this.$auth.fetch();
      if (!this.u.progress.pic) {
        return swal('Please complete the Profile Picture setup');
      }
      if (!this.u.progress.social) {
        return swal('Please setup your social accounts');
      }
      if (!this.u.progress.identity) {
        return swal('Please ensure you complete the Government Issued License setup');
      }
      if (!this.u.verified) {
        const nom = Math.floor((Math.random() * 10000) + 1000);
        this.nots.push({
          id: nom,
          read: false,
          type: 'error',
          content: 'Please wait for your profile to be approved by Prepclass Staff'
        });
        this.r.push({
          id: nom,
          read: false,
          type: 'error',
          content: 'Please wait for your profile to be approved by Prepclass Staff'
        });
        this.$nextTick(() => this.$refs.theform.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }));
        return swal('Please wait for your profile to be approved by Prepclass Staff');
      }
      axios.post(`${BASE_API}/v1/tutor/steps`, { step: 'verification' })
        .then(() => this.$store.dispatch('getUserTutor'));
      return this.$router.push({ name: 'availability-info' });
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
    moveToNext() {
      if (!this.$auth.user().progress.pic) {
        return this.$nextTick(() => {
          this.$refs.profile_picture.scrollIntoView({
            behavior: 'smooth', block: 'start', inline: 'nearest',
          });
        });
      }

      if (!this.$auth.user().progress.social) {
        return this.$nextTick(() => {
          this.$refs.social_verification.scrollIntoView({
            behavior: 'smooth', block: 'center', inline: 'nearest',
          });
        });
      }

      if (!this.$auth.user().progress.pic) {
        return this.$nextTick(() => {
          this.$refs.identity_verification.scrollIntoView({
            behavior: 'smooth', block: 'center', inline: 'nearest',
          });
        });
      }

      return null;
    },
    listen() {
      Echo.channel(`tutor-${this.$auth.user().id}-notifications`)
        .listen('NewNotification', ({notification}) => {
          this.r.push(notification);
          this.nots.push(notification);
        });
    },
  },
  mounted() {
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
</style>