<template>
  <div class="hold">
    <div class="">
      <div class="alert alert-danger" role="alert" v-if="maxExceeded"  ref="tops">
        You have selected 5 subjects. You can't add more.
      </div>
      <div v-if="doneLoading" class="px-0 row">
        <div class="col-md-12 lssa pb-0">
          <div class="col-md-12 pt-3 elevated ase">
            <h5>Selected subjects</h5>
            <table class="table-borderless" ref="table" width="100%">
              <tbody>
                <tr v-for="(subject,index) of Object.entries(ba).filter(a => a.includes(true))">
                  <td>{{ `(${index + 1})` }}</td>
                  <td style="font-weight: bold;font-size: large;">{{ $store.getters.subjectById(parseInt(subject[0].split('_')[0], 10)).name }}</td>
                  <td>{{ $store.getters.classgroupById(parseInt(subject[0].split('_')[1], 10)).name }}</td>
                  <td><button class="btn btn-danger sbtn" @click="removeSubject(subject)" :disabled="removing">Remove <i class="fa fa-spin fa-circle-o-notch" v-show="removing"></i></button></td>
                </tr>
              </tbody>
            </table>
            <p><br><span v-show="Object.entries(ba).filter(a => a.includes(true)).length === 0">You have no entries saved</span></p>
          </div>
          <div class="row aro">
            <p></p>
            <div class="actions">
              <button :disabled="maxExceeded" class="btn btn-info submit-button" @click="addSubject">Add</button>
              <button class="btn btn-success submit-button" @click="$router.push({name: 'test-status'})">Move to next step</button>
            </div>
          </div>
        </div>
        <br>
        <div class="col-md-12 p-0" v-if="showSubject">
          <h5 style="font-weight: 600;">Choose your subjects</h5>
          <p>You cannot select more than 5 subjects</p>
          <div class="my-3">
            <div class="card-body bg-light text-dark">
              <i class="fa fa-warning"></i> Please <strong class="text-uppercase">select only subjects that you can confidently teach</strong> as you will be assessed on the subjects you select <i class="fa fa-warning"></i>
            </div>
          </div>
          <form ref="abilityForm">
            <div class="form-group">
              <label>Select subject class</label>
              <select  v-validate="'required'" v-model="activeCGC" :class="{'form-control': true}" :disabled="changed">
                <option>Select One</option>
                <option v-for="cgc of knowledgeGraph" :value="cgc.id" :key="cgc.id">{{cgc.name}}</option>
              </select>
            </div>
            <div class="row panel-holder fw" v-if="activeCGC !== ''">
              <panel :collapsible="false" :name="acgc.name" :visible="true" class="panels npb">
                <span class="sp" style="margin: 0; font-size: 12px; color: #71737d;">Choose from the list below</span>
                <div class="form-group">
                  <label>Select a class group</label>
                  <select  v-validate="'required'" v-model="activeCG" :class="{'form-control': true}" :disabled="changed">
                    <option>Select One</option>
                    <option v-for="cgc of acgc.class_groups" :value="cgc.id" :key="cgc.id">{{cgc.name}}</option>
                  </select>
                  <p v-show="changed">You have made changes to your subjects. Please <a href="#" @click.prevent="submit2">save</a> or <a href="#" @click.prevent="discard">discard</a>.</p>
                </div>
                <panel  v-if="activeCG !== ''" :ref="cg.name" :visible='true' :name='cg.name' :icon="true" class="panelsb">
                  <input type="hidden" :name="'cg['+cg.id+'][subjects]'">
                  <input type="hidden" :name="'cg['+cg.id+'][exams]'">
                  <input type="hidden" :name="'cg['+cg.id+'][schoolClasses]'">
                  <div class="row" v-if="cg.subjects && cg.subjects.length">
                    <div class="col-12">
                      <h6>Subjects</h6>
                    </div>
                    <div class="col-12 pl-4">
                      <div class="row">
                        <div class="col-md-4 col-4 mb-2" :key="subject.id" v-for="subject in cg.subjects">
                          <label class="fine-check">
                            <input type="checkbox" :key="subject.id" :name="'cg['+cg.id+'][subjects][]'" v-model="ab[`${subject.id}_${cg.id}`]"  :value="subject.id" :checked="hasSubject(cg,subject.name)" :disabled="hasTest(subject.id, cg.id) || (maxExceeded && notInAb(`${subject.id}_${cg.id}`))">
                            <span>{{subject.name}}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br>
                  <div class="row" v-if="cg.exams && cg.exams.length">
                    <div class="col-12">
                      <h6 class="mb-1">Exams you can prepare students for</h6>
                      <p class="small mb-1">Please note that you will be tested on subjects you select</p>
                    </div>
                    <div class="col-12 pl-4">
                      <div class="row">
                        <div class="col-md-4 col-6" :key="exam.id" v-for="exam in cg.exams">
                          <label class="fine-check">
                            <input type="checkbox" :name="'cg['+cg.id+'][exams][]'" :value="exam.id" :checked="hasExam(cg,exam.name)" :disabled="hasSubject(cg,exam.name)">
                            <span>{{exam.name}}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br>
                  <div class="row" v-if="cg.classes && cg.classes.length">
                    <div class="col-12">
                      <h6>Classes you can teach</h6>
                    </div>
                    <div class="col-12 pl-4">
                      <div class="row">
                        <div class="col-md-4 col-6" :key="schoolClass.id" v-for="schoolClass in cg.classes">
                          <label class="fine-check">
                            <input type="checkbox" :name="'cg['+cg.id+'][schoolClasses][]'" :value="schoolClass.id" :checked="hasSchoolClasses(cg,schoolClass.name)" :disabled="hasSchoolClasses(cg,schoolClass.name)">
                            <span>{{schoolClass.name}}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </panel>
              </panel>
            </div>
            <div class="row">
              <div class="col text-right">
                <button class="btn btn-success btn-lg submit-button" @click.prevent="submit2" :disabled="submitting">Save & Continue
                  <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card-body" v-else>
        <div class="row">
          <div class="col text-center">
            <spinner></spinner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Panel from '@/components/Layout/Panel';
