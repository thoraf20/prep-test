<template>
  <div class="hold">
    <h3 class="title">
      Educational Info
      <svg v-if="u.progress.education" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
    </h3>
    <div class="row m-0">
      <div class="panel-body" style="width: 100%;">
        <div class="col-md-12 pt-3 elevated ase">
          <h5>Saved Info</h5>
          <table class="table-borderless" width="100%">
            <tbody>
              <tr v-for="(edu,index) in this.educations">
                <td>({{index + 1}})</td>
                <td style="font-weight: bold;font-size: large;">{{edu.school.name}}</td>
                <td>{{edu.degree.name}} {{edu.department.name}}</td>
                <td>{{edu.start.year}} - {{edu.current ? 'present' : edu.end.year}}</td>
                <td><button class="btn btn-info sbtn" @click="editEducation(index)">Edit</button></td>
                <td><button class="btn btn-danger sbtn" @click="confirmDeleteEdu(edu.id)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row aro">
          <p><span v-show="educations.length === 0">You have no entries saved</span></p>
          <div class="actions">
            <button class="btn btn-success pull-right submit-button mx" @click="() => u.progress.education ? $router.push({ name: 'teaching-info-setup' }) : swl('Error', 'you have to finish this first', 'error')">Move to next stage</button>
            <button class="btn btn-info submit-button" @click="addBlankEducation()" :disabled="Object.keys(education).length !== 0">Add {{educations.length >0 ?"another":""}} qualification</button>
          </div>
        </div>
        <div ref="theform">
          <div class="col-md-12 pt-3 elevated ase" :key="education.id" v-if="Object.keys(education).length !== 0">
            <h5>{{ isNaN(education.id) ? 'New Qualification' : `Edit ${educations.find(e => e.id === education.id).school.name } Qualification`}}</h5>
            <input type="hidden" :value="education.id" :name="'educations.id'">
            <!-- <button class="btn btn-sm btn-danger pull-right" @click="deleteEducation(edu.id)">Delete</button> -->
            <div class="form-group">
              <label>School Name</label>
              <select :name="'educations-school'" v-validate="'required'" v-model="education.school_id" :class="{'form-control': true, 'is-invalid': errors.has('educations-school')}">
                <option>Select One</option>
                <option v-for="school in schools" :value="school.id" :key="school.id">{{school.name}}</option>
              </select>
              <div class="invalid-feedback" v-if="true">
                Please Select your School
                <!-- {{errors.first('educations-school')}} -->
              </div>
              <small>Select 'Other' if your school is not on this list</small>
            </div>
            <div class="form-group" v-if="otherSchool(education.school_id)">
              <label>Other School</label>
              <div>
                <small class="font-weight-bold">Please write in full, no abbreviations.</small>
                <small> E.g. write 'University of Benin' not 'UNIBEN'</small>
              </div>
              <input type="text" v-validate="otherSchool(education.school_id) ? 'required':''" :name="'educations-schoolName'" v-model="education.schoolName" :class="{'form-control': true, 'is-invalid': errors.has('educations-schoolName')}" />
              <div class="invalid-feedback" v-if="errors.has('educations-schoolName')">
                Please type in your school name
                <!-- {{errors.first('educations-schoolName')}} -->
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Department</label>
                  <select :name="'educations-department'" v-model="education.department_id" :class="{'form-control': true, 'is-invalid': errors.has('educations-department')}">
                    <option value="">Select One</option>
                    <option v-for="department in departments" :value="department.id" :key="department.id">{{department.name}}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.has('educations-department')">
                    Please select your department
                    <!-- {{errors.first('educations-department')}} -->
                  </div>
                </div>
                <div class="form-group" v-if="otherDepartment(education.department_id)">
                  <label>Other Department</label>
                  <div>
                    <small class="font-weight-bold">Please write in full, no abbreviations.</small>
                    <small> E.g. write 'Computer Science' not 'Computer Sc.'</small>
                  </div>
                  <input type="text" v-validate="otherDepartment(education.department_id) ? 'required':''" v-model="education.departmentName" :name="'educations-departmentName'" :class="{'form-control': true, 'is-invalid': errors.has('educations-departmentName')}" />
                  <div class="invalid-feedback" v-if="true">
                    <!-- {{errors.first('educations-departmentName')}} -->
                    Please type in your department name
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>Start Month</label>
                  <select v-model="education.start.month" :class="{'form-control': true, 'is-invalid': errors.has('educations-start-month')}" :name="'educations-start-month'" v-validate="'required'">
                    <option value="">Select Month</option>
                    <option v-for="month in months" :key="month">{{month}}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.has('educations-start-month')">
                    Please select a month
                    <!-- {{errors.first('educations-start-month')}} -->
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Start Year</label>
                  <select :class="{'form-control': true, 'is-invalid': errors.has('educations-start-year')}" :name="'educations-start-year'" v-model="education.start.year" v-validate="'required'">
                    <option value="">Select a Year</option>
                    <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.has('educations-start-year')">
                    Please Select a year
                    <!-- {{errors.first('educations-start-year')}}} -->
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Degree</label>
                  <select :class="{'form-control': true, 'is-invalid': errors.has('educations-degree')}" :name="'educations-degree'" v-model="education.degree_id" v-validate="'required'">
                    <option value="">Select an Option</option>
                    <option v-for="degree in degrees" :value="degree.id" :key="degree.id">{{degree.name}}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.has('educations-degree')">
                    Please Select a degree
                    <!-- {{errors.first('educations-degree')}} -->
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>
                    <input type="checkbox" v-model="education.current" class="mr-2"> I currently school here</label>
                </div>
              </div>
            </div>
            <div class="row" v-if="!education.current">
              <div class="col-md-3">
                <div class="form-group">
                  <label>End Month</label>
                  <select v-model="education.end.month" :class="{'form-control': true, 'is-invalid': errors.has('educations-end-month')}" :name="'educations-end-month'" v-validate="education.current ? '' : 'required'">
                    <option value="">Select Month</option>
                    <option v-for="month in months" :key="month">{{month}}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.has('educations-end-month')">
                    Please select a month
                    <!-- {{errors.first('educations-end-month')}} -->
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>End Year</label>
                  <select :class="{'form-control': true, 'is-invalid': errors.has('educations-end-year')}" :name="'educations-end-year'" v-model="education.end.year" v-validate="education.current ? '' : 'required'">
                    <option value="">Select a Year</option>
                    <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.has('educations-end-year')">
                    Please select a Year
                    <!-- {{errors.first('educations-end-year')}}} -->
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Final Grade</label>
                  <input placeholder="Your final GPA" type="number" step="0.01" :class="{'form-control': true, 'is-invalid': errors.has('educations-grade') }" :name="'educations-grade'" v-model="education.grade" v-validate="education.current ? '' : 'required'">
                  <div class="invalid-feedback" v-if="errors.has('educations-grade')">
                    What is was your grade
                    <!-- {{errors.first('educations-grade')}} -->
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Class of Degree</label>
                  <select :class="{'form-control': true, 'is-invalid': errors.has('educations-gradeClass')}" v-model="education.grade_class_id" v-validate="education.current ? '' : 'required'" :name="'educations-gradeClass'">
                    <option value="">Select one</option>
                    <option :key="gc.id" v-for="gc in gradeClasses" :value="gc.id">{{gc.name}}</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.has('educations-gradeClass')">
                    Please Select one
                    <!-- {{errors.first('educations-gradeClass')}} -->
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-lg btn-info pull-center submit-button mx" @click="processForm(education)" :disabled="this.submitting">{{ isNaN(education.id) ? 'Save' : 'Update'}}</button>
          </div>
        </div>
        <div class="col-md-right hide">
          <button class="btn btn-secondary btn-sm" @click="addBlankEducation()"  :disabled="Object.keys(education).length !== 0">Add {{educations.length >0 ?"another":""}} educational qualification</button>
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
</template>

