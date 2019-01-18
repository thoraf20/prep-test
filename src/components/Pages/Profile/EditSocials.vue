<template>
  <div>
    <div class="row">
      <div style="width: 100%">
        <div class="col-12 mb-5">
          <div class="card">
            <div class="card-header">
              <div class="panel-title">
                <div class="row">
                  <div class="col-auto">Connected Accounts</div>
                  <div class="d-inline-block col mr-auto">
                    <transition name="fade">
                      <b-progress :value="progress" v-show="!doneLoading" :max="100"></b-progress>
                    </transition>
                  </div>
                  <div class="col-auto">
                    ID : {{$auth.user().former_id}}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="doneLoading" class="card-body">
              <div class="row mb-3">
                <!--<div class="col-md-3 text-md-right">-->
                <!--<label class="dark-label">Social Media Accounts</label>-->
                <!--</div>-->
                <div class="col">
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label>Facebook</label>
                    </div>
                    <div class="col-md-9">
                      <button class="btn btn-sm btn-info pull-right" :disabled="$auth.user().progress.facebook" @click="connectFacebook($auth.user().id)">Connect Facebook</button>
                      <small class="form-text text-muted" v-if="$auth.user().progress.facebook">Facebook account has been connected</small>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label>LinkedIn</label>
                    </div>
                    <div class="col-md-9">
                      <button class="btn btn-sm btn-blue pull-right" :disabled="$auth.user().progress.linkedin" @click="connectLinkedIn($auth.user().id)">Connect LinkedIn</button>
                      <small class="form-text text-muted" v-if="$auth.user().progress.linkedin">LinkedIn account has been connected</small>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label>Google</label>
                    </div>
                    <div class="col-md-9">
                      <button class="btn btn-sm btn-danger pull-right" :disabled="$auth.user().progress.google" @click="connectGoogle($auth.user().id)">Connect Google</button>
                      <small class="form-text text-muted" v-if="$auth.user().progress.google">Google account has been connected</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
            </div>
            <div class="card-body" v-else>
              <div class="row">
                <div class="col text-center">
                  <spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col mb-5">
        <div class="pull-right">
          <button :disabled="submitting" class="btn btn-lg btn-success" @click="validateAndSubmit">Continue
            <i class="fa fa-spin fa-circle-o-notch" v-if="submitting"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { yearsBetween, months } from "@/lib/times";
import swal from "sweetalert";
import Spinner from "@/components/Preloaders/Spinner";
import { randomId } from "@/lib/utils";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "social",
  components: { Spinner },
  data() {
    return {
      concerns: [],
      submitting: false,
      facebook: false,
      linkedin: false,
      google: false
    };
  },
  mounted() {

  },
  computed: {
    progress() {
      return 100;
    },
    doneLoading() {
      return this.progress == 100;
    },
  },
  methods: {
    qualifier: word => {
      const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
      return word ? (vowels.includes(word[0]) ? "an" : "a") : false;
    },
    async validateAndSubmit() {

      swal({
        title: "Success",
        text: `Click next to update your profile photo`,
        icon: "success",
        buttons: ["Cancel", "Next ➜"]
      }).then(value => {
        if (value) {
          this.$router.push({ name: "profile-media" });
        }
      });
    },
    connectFacebook(id) {
      window.location.href = BASE_API + "/v1/tutor/facebook/redirect?redirectTo=" + this.getCurrentUrl() + "&redirectId=" + id;
    },
    connectLinkedIn(id) {
      window.location.href = BASE_API + "/v1/tutor/linkedin/redirect?redirectTo=" + this.getCurrentUrl() + "&redirectId=" + id;
    },
    connectGoogle(id) {
      window.location.href = BASE_API + "/v1/tutor/google/redirect?redirectTo=" + this.getCurrentUrl() + "&redirectId=" + id;
    },
    getCurrentUrl() {
      var baseUrl = window.location.hostname;

      if (baseUrl.indexOf('localhost') !== -1) {
        baseUrl = 'http://localhost:8090';
      }

      return baseUrl + window.location.pathname;

    }
  }
};

</script>
<style scoped>
</style>
