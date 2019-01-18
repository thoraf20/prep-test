<template>
  <div class="hold">
    <h3 class="title">
      Work Experience
      <svg v-if="u.progress.work" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
    </h3>
    <div class="row m-0">
      <div v-if="doneLoading" class="panel-body" style="width: 100%">
        <div class="col-md-12 pt-3 elevated ase">
          <h5>Saved Info</h5>
          <table class="table-borderless" width="100%">
            <tbody>
            <tr v-for="(exp,index) in experiences">
              <td style="font-weight: bold;font-size: large;">{{exp.place}}</td>
              <td>{{exp.title}} {{exp.teachingExp ? 'Teacher' : ''}}</td>
              <td>{{exp.start.year}} - {{exp.current ? 'present' : exp.end.year}}</td>
              <td><button class="btn btn-info sbtn"  @click="editExperience(exp)">Edit</button></td>
              <td><button class="btn btn-danger sbtn" @click="confirmDeleteWork(exp.id)">Delete</button></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="row aro">
          <p><span v-show="educations.length === 0">You have no entries saved</span></p>
          <div class="actions">
            <button class="btn btn-success pull-right submit-button mx" @click="() => u.progress.work ? nextStage() : swl('Error', 'you have to finish this first', 'error')">Move to next stage</button>
            <button class="btn btn-info submit-button" @click="addBlankExperience" :disabled="Object.keys(exp).length !== 0">Add {{experiences.length >0 ?"another":""}} experience</button>
          </div>
        </div>
        <div ref="theform" class="col-md-12 pt-3 elevated ase" :key="exp.id" v-if="Object.keys(exp).length !== 0">
          <h5>{{ isNaN(exp.id) ? 'New Experience' : `Edit ${experiences.find(e => e.id === exp.id).place } Experience`}}</h5>
          <br>
          <small>Enter your work history starting with your most recent work experience if any, and indicate if you currently work there. Please note that you may be required to provide proof.</small>
          <div class="row" >
            <div class="col-12">
              <br>
              <div class="form-group">
                <label>Is this a Teaching Experience</label>
                <input type="checkbox" v-model="exp.teachingExp" :name="'experiences'">
              </div>
              <div class="form-group">
                <label>Name of the Company or Organization</label>
                <input type="text" v-validate="'required'" v-model="exp.place" :name="'experiencesplace'" placeholder="The name of the Organization/Company" :class="{'form-control': true, 'is-invalid': errors.has('experiencesplace')}">
                <div class="invalid-feedback" v-if="errors.has('experiencesplace')">
                  Please tell us the name of the Company/School/Organization
                </div>
              </div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" v-model="exp.address" v-validate="'required'" :name="'experiencesaddress'" :placeholder="'The address of '+ (exp.place ? exp.place : 'the place/company') " :class="{'form-control': true, 'is-invalid': errors.has('experiencesaddress')}">
                <div class="invalid-feedback" v-if="errors.has('experiencesaddress')">
                  Please tell us the address of {{exp.place ? exp.place : 'the Company/School/Organization'}}
                </div>
              </div>
              <div class="form-group">
                <label>Title</label>
                <input type="text" v-model="exp.title" v-validate="'required'" :name="'experiencestitle'" :placeholder="'The title of your position'" :class="{'form-control': true, 'is-invalid': errors.has('experiencestitle')}">
                <div class="invalid-feedback" v-if="errors.has('experiencestitle')">
                  What was your title at {{exp.place ? exp.place : 'the Company/School/Organization'}}
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Start Month</label>
                    <select v-model="exp.start.month" :class="{'form-control': true, 'is-invalid': errors.has('experiences--start-month')}" :name="'experiences--start-month'" v-validate="'required'">
                      <option value="">Select Month</option>
                      <option v-for="month in months" :key="month">{{month}}</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.has('experiences--start-month')">
                      Please select a month
                      <!-- {{errors.first('experiences--start-month')}} -->
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Start Year</label>
                    <select :class="{'form-control': true, 'is-invalid': errors.has('experiences--start-year')}" :name="'experiences--start-year'" v-model="exp.start.year" v-validate="'required'">
                      <option value="">Select a Year</option>
                      <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.has('experiences--start-year')">
                      Please select a year
                      <!-- {{errors.first('experiences--start-year')}}} -->
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>
                      <input type="checkbox" v-model="exp.current" class="mr-2"> I currently work here</label>
                  </div>
                </div>
              </div>
              <div class="row" v-if="!exp.current">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>End Month</label>
                    <select v-model="exp.end.month" :class="{'form-control': true, 'is-invalid': errors.has('experiences--end-month')}" :name="'experiences--end-month'" v-validate="'required'">
                      <option value="">Select Month</option>
                      <option v-for="month in months" :key="month">{{month}}</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.has('experiences--end-month')">
                      Please select a month
                      <!-- {{errors.first('experiences--end-month')}} -->
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>End Year</label>
                    <select :class="{'form-control': true, 'is-invalid': errors.has('experiences--end-year')}" :name="'experiences--end-year'" v-model="exp.end.year" v-validate="'required'">
                      <option value="">Select a Year</option>
                      <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.has('experiences--end-year')">
                      Please select a year
                      <!-- {{errors.first('experiences--end-year')}}} -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="">Roles</label>
                <div>
                  <small>Please tell us what you did {{ exp.title ? `while you were ${qualifier(exp.title)} ${exp.title}` : '' }} at {{exp.place ? exp.place : 'the Company/ School/ Organization'}}</small>
                </div>
                <textarea v-model="exp.roles" :name="'experiencesroles'" v-validate="'required'" :class="{'form-control' : true, 'is-invalid': errors.has('experiencesroles')}" cols="30" rows="10"></textarea>
                <div class="ivalid-feedback" v-if="errors.has('experiencesroles')">
                  Please tell us what you did {{ exp.title ? `while you were ${qualifier(exp.title)} ${exp.title}` : '' }} at {{exp.place ? exp.place : 'the Company/ School/ Organization'}}
                </div>
              </div>

              <button class="btn btn-sm btn-info pull-right submit-button mx" @click="processExperience(exp)" :disabled="this.submitting">{{ isNaN(exp.id) ? 'Save' : 'Update'}}</button>
            </div>

            <div class="col hide">
              <button class="btn btn-secondary btn-sm" @click="addBlankExperience" :disabled="Object.keys(exp).length !== 0">Add {{experiences.length > 0 ? "another" : ""}} work experience</button>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-body" v-else>
        <div class="row">
          <div class="col text-center">
            <spinner />
          </div>
        </div>
      </div>
    </div>
      <!--<div class="col mb-5">-->
        <!--<div class="pull-right">-->
          <!--<button :disabled="submitting" class="btn btn-lg btn-success" @click="validateAndSubmit">Submit-->
            <!--<i class="fa fa-spin fa-circle-o-notch" v-if="submitting"></i>-->
          <!--</button>-->
        <!--</div>-->
      <!--</div>-->
    </div>