import swal from 'sweetalert';
import Spinner from '@/components/Preloaders/Spinner';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'subjects-ability',
  components: { Panel, Spinner },
  props: ['isdash'],
  data() {
    return {
      submitting: false,
      removing: false,
      currentAbilities: [],
      fetchingAbilities: false,
      fetchedAbilities: false,
      ab: {},
      ba: {},
      t: [],
      showSubject: false,
      activeCGC: '',
      activeCG: '',
    };
  },
  methods: {
    ...mapMutations('profile', {
      updateProgress: 'UPDATE_SUBJECTS',
    }),
    addSubject() {
      this.showSubject = true;
      this.$nextTick(() => this.$refs.abilityForm.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' }));
    },
    hasSubject: function(cg, name) {
      return !!this.abilities[cg.name].subjects.filter(function(s) {
        return s.name == name;
      }).length;
    },
    discard() {
      this.ab = {...this.ba};
    },
    hasTest(id, cgid) {
      return this.$store.getters.test_has_subject(parseInt(id, 10), parseInt(cgid, 10));
    },
    hasExam: function(cg, name) {
      return !!this.abilities[cg.name].exams.filter(function(s) {
        return s.name == name;
      }).length;
    },
    hasSchoolClasses: function(cg, name) {
      return !!this.abilities[cg.name].school_classes.filter(function(s) {
        return s.name == name;
      }).length;
    },
    submit: function() {
      var that = this;
      this.submitting = true;
      this.$http
        .post(
          BASE_API + '/v1/tutor/profile/abilities',
          new FormData(this.$refs.abilityForm)
        )
        .then(({ data: { data, message } }) => {
          this.currentAbilities = data;
          this.updateProgress();
          if (this.isdash) {
            return swal({
                title: "Success",
                text: `Successfully updated`,
                icon: "success",
                buttons: ["Cancel", "Done ✓"]
              })
          }
          if (data) {
            swal({
              title: 'Success',
              text: message,
              icon: 'success',
              buttons: ['Cancel', 'Next ➜']
            }).then(value => {
              value && this.$router.push({ name: 'test-status' });
            });
          } else
            swal(
              '',
              'Your Class and Subject Preferences have been Saved',
              'success'
            );
        })
        .catch(console.error)
        .then(function() {
          that.submitting = false;
        });
    },
    notInAb(key) {
      if (typeof this.ab[key] === 'undefined' || this.ab[key] == '') {
        return true;
      }
      return false;
    },
    submit2() {
      this.submitting = true;
      this.$http
        .post(
          BASE_API + '/v1/tutor/profile/abilities',
          {ab: this.ab, cg: this.cg.id})
        .then(({ data }) => {
          this.submitting = false;
          this.$nextTick(() => this.$refs.table.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }));
          this.activeCG = '';
          this.activeCGC = '';
          this.showSubject = false;
          this.ba = {...this.ab};
        })
    },
    ...mapActions('profile', ['getKnowledgeGraph']),
    getCurrentAbilities() {
      this.fetchingAbilities = true;
      this.$http
        .get(BASE_API + '/v1/tutor/profile/abilities')
        .then(({ data: { data } }) => {
          this.fetchedAbilities = true;
          this.currentAbilities = data;
          this.$nextTick(() => {
            Object.keys(this.abilities).forEach(ability => {
              if (
                Object.keys(this.abilities[ability]).some(
                  item => !!this.abilities[ability][item].length
                )
              ) {
                // console.log((this.$refs[ability][0].isVisible = true));
              }
            });
          });
        })
        .then(() => {
          this.fetchingAbilities = false;
        });
    },
    removeSubject(s) {
      if ( !this.hasTest( s[0].split('_')[0], s[0].split('_')[1] ) ) {
        this.ab[s[0]] = false;
        this.removing = true;
        this.$http
          .post(
            BASE_API + '/v1/tutor/profile/abilities',
            {ab: this.ab, cg: s[0].split('_')[1]})
          .then(({ data }) => {
            this.removing = false;
            this.$nextTick(() => this.$refs.table.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }));
            this.activeCG = '';
            this.activeCGC = '';
            this.ba = {...this.ab};
          })
      } else {
        swal('You have already taken a test for this subject. You cannot desselect this subject after taking the test.');
      }
    },
    getAbilitySubs() {
      return new Promise((resolve, reject) => {
        axios.get(`${BASE_API}/v1/tutor/tests`)
          .then(({data: { data }}) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },
  computed: {
    progress() {
      const concerns = [this.hasFetchedKnowledgeGraph, this.fetchedAbilities];
      const sum = concerns.reduce((a, i) => (i ? 1 + a : a), 0);
      return sum / concerns.length * 100;
    },
    changed() {
      return Object.entries(this.ab).filter(a => a.includes(true)).toString() !== Object.entries(this.ba).filter(a => a.includes(true)).toString();
    },
    acgc() {
      if (this.activeCGC !== '') {
        this.activeCG = '';
        return this.knowledgeGraph.find(kg => kg.id === this.activeCGC);
      }
      return null;
    },
    cg() {
      if (this.activeCG !== '') {
        return this.acgc.class_groups.find(cg => cg.id === this.activeCG);
      }
      return null;
    },
    tests() {
      return this.$store.getters.tests;
    },
    doneLoading() {
      return this.progress == 100;
    },
    ...mapState('profile', ['knowledgeGraph']),
    ...mapGetters('profile', [
      'isFetchingKnowledgeGraph',
      'hasFetchedKnowledgeGraph'
    ]),
    abilities: function() {
      var abilities = {},
        acg = [],
        that = this;

      this.knowledgeGraph.forEach(function(cgc) {
        cgc.class_groups.forEach(function(cg) {
          acg.push(cg.name);
        });
      });

      acg
        .filter(function(value, index, me) {
          return me.indexOf(value) === index;
        })
        .forEach(function(cg) {
          var it = (abilities[cg] = {});
          var tcg = that.currentAbilities.filter(function(ca) {
            return ca.class_group ? ca.class_group.name == cg : false;
          });
          if (tcg.length) {
            it.exams = tcg[0].exams;
            it.subjects = tcg[0].subjects;
            it.school_classes = tcg[0].classes;
          } else {
            it.exams = [];
            it.subjects = [];
            it.school_classes = [];
          }
        });
      return abilities;
    },
    maxExceeded() {
      const mxd = Object.entries(this.ab).filter(a => a.includes(true)).length >= 5;
      if (mxd) {
        this.$nextTick(() => this.$refs.tops.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }));
      }
      return mxd;
    },
  },
  mounted() {
    this.$store.dispatch('getClassGroups');
    !this.hasFetchedKnowledgeGraph &&
      !this.isFetchingKnowoledgeGraph &&
      !this.getKnowledgeGraph();
    this.getCurrentAbilities();
    this.$store.dispatch('getAllTests');
    this.$store.dispatch('getSubjects');
    this.getAbilitySubs()
      .then((d) => {
        const snames = {};
        const mox = {};
        if (d) {
          for (let i = d.length - 1; i >= 0; i--) {
            const test = d[i];
            snames[`${test.subject.id}_${test.ability.class_group_id}`] = true;
          }
        }
        this.ab = { ...snames, ...this.ab }
        this.ba = { ...snames, ...this.ba }
      });
  },
};
</script>

