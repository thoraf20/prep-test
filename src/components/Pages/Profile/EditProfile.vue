<template>
  <div>
    <div class="row content-section">
      <div class="col-12 mb-5">
        <div class="panel w-100">
          <div class="panel-heading">
            <div class="panel-title">
              <div class="row">
                <div class="col-auto">Personal Details</div>
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
          <form id="profileForm" @submit.prevent="submit" v-if="doneLoading">
            <div class="panel-body">
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Phone *</label>
                </div>
                <div class="col" id="phone-container">
                  <b-form-input name="phone" v-model="tutor.phone" :class="{'is-invalid' : errors.has('phone')}" v-validate.disable="'required'"></b-form-input>
                  <div class="invalid-feedback" v-show="errors.has('phone')">{{errors.first('phone')}}</div>
                  <small class="form-text text-muted">Please make sure this is a phone number we can reach you on</small>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Email *</label>
                </div>
                <div class="col" id="email-container">
                  <b-form-input name="email" id="email" v-validate.disable="'required|email'" :class="{'is-invalid' : errors.has('email')}" v-model="tutor.email" class="form-control" type="email"></b-form-input>
                  <small class="form-text text-muted">Please make sure this is an email we can reach you on</small>
                  <div class="invalid-feedback" v-show="errors.has('email')">{{errors.first('email')}}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Gender</label>
                </div>
                <div class="col" id="gender-container">
                  <select v-model="tutor.gender" name="gender" disabled class="form-control">
                    <option value="">Select Gender</option>
                    <option value="male" :selected="'male' == tutor.gender">Male</option>
                    <option value="female" :selected="'female' == tutor.gender">Female</option>
                  </select>
                  <div class="invalid-feedback" v-show="errors.has('gender')">{{errors.first('gender')}}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Date of Birth *</label>
                </div>
                <div class="col">
                  <div class="row">
                    <div class="col-md-3 mb-2" id="dob-day-container">
                      <select name="dob_day" id="dob-day" v-model="tutor.dob.day" :class="{'form-control':true, 'is-invalid':errors.has('dob_day')}" v-validate.disable="'required'">
                        <option value="">Select Day</option>
                        <option :key="day" v-for="day in 31" :value="day">{{day}}</option>
                      </select>
                      <div class="invalid-feedback" v-show="errors.has('dob_day')">Please enter your day of birth</div>
                    </div>
                    <div class="col-md-3 mb-2" id="dob-month-container">
                      <select name="dob_month" v-validate.disable="'required'" :class="{'form-control':true, 'is-invalid':errors.has('dob_month')}" v-model="tutor.dob.month" id="dob-month" class="form-control">
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                      <div class="invalid-feedback" v-show="errors.has('dob_month')">Please enter your month of birth</div>
                    </div>
                    <div class="col-md-3 mb-2" id="dob-year-container">
                      <select name="dob_year" id="dob-year" v-validate.disable="'required'" class="form-control" v-model="tutor.dob.year" :class="{'form-control':true, 'is-invalid':errors.has('dob_year')}">
                        <option value="">Select Year</option>
                        <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                      </select>
                      <div class="invalid-feedback" v-show="errors.has('dob_year')">Please enter your year of birth</div>
                    </div>
                    <div class="col-12">
                      <small class="form-text text-muted">Only you can see this. We use this for analysis and never share with other users</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Address *</label>
                </div>
                <div class="col" id="address-container">
                  <b-form-input name="address" v-model="tutor.address" v-validate.disable="'required'" id="address" :class="{'is-invalid':errors.has('address')}"></b-form-input>
                  <small class="form-text text-muted">Enter your current location. This should be the address where you will be attending lessons from. If you move to a new location, you must update it here. Please write it properly.</small>
                  <div class="invalid-feedback" v-show="errors.has('address')">{{errors.first('address')}}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Place Of Residence</label>
                </div>
                <div class="col">
                  <div class="row">
                    <div class="col">
                      <label>State</label>
                      <select class="form-control" @change="handleStateChange" name="state" v-model="tutor.state.id" v-validate.disable="'required'">
                        <option value="" disabled selected>Select One</option>
                        <option :key="st.id" v-for="st in states" :value="st.id" :selected="st.id == 4">{{st.name}}</option>
                      </select>
                    </div>
                    <div class="col" id="location-container">
                      <label>LGA *
                        <i class="fa fa-spin fa-circle-o-notch" v-show="loadingLocations"></i>
                      </label>
                      <select :class="{'is-invalid':errors.has('location'), 'form-control':true}" v-validate.disable="'required'" v-model="tutor.location_id" name="location" id="location">
                        <option value="">Select one</option>
                        <option :key="location.id" :value="location.id" v-for="location in locationsByStateId(tutor.state.id)">{{location.name}}</option>
                      </select>
                      <div class="invalid-feedback" v-show="errors.has('location')">{{errors.first('location')}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Locations of Interest</label>
                </div>
                <div class="col-md-9" id="selectedLois-container">
                  <v-select :options="locationsByStateId(tutor.state.id)" :closeOnSelect="false" name="locations_of_interest" label="name" v-model="selectedLocationsOfInterest" multiple></v-select>
                  <div class="invalid-feedback" v-show="errors.has('locations_of_interest')">{{errors.first('locationOfInterest')}}</div>
                  <small class="form-text text-muted">Please select the locations you'd be interested in tutoring at.</small>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Teaching Status *</label>
                </div>
                <div class="col" id="teachingStatus-container">
                  <select :class="{'form-control':true, 'is-invalid': errors.has('teachingStatus')}" v-validate.disable="'required'" v-model="tutor.teaching_status" id="teachingStatus" name="teachingStatus">
                    <option value="">Select One</option>
                    <option :selected="this.$auth.user().teaching_status === 'fulltime'" value="fulltime">Full time teacher</option>
                    <option :selected="this.$auth.user().teaching_status === 'parttime'" value="parttime">Part time teacher</option>
                    <option :selected="this.$auth.user().teaching_status === 'not-teaching'" value="not-teaching">Not currently a teacher</option>
                  </select>
                  <div class="invalid-feedback" v-show="errors.has('teachingStatus')">What is your teaching status</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Personal Reference</label>
                </div>
                <div class="col" id="personalRef-container">
                  <textarea id="personalRef" v-model="tutor.personal_reference" name="personalRef" v-validate.disable="'required'" :class="{'form-control':true,'is-invalid': errors.has('personalRef')}"></textarea>
                  <small class="form-text text-muted">Provide the Name, Email and phone number of a Personal Referee</small>
                  <div class="invalid-feedback" v-show="errors.has('personalRef')">Please provide a personal reference</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Professional Reference</label>
                </div>
                <div class="col" id="professionalRef-container">
                  <textarea id="professionalRef" v-model="tutor.professional_reference" v-validate.disable="'required'" name="professionalRef" :class="{'form-control':true,'is-invalid': errors.has('professionalRef')}"></textarea>
                  <small class="form-text text-muted">Provide the Name, Email and phone number of a Professional Referee</small>
                  <div class="invalid-feedback" v-show="errors.has('professionalRef')">Please Provide a professional reference</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Price per hour of tutoring</label>
                </div>
                <div class="col" id="tutor_price-container">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">₦</span>
                    </div>
                    <input name="tutor_price" placeholder="E.g. 2000" v-validate.disable="'required|numeric'" type="number" id="tutor_price" class="form-control" v-model="tutor.tutor_price" :class="{'form-control':true,'is-invalid': errors.has('tutor_price')}">
                  </div>
                  <div class="invalid-feedback" v-show="errors.has('tutor_price')">Please provide a valid figure}</div>
                  <small class="form-text text-muted">How much do you want to earn per hour of tutoring?</small>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>About you</label>
                </div>
                <div class="col" id="aboutme-container">
                  <div class="alert alert-success mb-3">
                    <p>Your tutor profile is your best opportunity to "sell yourself" as a Prepclass Tutor. Our clients often look at multiple tutor profiles before selecting a tutor to contact, so you need to be thorough, yet concise in describing your tutoring abilities, qualifications, experience and teaching style.</p>

                    <p class="mb-1">Use this example as a guideline.
                      <strong>(Do not copy this example. It is only meant to guide your thought process)</strong>
                    </p>
                    <blockquote style="background-color: rgba(255,255,255,0.5);" class="p-3 font-italic">
                      <p>My name is Ayomide Nonso Abdullahi, I am a graduate of Physics Education from the University of Lagos. </p>
                      <p>I have 5 years of productive experience working as a private tutor in the areas of Maths, Physics and further maths. I live in Lagos where I have been able to successfully tutor over 60 students to pass various school exams, national exams and international exams.</p>
                      <p>My rare skills of imparting knowledge remains my major strength as my students remain highly motivated and successful even after my reign as their tutor</p>
                    </blockquote>
                  </div>
                  <editor name="about_tutor" v-model="tutor.about_tutor" :config="editorConfig" :class="{'is-invalid':errors.has('about_tutor')}" v-validate.disable="'required'"></editor>
                  <small class="form-text text-danger" v-show="errors.has('about_tutor')">Please tell us about yourself</small>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right">
                  <button @click.prevent="submit" :disabled="submitting" class="btn btn-success btn-lg">
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
  name: "profile-edit",
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
      genderOptions: [
        { value: "male", text: " Male" },
        { value: "female", text: "Female" }
      ],
      location: {
        states: [],
        locations: []
      },
      years: yearsBetween(1965, 2010, "desc"),
      fetchingTutor: false,
      fetchedTutor: false,
      loadingLocations: false,
      submitting: false,
      selectedLocationsOfInterest: [],
      tutor: {
        phone: this.$auth.user().phone,
        email: this.$auth.user().email,
        gender: this.$auth.user().gender,
        dob: {
          day: this.$auth.user().dob.day,
          month: this.$auth.user().dob.month,
          year: this.$auth.user().dob.year
        },
        address: this.$auth.user().address,
        location_id: this.$auth.user().location_id,
        locations_of_interest: this.$auth.user().locations_of_interest
          ? this.$auth.user().locations_of_interest
          : [],
        location: {},
        teaching_status: this.$auth.user().teaching_status,
        personal_reference: this.$auth.user().personal_reference,
        professional_reference: this.$auth.user().professional_reference,
        tutor_price: this.$auth.user().tutor_price,
        about_tutor: this.$auth.user().about_tutor,
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
        .post(BASE_API + "/v1/tutor/profile/details", this.buildData())
        .then(({ data: { message, data: tutor } }) => {
          this.errors.clear();
          this.$auth.user(tutor);
          this.updateProgress();
          swal({
            title: "Success",
            text: `${message} Click next to update your credentials`,
            icon: "success",
            buttons: ["Cancel", "Next ➜"]
          }).then(value => {
            if (value) {
              this.$router.push({ name: "profile-credentials" });
            }
          });
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
        phone: tutor.phone,
        email: tutor.email,
        location: tutor.location_id,
        gender: tutor.gender,
        dob: tutor.dob,
        selected_lois: this.selectedLocationsOfInterest.map(l => l.id),
        address: tutor.address,
        teaching_status: tutor.teaching_status,
        personal_reference: tutor.personal_reference,
        professional_reference: tutor.professional_reference,
        tutor_price: tutor.tutor_price,
        about_tutor: tutor.about_tutor
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
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-to,
  &-leave {
    opacity: 1;
  }
  &-active {
    transition: opacity 1.5s;
  }
}
</style>