<template>
  <div>
    <div class="row">
      <div style="width: 100%">
        <div class="col-12 mb-5">
          <div class="card">
            <div class="card-header">
              <div class="panel-title">

                <div class="row">
                  <div class="col-auto">Credentials</div>
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
                <div class="col-md-3 text-md-right">
                  <label class="dark-label">Education</label>
                </div>
                <div class="col">
                  <p class="small">Enter your Educational qualifications. Begin with your highest educational qualifications, whether you are currently enrolled or have completed.</p>
                  <div class="row" v-if="false">
                    <div class="col-12 is-invalid">
                      <div class="alert alert-danger">
                        <p class="mb-0">Error</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" :key="edu.id" v-for="(edu,index) in educations">
                      <hr>
                      <input type="hidden" :value="edu.id" :name="'educations.'+index+'.id'">
                      <button class="btn btn-sm btn-danger pull-right" :disabled="educations.length==1" @click="deleteEducation(edu.id)">Delete</button>
                      <div class="form-group">
                        <label>School Name</label>
                        <select :name="'educations-'+index+'-school'" v-validate="'required'" v-model="edu.school_id" :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-school')}">
                          <option>Select One</option>
                          <option v-for="school in schools" :value="school.id" :key="school.id">{{school.name}}</option>
                        </select>
                        <div class="invalid-feedback" v-if="true">
                          Please Select your School
                          <!-- {{errors.first('educations-'+index+'-school')}} -->
                        </div>
                        <small>Select 'Other' if your school is not on this list</small>
                      </div>
                      <div class="form-group" v-if="otherSchool(edu.school_id)">
                        <label>Other School</label>
                        <div>
                          <small class="font-weight-bold">Please write in full, no abbreviations.</small>
                          <small> E.g. write 'University of Benin' not 'UNIBEN'</small>
                        </div>
                        <input type="text" v-validate="otherSchool(edu.school_id) ? 'required':''" :name="'educations-'+index+'-schoolName'" v-model="edu.schoolName" :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-schoolName')}" />
                        <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-schoolName')">
                          Please type in your school name
                          <!-- {{errors.first('educations-'+index+'-schoolName')}} -->
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Department</label>
                            <select :name="'educations-'+index+'-department'" v-model="edu.department_id" :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-department')}">
                              <option value="">Select One</option>
                              <option v-for="department in departments" :value="department.id" :key="department.id">{{department.name}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-department')">
                              Please select your department
                              <!-- {{errors.first('educations-'+index+'-department')}} -->
                            </div>
                          </div>
                          <div class="form-group" v-if="otherDepartment(edu.department_id)">
                            <label>Other Department</label>
                            <div>
                              <small class="font-weight-bold">Please write in full, no abbreviations.</small>
                              <small> E.g. write 'Computer Science' not 'Computer Sc.'</small>
                            </div>
                            <input type="text" v-validate="otherDepartment(edu.department_id) ? 'required':''" v-model="edu.departmentName" :name="'educations-'+index+'-departmentName'" :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-departmentName')}" />
                            <div class="invalid-feedback" v-if="true">
                              <!-- {{errors.first('educations-'+index+'-departmentName')}} -->
                              Please type in your department name
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Start Month</label>
                            <select v-model="edu.start.month" :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-start-month')}" :name="'educations-'+index+'-start-month'" v-validate="'required'">
                              <option value="">Select Month</option>
                              <option v-for="month in months" :key="month">{{month}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-start-month')">
                              Please select a month
                              <!-- {{errors.first('educations-'+index+'-start-month')}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Start Year</label>
                            <select :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-start-year')}" :name="'educations-'+index+'-start-year'" v-model="edu.start.year" v-validate="'required'">
                              <option value="">Select a Year</option>
                              <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-start-year')">
                              Please Select a year
                              <!-- {{errors.first('educations-'+index+'-start-year')}}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Degree</label>
                            <select :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-degree')}" :name="'educations-'+index+'-degree'" v-model="edu.degree_id" v-validate="'required'">
                              <option value="">Select an Option</option>
                              <option v-for="degree in degrees" :value="degree.id" :key="degree.id">{{degree.name}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-degree')">
                              Please Select a degree
                              <!-- {{errors.first('educations-'+index+'-degree')}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>
                              <input type="checkbox" v-model="edu.current" class="mr-2"> I currently school here</label>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="!edu.current">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>End Month</label>
                            <select v-model="edu.end.month" :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-end-month')}" :name="'educations-'+index+'-end-month'" v-validate="edu.current ? '' : 'required'">
                              <option value="">Select Month</option>
                              <option v-for="month in months" :key="month">{{month}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-end-month')">
                              Please select a month
                              <!-- {{errors.first('educations-'+index+'-end-month')}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>End Year</label>
                            <select :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-end-year')}" :name="'educations-'+index+'-end-year'" v-model="edu.end.year" v-validate="edu.current ? '' : 'required'">
                              <option value="">Select a Year</option>
                              <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-end-year')">
                              Please select a Year
                              <!-- {{errors.first('educations-'+index+'-end-year')}}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Final Grade</label>
                            <input placeholder="Your final GPA" type="number" step="0.01" :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-grade') }" :name="'educations-'+index+'-grade'" v-model="edu.grade" v-validate="edu.current ? '' : 'required'">
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-grade')">
                              What is was your grade
                              <!-- {{errors.first('educations-'+index+'-grade')}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Class of Degree</label>
                            <select :class="{'form-control': true, 'is-invalid': errors.has('educations-'+index+'-gradeClass')}" v-model="edu.grade_class_id" v-validate="edu.current ? '' : 'required'" :name="'educations-'+index+'-gradeClass'">
                              <option value="">Select one</option>
                              <option :key="gc.id" v-for="gc in gradeClasses" :value="gc.id">{{gc.name}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('educations-'+index+'-gradeClass')">
                              Please Select one
                              <!-- {{errors.first('educations-'+index+'-gradeClass')}} -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <button class="btn btn-secondary btn-sm" @click="addBlankEducation">Add {{this.educations.length ? "another" : ''}} educational qualification</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label class="dark-label">Teaching Experience</label>
                </div>
                <div class="col">
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label>How long have you been teaching?</label>
                    </div>
                    <div class="col-md-9">
                      <select v-model="teachingExperience.period" name="teachingExperience-period" v-validate="'required'" :class="{'form-control':true, 'is-invalid':errors.has('teachingExperience-period')}">
                        <option value="x<2">Less Than 2 Years</option>
                        <option value="3<=x<=5">Between 3 to 5 years</option>
                        <option value="6<=x<=10">Between 6 to 10 years</option>
                        <option value="x>10">Over 10 years</option>
                      </select>
                      <div class="invalid-feedback" v-if="errors.has('teachingExperience-period')">How long have you taught for?</div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label>What class of students do you teach?</label>
                    </div>
                    <div class="col-md-9">
                      <div class="row pl-3">
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
                    <div class="col-12">
                      <div class="card card-body small info-card">
                        <p class="font-weight-bold">Academic Curriculum</p>
                        <p>
                          If you teach academic subjects for nursery, primary or secondary, then select the curriculum you can teach with. Skip this if you teach non-academic subjects or skills.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-3">
                      <label>Select Curriculum</label>
                    </div>
                    <div class="col-md-9">
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
                    <div class="col-md-3">
                      <label>Where should lessons hold?</label>
                    </div>
                    <div class="col-md-9">
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
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label class="dark-label">Work Experience</label>
                </div>
                <div class="col">
                  <small>Enter your work history starting with your most recent work experience if any, and indicate if you currently work there. Please note that you may be required to provide proof.</small>

                  <div class="row">
                    <div class="col-12" :key="exp.id" v-for="(exp,index) in experiences">
                      <hr>
                      <button class="btn btn-sm btn-danger pull-right" @click="deleteExperience(exp.id)">Delete</button>
                      <div class="form-group">
                        <label>Is this a Teaching Experience</label>
                        <input type="checkbox" v-model="exp.teachingExp" :name="'experiences'">
                      </div>
                      <div class="form-group">
                        <label>Name of the Company or Organization</label>
                        <input type="text" v-validate="'required'" v-model="exp.place" :name="'experiences'+index+'place'" placeholder="The name of the Organization/Company" :class="{'form-control': true, 'is-invalid': errors.has('experiences'+index+'place')}">
                        <div class="invalid-feedback" v-if="errors.has('experiences'+index+'place')">
                          Please tell us the name of the Company/School/Organization
                        </div>
                      </div>
                      <div class="form-group">
                        <label>Address</label>
                        <input type="text" v-model="exp.address" v-validate="'required'" :name="'experiences'+index+'address'" :placeholder="'The address of '+ (exp.place ? exp.place : 'the place/company') " :class="{'form-control': true, 'is-invalid': errors.has('experiences'+index+'address')}">
                        <div class="invalid-feedback" v-if="errors.has('experiences'+index+'address')">
                          Please tell us the address of {{exp.place ? exp.place : 'the Company/School/Organization'}}
                        </div>
                      </div>
                      <div class="form-group">
                        <label>Title</label>
                        <input type="text" v-model="exp.title" v-validate="'required'" :name="'experiences'+index+'title'" :placeholder="'The title of your position'" :class="{'form-control': true, 'is-invalid': errors.has('experiences'+index+'title')}">
                        <div class="invalid-feedback" v-if="errors.has('experiences'+index+'title')">
                          What was your title at {{exp.place ? exp.place : 'the Company/School/Organization'}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Start Month</label>
                            <select v-model="exp.start.month" :class="{'form-control': true, 'is-invalid': errors.has('experiences-'+index+'-start-month')}" :name="'experiences-'+index+'-start-month'" v-validate="'required'">
                              <option value="">Select Month</option>
                              <option v-for="month in months" :key="month">{{month}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('experiences-'+index+'-start-month')">
                              Please select a month
                              <!-- {{errors.first('experiences-'+index+'-start-month')}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Start Year</label>
                            <select :class="{'form-control': true, 'is-invalid': errors.has('experiences-'+index+'-start-year')}" :name="'experiences-'+index+'-start-year'" v-model="exp.start.year" v-validate="'required'">
                              <option value="">Select a Year</option>
                              <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('experiences-'+index+'-start-year')">
                              Please select a year
                              <!-- {{errors.first('experiences-'+index+'-start-year')}}} -->
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
                            <select v-model="exp.end.month" :class="{'form-control': true, 'is-invalid': errors.has('experiences-'+index+'-end-month')}" :name="'experiences-'+index+'-end-month'" v-validate="'required'">
                              <option value="">Select Month</option>
                              <option v-for="month in months" :key="month">{{month}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('experiences-'+index+'-end-month')">
                              Please select a month
                              <!-- {{errors.first('experiences-'+index+'-end-month')}} -->
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>End Year</label>
                            <select :class="{'form-control': true, 'is-invalid': errors.has('experiences-'+index+'-end-year')}" :name="'experiences-'+index+'-end-year'" v-model="exp.end.year" v-validate="'required'">
                              <option value="">Select a Year</option>
                              <option :key="year" v-for="year in years" :value="year">{{year}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errors.has('experiences-'+index+'-end-year')">
                              Please select a year
                              <!-- {{errors.first('experiences-'+index+'-end-year')}}} -->
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Roles</label>
                        <div>
                          <small>Please tell us what you did {{ exp.title ? `while you were ${qualifier(exp.title)} ${exp.title}` : '' }} at {{exp.place ? exp.place : 'the Company/ School/ Organization'}}</small>
                        </div>
                        <textarea v-model="exp.roles" :name="'experiences'+index+'roles'" v-validate="'required'" :class="{'form-control' : true, 'is-invalid': errors.has('experiences'+index+'roles')}" cols="30" rows="10"></textarea>
                        <div class="ivalid-feedback" v-if="errors.has('experiences'+index+'roles')">
                          Please tell us what you did {{ exp.title ? `while you were ${qualifier(exp.title)} ${exp.title}` : '' }} at {{exp.place ? exp.place : 'the Company/ School/ Organization'}}
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <button class="btn btn-secondary btn-sm" @click="addBlankExperience">Add {{experiences.length >0 ?"another":""}} work experience</button>
                    </div>
                  </div>
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
          <button :disabled="submitting" class="btn btn-lg btn-success" @click="validateAndSubmit">Submit
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
  name: "credentials",
  components: { Spinner },
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
      educations: [],
      experiences: [],
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
    this.fetchCredentials().then(() => {
      !this.educations.length && this.addBlankEducation();
    });
    // this.$validator.localize("en", this.validationDictionary);
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
    deleteEducation(id) {
      this.educations = this.educations.filter(edu => edu.id != id);

      //TODO: Insert deleteEducation ajax here
    },
    addBlankEducation() {
      this.educations.push({
        id: randomId(),
        school_id: "",
        department_id: "",
        degree_id: "",
        grade_class_id: "",
        grade: "",
        current: false,
        start: {
          month: "",
          year: ""
        },
        end: {
          month: "",
          year: ""
        }
      });
    },
    deleteExperience(id) {
      this.experiences = this.experiences.filter(exp => exp.id != id);
        //TODO: Insert deleteExperience ajax here
    },
    addBlankExperience() {
      this.experiences.push({
        id: randomId(),
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
      });
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
    buildData() {
      const { experiences, educations, teachingExperience } = this;
      return {
        educations: educations.map(edu => {
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
          data.start = {
            month: edu.start.month,
            year: edu.start.year
          };
          data.current = edu.current;
          if (!edu.current) {
            data.end = {
              month: edu.end.month,
              year: edu.end.year
            };
            data.grade = edu.grade;
            data.gradeClass = edu.grade_class_id;
          }
          return data;
        }),
        experiences: experiences.map(exp => {
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
        }),
        teachingExperience
      };
    },
    async validateAndSubmit() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.submitting = true;
        this.$http
          .post(BASE_API + "/v1/tutor/profile/credentials", this.buildData())
          .then(({ data: { message } }) => {
            this.updateProgress();
            swal({
              title: "Success",
              text: `${message} Click next to update your profile photo`,
              icon: "success",
              buttons: ["Cancel", "Next ➜"]
            }).then(value => {
              if (value) {
                this.$router.push({ name: "profile-media" });
              }
            });
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
                "Something Went Wrong. Please try again later",
                "error"
              );
            }
          })
          .then(() => (this.submitting = false));
      } else this.alertFormError();
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
    }
  }
};
</script>

<style scoped>
</style>