<style lang="scss" scoped>
.hold {
  margin: 25px;
}
.submit-button {
  width: 130px;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
  vertical-align: middle;
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.table-borderless {
  td {padding: 10px;}
}
.panel-holder {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;

  .panels {
    border: none;
    border-radius: 3px;
    box-shadow: 0 2px 2px 0 rgba(180, 180, 180, 0.14), 0 3px 1px -2px rgba(180, 180, 180, 0.12), 0 1px 5px 0 rgba(180, 180, 180, 0.2);
    box-sizing: border-box;
    width: 100%;
    margin-top: 40px;
    .panel-heading {
      .panel-title {
        font-size: 14px; margin: 5px 0; font-weight: bold;
      }
    }
    .panel-body {
      padding: 10px 15px !important;
      border-top: 0;
    }
    .panelsb {
      border: none;
      margin: 15px 0;
      padding: 15px !important;
      .panel-heading {
        padding: 15px 0;
        
      }
      .panel-body {
        small {margin: 0; font-size: 11px; color: #71737d;}
        .fine-check {
          font-size: 0.8em;
        }
      }
      &:not(:last-child) {
        border-bottom: 1px solid #dddddd;
      }
    }
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
.fw {flex-wrap: wrap;}
.lssa {
  padding: 25px 0;
  h5 {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
  }
  .sublist {
    // margin: 30px 0;
    // border-top: 1px solid rgba(0, 0, 0, .25);
    // border-bottom: 1px solid rgba(0, 0, 0, .25);
    // padding: 15px 0;
    margin-bottom: 30px;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      li {
        padding: 10px 15px;
        border-radius: 4px;
        margin-right: 15px;
        background-color: rgba(110, 132, 94, .4);
        font-size: 13px;
        i {
          content: 'x';
          display: block;
          color: rgb(110, 132, 94);
          float: right;
          cursor: pointer;
          margin-left: 15px;
        }
        span {
          margin: 0 15px;
        }
      }
    }
  }
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

<style lang="scss">
  .npb {
    .panel-body {padding: 15px !important;}
  }
</style>