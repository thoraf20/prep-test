<template>
  <div class="hold">
    <h3 class="title">
      Basic Info
      <svg v-if="u.progress.basic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
    </h3>
    <form id="profileForm" @submit.prevent="submit" v-if="doneLoading">
      <div class="panel-body elevated">
        <br>
        <div class="row mb-3">
          <div class="col" id="phone-container">
            <label>Phone *</label>
            <b-form-input name="phone" v-model="tutor.phone" :class="{'is-invalid' : errors.has('phone')}" v-validate.disable="'required'"></b-form-input>
            <div class="invalid-feedback" v-show="errors.has('phone')">{{errors.first('phone')}}</div>
            <small class="form-text text-muted">Please make sure this is a phone number we can reach you on</small>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col" id="email-container">
            <label>Email *</label>
            <b-form-input name="email" id="input" v-validate.disable="'required|email'" :class="{'is-invalid' : errors.has('email')}" v-model="tutor.email" class="form-control" type="email"></b-form-input>
            <small class="form-text text-muted">Please make sure this is an email we can reach you on</small>
            <div class="invalid-feedback" v-show="errors.has('email')">{{errors.first('email')}}</div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col" id="gender-container">
            <label>Gender *</label>
            <select v-model="tutor.gender" name="gender" disabled class="form-control">
              <option value="">Select Gender</option>
              <option value="male" :selected="'male' == tutor.gender">Male</option>
              <option value="female" :selected="'female' == tutor.gender">Female</option>
            </select>
            <div class="invalid-feedback" v-show="errors.has('gender')">{{errors.first('gender')}}</div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label>Date of Birth *</label>
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
  name: "profile-basic",
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
      genderOptions: [
        { value: "male", text: " Male" },
        { value: "female", text: "Female" }
      ],
      years: yearsBetween(1965, 2010, "desc"),
      fetchingTutor: false,
      fetchedTutor: false,
      submitting: false,
      tutor: {
        phone: this.$auth.user().phone,
        email: this.$auth.user().email,
        gender: this.$auth.user().gender,
        dob: {
          day: this.$auth.user().dob.day,
          month: this.$auth.user().dob.month,
          year: this.$auth.user().dob.year
        }
      }
    };
  },
  computed: {
    progress() {
      const states = [
        this.fetchedTutor
      ];
      const sum = states.reduce((a, i) => (i ? 1 + a : a), 0);
      return sum / states.length * 100;
    },
    doneLoading() {
      return this.progress == 100;
    },
    u() {
      return this.$auth.user();
    },
  },
  methods: {
    ...mapMutations("profile", {
      updateProgress: "UPDATE_PROFILE"
    }),
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
        .post(BASE_API + "/v1/tutor/profile/basic", this.buildData())
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
              text: `${message} Click next to update your locations`,
              icon: "success",
              buttons: ["Cancel", "Next ➜"]
            })
            .then(() => this.$router.push({ name: 'location-info-setup' }));
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
    buildData() {
      const tutor = this.tutor;
      return {
        phone: tutor.phone,
        email: tutor.email,
        gender: tutor.gender,
        dob: tutor.dob
      };
    }
  },
  mounted() {
    this.getDetails().then(this.mapLocationsOfInterest);
  }
};
</script>

<style scoped lang="scss">
.hold {
  margin-top: 30px;
  width: 100%;
}
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