<script>
import { yearsBetween, months } from '@/lib/times';
import swal from 'sweetalert';
import Spinner from '@/components/Preloaders/Spinner';
import { randomId } from '@/lib/utils';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'profile-education',
  components: { Spinner },
  props: ['isdash'],
  data() {
    return {
      concerns: [
        'Schools',
        'Departments',
        'GradeClasses',
        'Degrees',
        'ClassGroups',
        'Curricula',
      ],
      fetchedCredentials: false,
      fetchingCredentials: false,
      educations: [],
      education: {},
      teachingExperience: {},
      years: yearsBetween(1970, new Date().getFullYear(), 'desc'),
      months,
      submitting: false,
    };
  },
  mounted() {
    this.concerns.forEach((concern) => {
      if (!this['hasFetched' + concern] && !this['isFetching' + concern])
        this['get' + concern]();
    });
    this.fetchCredentials();
    // this.$validator.localize('en', this.validationDictionary);
  },
  computed: {
    progress() {
      const concerns = this.concerns.map(concern => this['hasFetched' + concern]);
      concerns.push(this.fetchedCredentials);
      const sum = concerns.reduce((a, i) => (i ? 1 + a : a), 0);
      return sum / concerns.length * 100;
    },
    u() {
      return this.$auth.user();
    },
    doneLoading() {
      return this.progress === 100;
    },
    academicClassGroups() {
      return this.classGroups.filter(cg => {
        if (cg.category) {
          return cg.categpry.name == 'Academic';
        }
        return cg.category_id == 1;
      });
    },
    validationDictionary() {
      const dictionary = { custom: {} };
      this.educations.forEach((ed, index) => {
        dictionary.custom[`educations-${index}-school`] = {
          required: 'Please Select a School'
        };
      });
      return dictionary;
    },
    ...mapState('profile', [
      'schools',
      'departments',
      'degrees',
      'gradeClasses',
      'curricula',
      'classGroups',
    ]),
    ...mapGetters('profile', [
      'hasFetchedSchools',
      'isFetchingSchools',
      'hasFetchedDepartments',
      'isFetchingDepartments',
      'hasFetchedGradeClasses',
      'isFetchingGradeClasses',
      'hasFetchedDegrees',
      'isFetchingDegrees',
      'hasFetchedClassGroups',
      'isFetchingClassGroups',
      'hasFetchedCurricula',
      'isFetchingCurricula',
    ]),
  },
  methods: {
    ...mapMutations('profile', {
      updateProgress: 'UPDATE_CREDENTIALS',
    }),
    ...mapActions('profile', [
      'getSchools',
      'getDepartments',
      'getGradeClasses',
      'getDegrees',
      'getClassGroups',
      'getCurricula',
    ]),
    swl(...args) {
      swal(...args);
    },
    fetchCredentials() {
      this.fetchingCredentials = true;
      this.$http
      .get(BASE_API + "/v1/tutor/profile/credentials")
      .then(({ data }) => {
        this.fetchedCredentials = true;
        this.educations = data.educations;
        this.experiences = data.experiences;
        this.$set(
          this,
          "teachingExperience",
          data.teachingExperience,
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
    confirmDeleteEdu(id) {
      this.education = {};
      return confirm('Are you sure you want to delete this education?') ? this.deleteEducation(id) : false;
    },
    deleteEducation(id) {

      if(isNaN(id)) {
        this.educations = this.educations.filter(edu => edu.id != id);
      } else {
        this.educations = this.educations.filter(edu => edu.id != id);
        this.$http
        .delete(BASE_API + "/v1/tutor/profile/educations/" + id)
      }
    },
    addBlankEducation() {
      this.education = {
        id: randomId(),
        school_id: '',
        department_id: '',
        degree_id: '',
        grade_class_id: '',
        grade: '',
        current: false,
        start: {
          month: '',
          year: '',
        },
        end: {
          month: '',
          year: '',
        },
      };
      this.$nextTick(() => this.$refs.theform.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' }));
    },
    editEducation(index) {
      const edu = this.educations[index];
      this.education = {
        id: edu.id,
        school_id: edu.school_id,
        department_id: edu.department_id,
        degree_id: edu.degree_id,
        grade_class_id: edu.grade_class_id,
        grade: edu.grade,
        current: edu.current,
        start: {
          month: edu.start.month,
          year: edu.start.year,
        },
        end: {
          month: edu.end.month,
          year: edu.end.year,
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
    buildData(edu) {
      const data = {};

      data.id = edu.id;
      if (this.otherSchool(edu.school_id)) {
        data.schoolName = edu.schoolName;
      }
      data.school = edu.school_id;
      if (this.otherDepartment(edu.department_id)) {
        data.departmentName = edu.departmentName;
      }
      data.department = edu.department_id;
      data.degree = edu.degree_id;
      data.start = edu.start;
      data.current = edu.current;
      if (!edu.current) {
        data.end = edu.end;
        data.grade = edu.grade;
        data.gradeClass = edu.grade_class_id;
      }

      return data;
    },
    async processForm(education) {
      const valid = await this.$validator.validate();
      if (valid) {
        this.submitting = true;
        if(isNaN(education.id)) {
          this.$http
          .post(BASE_API + '/v1/tutor/profile/educations', this.buildData(education))
          .then(({ data: { message, data: tutor } }) => {
            this.fetchCredentials();
            this.$auth.user(tutor);
            this.education = {};
            // this.addBlankEducation();
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
                text: `${message}`,
                icon: "success",
                buttons: ["Cancel", "Done ✓"]
              })
              // swal({
              //   title: 'Success',
              //   text: `${message} Click next to update your teaching experience`,
              //   icon: 'success',
              //   buttons: ['Cancel', 'Next ➜'],
              // })
              // .then(() => this.$router.push({ name: 'teaching-info-setup' }));
            }
          })
          .catch(error => {
            if (error.response && error.response.status == 422) {
              const err = error.response.data.errors;
              Object.keys(err).forEach(e => {
                err[e].forEach(er => {
                  this.errors.add(e.replace(/\./g, '-'), er);
                });
              });
              this.alertFormError();
            } else {
              swal(
                'Sorry',
                error.response.data,
                'error'
                );
            }
          })
          .then(() => (this.submitting = false));
        }
        else {
          this.$http
          .patch(BASE_API + '/v1/tutor/profile/educations/'+education.id, this.buildData(education))
          .then(({ data: { message } }) => {
            this.fetchCredentials();
            this.education = {};
            // this.addBlankEducation();
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
                text: `${message}`,
                icon: "success",
                buttons: ["Cancel", "Done ✓"]
              })
              // swal({
              //   title: 'Success',
              //   text: `${message} Click next to update your teaching experience`,
              //   icon: 'success',
              //   buttons: ['Cancel', 'Next ➜']
              // })
              // .then(() => this.$router.push({ name: 'teaching-info-setup'}));
            }
          })
          .catch(error => {
            if (error.response && error.response.status == 422) {
              const err = error.response.data.errors;
              Object.keys(err).forEach(e => {
                err[e].forEach(er => {
                  this.errors.add(e.replace(/\./g, '-'), er);
                });
              });
              this.alertFormError();
            } else {
              swal(
                'Sorry',
                error.response.data,
                'error'
                );
            }
          })
          .then(() => (this.submitting = false));
        }
      }
      else this.alertFormError();
    },
    alertFormError() {
      swal(
        'Sorry',
        'There are some errors on the form. Please correct them and try again',
        'error'
        ).then(this.scrollToFirstError);
    },
    scrollToFirstError() {
      if (this.errors.items.length)
        document
      .querySelector(`[name=${this.errors.items[0].field}`)
      .scrollIntoView();
    }
  }
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
.table-borderless {
  td {padding-bottom: 10px;}
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