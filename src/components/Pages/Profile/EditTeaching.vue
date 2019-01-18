<template>
  <div class="hold">
    <h3 class="title">
      Teaching Experience
      <svg v-if="u.progress.teaching" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
    </h3>
    <div class="row m-0">
      <div v-if="doneLoading" class="panel-body elevated" style="width: 100%;">
        <div class="row mb-3">
          <div class="col">
            <div class="row mb-3">

              <div class="col-md-9">
                <label>How long have you been teaching?</label>
                <select v-model="teachingExperience.period" name="teachingExperience-period" v-validate="'required'" :class="{'form-control':true, 'is-invalid':errors.has('teachingExperience-period')}">
                  <option value="x=0">No teaching experience</option>
                  <option value="x<2">Less Than 2 Years</option>
                  <option value="3<=x<=5">Between 3 to 5 years</option>
                  <option value="6<=x<=10">Between 6 to 10 years</option>
                  <option value="x>10">Over 10 years</option>
                </select>
                <div class="invalid-feedback" v-if="errors.has('teachingExperience-period')">How long have you taught for?</div>
              </div>
            </div>
            <div class="row mb-3" v-show="experiencePeriod">
              <div class="col-md-9">
                <div class="row pl-3 d-b">
                  <label>What class of students do you teach?</label>
                  <div class="col-md-4" :key="cg.id" v-for="cg in academicClassGroups">
                    <label style="font-size: 0.9em;">
                      <input type="checkbox" class="mr-2" :value="cg.name" v-model="teachingExperience.classGroups">
                      <span style="font-size: 0.9em;">{{cg.name}}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-9">
                <div class="card card-body small info-card">
                  <p class="font-weight-bold">Academic Curriculum</p>
                  <p>
                    If you teach academic subjects for nursery, primary or secondary, then select the curriculum you can teach with. Skip this if you teach non-academic subjects or skills.
                  </p>
                </div>
              </div>
            </div>
            <div class="row mb-3">

              <div class="col-md-9">
                <label>Select Curriculum</label>
                <div class="row pl-3">

                  <div class="col-md-4" v-for="curriculum in curricula" :key="curriculum.id">
                    <label style="font-size: 0.9em">
                      <input type="checkbox" v-model="teachingExperience.curricula" :value="curriculum.name">
                      <span style="font-size: 0.9em;">{{curriculum.name}}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-9">
                <label>Where should lessons hold?</label>
                <select name="teachingExperience-lessonPlace" v-model="teachingExperience.lessonPlace" v-validate="'required'" :class="{'form-control':true, 'is-invalid' : errors.has('teachingExperience-lessonPlace')}">
                  <option value="client">At the client's place</option>
                  <option value="tutor">At your place</option>
                  <option value="any">Anywhere</option>
                </select>
                <div class="invalid-feedback" v-if="errors.has('teachingExperience-lessonPlace')">Please tell us your prefered location for tutoring</div>
              </div>
            </div>
          </div>

        </div>

        <div class="col mb-5">
          <div class="pull-right">
            <button :disabled="submitting" class="btn btn-lg btn-success submit-button" @click="validateAndSubmit">Submit
              <i class="fa fa-spin fa-circle-o-notch" v-if="submitting"></i>
            </button>
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
</template>
<script>
import { yearsBetween, months } from '@/lib/times';
import swal from 'sweetalert';
import Spinner from '@/components/Preloaders/Spinner';
import { randomId } from '@/lib/utils';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: 'teaching',
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
      years: yearsBetween(1970, new Date().getFullYear(), 'desc'),
      months,
      submitting: false,
      teachingExperience: {},
    };
  },
  mounted() {
    this.concerns.forEach(concern => {
      if (!this['hasFetched' + concern] && !this['isFetching' + concern])
        this['get' + concern]();
    });
    this.fetchCredentials().then(() => {
      !this.educations.length && this.addBlankEducation();
    });
    // this.$validator.localize('en', this.validationDictionary);
  },
  computed: {
    experiencePeriod() {
      return (this.teachingExperience.period && this.teachingExperience.period !== 'x=0');
    },
    progress() {
      const concerns = this.concerns.map(
        concern => this['hasFetched' + concern]
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
          return cg.categpry.name == 'Academic';
        }
        return cg.category_id == 1;
      });
    },
    validationDictionary() {
      const dictionary = { custom: {} };
      this.educations.forEach((ed, index) => {
        dictionary.custom[`educations-${index}-school`] = {
          required: 'Please Select a School',
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
    fetchCredentials() {
      this.fetchingCredentials = true;
      return this.$http
        .get(BASE_API + '/v1/tutor/profile/credentials')
        .then(({ data }) => {
          this.fetchedCredentials = true;
          this.educations = data.educations;
          this.experiences = data.experiences;
          this.teachingExperience = this.$set(
            this,
            'teachingExperience',
            data.teachingExperience,
          );
        })
        .then(() => {
          this.fetchingCredentials = false;
        });
    },
    qualifier: word => {
      const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
      return word ? (vowels.includes(word[0]) ? 'an' : 'a') : false;
    },
    other: item => item.name == 'Other',
    otherSchool(school_id) {
      const other = this.schools.find(this.other);
      return other ? other.id == school_id : false;
    },
    otherDepartment(department_id) {
      const other = this.departments.find(this.other);
      return other ? other.id == department_id : false;
    },
    buildData() {
      const { teachingExperience } = this;
      return {
        teachingExperience
      };
    },
    async validateAndSubmit() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.submitting = true;
        this.$http
          .post(BASE_API + '/v1/tutor/profile/teaching', this.buildData())
          .then(({ data: { message, data: tutor } }) => {
            this.updateProgress();
            this.$auth.user(tutor);
            if (this.isdash) {
              swal({
                title: "Success",
                text: `${message}`,
                icon: "success",
                buttons: ["Cancel", "Done ✓"]
              })
            } else {
              swal({
                title: 'Success',
                text: `${message} Click next to update your work experience`,
                icon: 'success',
                buttons: ['Cancel', 'Next ➜']
              })
              .then(() => this.$router.push({ name: 'work-experience-setup' }));
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
                error.response.message,
                'error'
              );
            }
          })
          .then(() => (this.submitting = false));
      } else this.alertFormError();
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
.hold {
  margin: 60px 0;
}
</style>