<template>
  <div class="hold">
    <h3 class="title">
      Location Info
      <svg v-if="u.progress.location" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
    </h3>
    <form id="profileForm" @submit.prevent="submit" v-if="doneLoading">
      <div class="panel-body elevated" style="overflow: visible;">
        <br>
        <div class="row mb-3">

          <div class="col" id="address-container">
            <label>Address *</label>
            <b-form-input name="address" v-model="tutor.address" v-validate.disable="'required'" id="input" :class="{'is-invalid':errors.has('address')}"></b-form-input>
            <small class="form-text text-muted">Enter your current location. This should be the address where you will be attending lessons from. If you move to a new location, you must update it here. Please write it properly.</small>
            <div class="invalid-feedback" v-show="errors.has('address')">{{errors.first('address')}}</div>
          </div>
        </div>
        <div class="row mb-3">

          <div class="col">
            <div class="row">
              <div class="col">
                <label>State *</label>
                <select input="input" class="form-control" @change="handleStateChange" name="state" v-model="tutor.state.id" v-validate.disable="'required'">
                  <option value="" disabled selected>Select One</option>
                  <option :key="st.id" v-for="st in states" :value="st.id" :selected="st.id == 4">{{st.name}}</option>
                </select>
              </div>
              <div class="col" id="location-container">
                <label>LGA *</label>
                <select :class="{'is-invalid':errors.has('location'), 'form-control':true}" v-validate.disable="'required'" v-model="tutor.location_id" name="location" id="input">
                  <option value="">Select one</option>
                  <option :key="location.id" :value="location.id" v-for="location in locationsByStateId(tutor.state.id)">{{location.name}}</option>
                </select>
                <div class="invalid-feedback" v-show="errors.has('location')">{{errors.first('location')}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col" id="selectedLois-container">
            <label>Locations of Interest *</label>
            <v-select multiple id="input" :options="locationsByStateId(tutor.state.id)" :closeOnSelect="false" name="locations_of_interest" label="name" v-model="selectedLocationsOfInterest"></v-select>
            <div class="invalid-feedback" v-show="errors.has('locations_of_interest')">{{errors.first('locationOfInterest')}}</div>
            <small class="form-text text-muted">Please select the locations you'd be interested in tutoring at.</small>
          </div>
      </div>

        <div class="row">
          <div class="col-12 text-right">
            <button @click.prevent="submit" :disabled="submitting" class="btn btn-success btn-lg submit-button">
              Save
              <i class="fa fa-circle-o-notch fa-spin" v-show="submitting"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div v-else class="row justify-content-center">
      <div class="col text-center">
        <spinner />
      </div>
    </div>
  </div>
</template>

<script>
import VSelect from "vue-select";
import Editor from "vue-ckeditor2";
import { intersectionBy } from "lodash";
import swal from "sweetalert";
import { yearsBetween } from "@/lib/times";
import Spinner from "@/components/Preloaders/Spinner";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: { VSelect, Editor, Spinner },
  name: "profile-location",
  props: ['isdash'],
  data() {
    return {
      editorConfig: {
        toolbar: [
          { name: "clipboard", items: ["Undo", "Redo"] },
          { name: "styles", items: ["Styles", "Format"] },
          {
            name: "basicstyles",
            items: ["Bold", "Italic", "Strike", "-", "RemoveFormat"]
          },
          {
            name: "paragraph",
            items: [
              "NumberedList",
              "BulletedList",
              "-",
              "Outdent",
              "Indent",
              "-",
              "Blockquote"
            ]
          },
          { name: "tools", items: ["Maximize"] }
        ]
      },
      location: {
        states: [],
        locations: []
      },
      fetchingTutor: false,
      fetchedTutor: false,
      loadingLocations: false,
      submitting: false,
      selectedLocationsOfInterest: [],
      tutor: {
        address: this.$auth.user().address,
        location_id: this.$auth.user().location_id,
        locations_of_interest: this.$auth.user().locations_of_interest
          ? this.$auth.user().locations_of_interest
          : [],
        location: {},
        state: {}
      }
    };
  },
  computed: {
    ...mapGetters("profile", [
      "hasFetchedStates",
      "hasFetchedLocations",
      "isFetchingLocations",
      "isFetchingStates"
    ]),
    ...mapState("profile", ["states"]),
    ...mapGetters("profile", ["locationsByState", "locationsByStateId"]),
    progress() {
      const states = [
        this.hasFetchedStates,
        this.hasFetchedLocations,
        this.fetchedTutor
      ];
      const sum = states.reduce((a, i) => (i ? 1 + a : a), 0);
      return sum / states.length * 100;
    },
    u() {
      return this.$auth.user();
    },
    doneLoading() {
      return this.progress == 100;
    }
  },
  methods: {
    ...mapMutations("profile", {
      updateProgress: "UPDATE_PROFILE"
    }),
    ...mapActions("profile", ["getLocations", "getStates"]),
    getDetails() {
      return this.$http
        .get(`${BASE_API}/v1/tutor/profile/details`)
        .then(({ data: { data } }) => {
          this.fetchedTutor = true;
          this.$set(this, "tutor", { ...this.tutor, ...data });
        });
    },
    addProfile() {
      this.submitting = true;
      this.$http
        .post(BASE_API + "/v1/tutor/profile/location", this.buildData())
        .then(({ data: { message, data: tutor } }) => {
          this.errors.clear();
          this.$auth.user(tutor);
          this.updateProgress();
          if (this.isdash) {
            swal({
              title: "Success",
              text: `${message}`,
              icon: "success",
              buttons: ["Cancel", "Done ✓"]
            })
          } else {
            swal({
              title: "Success",
              text: `${message} Click next to tell us about you`,
              icon: "success",
              buttons: ["Cancel", "Next ➜"]
            })
            .then(() => this.$router.push({ name: 'bio-setup' }));
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 422) {
            const err = error.response.data.errors;
            Object.keys(err).forEach(e => {
              err[e].forEach(er => {
                this.errors.add(e.replace(/\./g, "_"), er);
              });
            });
            this.alertFormError();
          }
        })
        .then(() => {
          this.submitting = false;
        });
    },
    mapLocationsOfInterest() {
      const mappedLocations = intersectionBy(
        this.locationsByStateId(this.tutor.state.id),
        this.tutor.locations_of_interest,
        "id"
      );
      this.$set(this, "selectedLocationsOfInterest", mappedLocations);
    },
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.addProfile();
        } else {
          this.alertFormError();
        }
      });
    },
    alertFormError() {
      swal(
        "Sorry",
        "There are some errors on the form. Please correct them and try again",
        "error"
      ).then(this.scrollToFirstError);
    },
    scrollToFirstError() {
      if (this.errors.items.length)
        document
          .querySelector(`[name=${this.errors.items[0].field}`)
          .scrollIntoView();
    },
    handleStateChange: function(count) {
      this.clearSelectedLocations();
    },
    clearSelectedLocations() {
      this.tutor.location_id = null;
      this.selectedLocationsOfInterest = [];
    },
    buildData() {
      const tutor = this.tutor;
      return {
        location: tutor.location_id,
        selected_lois: this.selectedLocationsOfInterest.map(l => l.id),
        address: tutor.address,
      };
    }
  },
  mounted() {
    if (!this.hasFetchedStates && !this.isFetchingStates) this.getStates();
    if (!this.hasFetchedLocations && !this.isFetchingLocations) {
      this.getLocations().then(this.mapLocationsOfInterest);
    }
    this.getDetails().then(this.mapLocationsOfInterest);
  }
};
</script>

<style scoped lang="scss">
.fade {
  &.-enter,
  &.-leave-to {
    opacity: 0;
  }
  &.-enter-to,
  &.-leave {
    opacity: 1;
  }
  &.-active {
    transition: opacity 1.5s;
  }
}
.disabled {
  pointer-events:none;
  opacity:0.6;
}
a:hover {
  color: green;
}
.hold {
  margin-top: 30px;
  width: 100%;
}
.panel-body {
  padding: 10px !important;
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
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  float: right;
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.title {
  svg {
    float: right;
    height: 18px;
    width: 18px;
    margin: 0 15px;
  }
}
.elevated {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);
}
</style>