</template>

<script>
import axios from 'axios';
import { yearsBetween, months } from "@/lib/times";
import swal from "sweetalert";
import Spinner from "@/components/Preloaders/Spinner";
import { randomId } from "@/lib/utils";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "profile-work",
  components: { Spinner },
  props: ['isdash'],
  data() {
    return {
      concerns: [
        "Schools",
        "Departments",
        "GradeClasses",
        "Degrees",
        "ClassGroups",
        "Curricula"
      ],
      fetchedCredentials: false,
      fetchingCredentials: false,
      experiences: [],
      exp: {},
      years: yearsBetween(1970, new Date().getFullYear(), "desc"),
      months,
      submitting: false,
      teachingExperience: {}
    };
  },
  mounted() {
    this.concerns.forEach(concern => {
      if (!this["hasFetched" + concern] && !this["isFetching" + concern])
        this["get" + concern]();
    });
    this.fetchCredentials();
    // this.$validator.localize("en", this.validationDictionary);
    // this.addBlankExperience();
  },
  computed: {
    progress() {
      const concerns = this.concerns.map(
        concern => this["hasFetched" + concern]
      );
      concerns.push(this.fetchedCredentials);
      const sum = concerns.reduce((a, i) => (i ? 1 + a : a), 0);
      return sum / concerns.length * 100;
    },
    doneLoading() {
      return this.progress == 100;
    },
    u() {
      return this.$auth.user();
    },
    academicClassGroups() {
      return this.classGroups.filter(cg => {
        if (cg.category) {
          return cg.category.name == "Academic";
        }
        return cg.category_id == 1;
      });
    },
    validationDictionary() {
      const dictionary = { custom: {} };
      this.educations.forEach((ed, index) => {
        dictionary.custom[`educations-${index}-school`] = {
          required: "Please Select a School"
        };
      });
      return dictionary;
    },
    ...mapState("profile", [
      "schools",
      "departments",
      "degrees",
      "gradeClasses",
      "curricula",
      "classGroups"
    ]),
    ...mapGetters("profile", [
      "hasFetchedSchools",
      "isFetchingSchools",
      "hasFetchedDepartments",
      "isFetchingDepartments",
      "hasFetchedGradeClasses",
      "isFetchingGradeClasses",
      "hasFetchedDegrees",
      "isFetchingDegrees",
      "hasFetchedClassGroups",
      "isFetchingClassGroups",
      "hasFetchedCurricula",
      "isFetchingCurricula"
    ])
  },
  methods: {
    ...mapMutations("profile", {
      updateProgress: "UPDATE_CREDENTIALS"
    }),
    ...mapActions("profile", [
      "getSchools",
      "getDepartments",
      "getGradeClasses",
      "getDegrees",
      "getClassGroups",
      "getCurricula"
    ]),
    swl(...args) {
      swal(...args);
    },
    fetchCredentials() {
      this.fetchingCredentials = true;
      return this.$http
        .get(BASE_API + "/v1/tutor/profile/credentials")
        .then(({ data }) => {
          this.fetchedCredentials = true;
          this.educations = data.educations;
          this.experiences = data.experiences;
          this.teachingExperience = this.$set(
            this,
            "teachingExperience",
            data.teachingExperience
          );
        })
        .then(() => {
          this.fetchingCredentials = false;
        });
    },
    qualifier: word => {
      const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
      return word ? (vowels.includes(word[0]) ? "an" : "a") : false;
    },
    confirmDeleteWork(id) {
      this.exp = {};
      return confirm('Are you sure you want to delete this experience?') ? this.deleteExperience(id) : false;
    },
    deleteExperience(id) {
      this.experiences = this.experiences.filter(exp => exp.id != id);

      this.$http
        .delete(BASE_API + "/v1/tutor/profile/experiences/"+id)
    },
    addBlankExperience() {
      var id = randomId();

      this.exp = {
        id: id,
        teachingExperience: false,
        title: "",
        place: "",
        address: "",
        roles: "",
        current: false,
        start: {
          month: "",
          year: ""
        },
        end: {
          month: "",
          year: ""
        }
      };
      this.$nextTick(() => this.$refs.theform.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' }));
    },
    editExperience(exp) {

      this.exp = {
        id: exp.id,
        teachingExperience: exp.teachingExp,
        title: exp.title,
        place: exp.place,
        address: exp.address,
        roles: exp.roles,
        current: exp.current,
        start: {
          month: exp.start.month,
          year: exp.start.year,
        },
        end: {
          month: exp.end.month,
          year: exp.end.year,
        },
      };
      this.$nextTick(() => this.$refs.theform.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' }));
    },
    other: item => item.name == "Other",
    otherSchool(school_id) {
      const other = this.schools.find(this.other);
      return other ? other.id == school_id : false;
    },
    otherDepartment(department_id) {
      const other = this.departments.find(this.other);
      return other ? other.id == department_id : false;
    },
    buildData(exp) {
       const data = {};

      data.id = exp.id;
      data.teachingExperience = exp.teachingExp ? true : false;
      data.title = exp.title;
      data.place = exp.place;
      data.address = exp.address;
      data.roles = exp.roles;
      data.current = exp.current;
      data.start = {
        month: exp.start.month,
        year: exp.start.year
      };
      if (!exp.current) {
        data.end = {
          month: exp.end.month,
          year: exp.end.year
        };
      }

      return data;
    },
    async processExperience(exp) {
      const valid = await this.$validator.validate();
      this.submitting = true;
      if (valid) {
        if (isNaN(exp.id)) {
          this.$http
            .post(BASE_API + "/v1/tutor/profile/experiences", this.buildData(exp))
            .then(({data: {message, data: tutor }}) => {
              this.fetchCredentials();
              this.$auth.user(tutor);
              this.exp = {};
              if (this.isdash) {
                swal({
                  title: "Success",
                  text: `${message}`,
                  icon: "success",
                  buttons: ["Cancel", "Done ✓"]
                });
              } else {
                // swal({
                //   title: "Success",
                //   text: `${message} Click next to update your profile photo`,
                //   icon: "success",
                //   buttons: ["Cancel", "Next ➜"]
                // })
                // .then(() => this.$router.push({name: 'verification-setup'}));
                swal({
                  title: "Success",
                  text: `${message}`,
                  icon: "success",
                  buttons: ["Cancel", "Done ✓"]
                });
              }
            })
            .catch(error => {
              if (error.response && error.response.status == 422) {
                const err = error.response.data.errors;
                Object.keys(err).forEach(e => {
                  err[e].forEach(er => {
                    this.errors.add(e.replace(/\./g, "-"), er);
                  });
                });
                this.alertFormError();
              } else {
                swal(
                  "Sorry",
                  error.response.data,
                  "error"
                );
              }
            })
            .then(() => (this.submitting = false));
        }
        else {
          this.$http
            .patch(BASE_API + "/v1/tutor/profile/experiences/"+exp.id, this.buildData(exp))
            .then(({data: {message}}) => {
              this.fetchCredentials();
              this.exp = {};
              if (this.isdash) {
                swal({
                  title: "Success",
                  text: `${message}`,
                  icon: "success",
                  buttons: ["Cancel", "Done ✓"]
                })
              } else {
                // swal({
                //   title: "Success",
                //   text: `${message} Click next to update your profile photo`,
                //   icon: "success",
                //   buttons: ["Cancel", "Next ➜"]
                // })
                // .then(() => this.$router.push({name: 'verification-setup'}))
                swal({
                  title: "Success",
                  text: `${message}`,
                  icon: "success",
                  buttons: ["Cancel", "Done ✓"]
                });
              }
            })
            .catch(error => {
              if (error.response && error.response.status == 422) {
                const err = error.response.data.errors;
                Object.keys(err).forEach(e => {
                  err[e].forEach(er => {
                    this.errors.add(e.replace(/\./g, "-"), er);
                  });
                });
                this.alertFormError();
              } else {
                swal(
                  "Sorry",
                  error.response.data,
                  "error"
                );
              }
            })
            .then(() => (this.submitting = false));
        }
      } else this.alertFormError();
    },
    scrollToFirstError() {
      if (this.errors.items.length)
        document
          .querySelector(`[name=${this.errors.items[0].field}`)
          .scrollIntoView();
    },
    nextStage() {
      axios.post(`${BASE_API}/v1/tutor/steps`, { step: 'educational_background' })
        .then(() => {
          this.$store.dispatch('getUserTutor')
          this.$router.push({name: 'verification-setup'})
        })
        .catch((err) => {
          console.error(err);
          this.$router.push({name: 'verification-setup'})
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.hold {
  margin-top: 30px;
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
.ase {
  margin-bottom: 35px;
  padding: 15px;
  h5 {
    font-size: 18px;
    font-weight: 800;
    width: 100%;
    border-bottom: 1px solid #ededed;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
}
.panel-body {
  padding: 15px 10px !important;
}
.submit-button {
  min-width: 130px;
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  vertical-align: middle;
  box-shadow: 0 2px 2px 0 rgba(112, 112, 112, 0.14), 0 3px 1px -2px rgba(112, 112, 112, 0.12), 0 1px 5px 0 rgba(112, 112, 112, 0.2);
  float: right;
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.sbtn {
  width: 100%;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
  vertical-align: middle;
  box-shadow: 0 2px 2px 0 rgba(112, 112, 112, 0.14), 0 3px 1px -2px rgba(112, 112, 112, 0.12), 0 1px 5px 0 rgba(112, 112, 112, 0.2);
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
.hold {
  margin: 60px 0;
}
.table-borderless {
  td {padding-bottom: 10px;}
}
.mx { margin: 0 10px; }
.aro {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 0 0;
}
</style>