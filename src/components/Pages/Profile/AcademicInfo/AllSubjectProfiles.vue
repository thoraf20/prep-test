<template>
  <div>
    <div class="card row" v-if="doneLoading">
      <div class="col-md-12">
        <div class="row" v-if="ability_subjects.length === 0">
          <p style="text-align: center; font-weight: 600;">You havent passed any test so you cant edit your profile</p>
        </div>
        <div class="row ho" v-else>
          <div class="col-md-12 pt-3 elevated ase">
            <h5>Choose a subject to edit</h5>
            <table class="table-borderless" width="100%">
              <tbody>
                <tr v-for="abilitySubject of ability_subjects" :key="abilitySubject.id">
                  <td style="font-weight: bold;font-size: large;">{{ abilitySubject.subject.name }}</td>
                  <td><router-link :to="{ name: 'subject-profiles-edit', params: { ability_subject_id: abilitySubject.id } }" class="btn btn-info sbtn">Edit</router-link ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row aro">
            <p><span v-show="ability_subjects.length === 0">You have not passed any test</span></p>
            <div class="actions">
              <button class="btn btn-success pull-right submit-button mx" @click="nextStage">Move to next stage</button>
            </div>
          </div>
          <div class="col-md-12 pt-1 elevated ase mt-4 pt-3">
            <router-view></router-view>
          </div>
        </div>
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
</template>

<script>
import Spinner from '@/components/Preloaders/Spinner';

export default {
  name: 'all-subject-profiles',
  components: { Spinner },
  data() {
    return {
      apiUrl: `${BASE_API}/v1/tutor/`,
      profiles: [],
      ability_profiles: [],
      ability_subjects: [],
      doneLoading: false,
    };
  },
  mounted() {
    this.fetchAbilitySubjects();
    this.fetchProfiles();
  },
  computed: {
    u() {
      return this.$auth.user();
    },
  },
  methods: {
    fetchProfiles() {
      const tutorId = this.$auth.user().id;
      const url = `${this.apiUrl}subject-profile/${tutorId}/profiles`;
      this.doneLoading = false;

      this.$http.get(url)
        .then((response) => {
          this.profiles = response.data;
          this.doneLoading = true;
        })
        .catch(error => console.error(error));

      this.doneLoading = false;

      this.$http.get(`${this.apiUrl}ability-subjects/profiles`)
        .then((response) => {
          this.$store.commit('SET_SUBJECT_PROFILES', response.data.data);
          this.doneLoading = true;
        })
        .catch(error => console.error(error));
    },
    fetchAbilitySubjects() {
      this.doneLoading = false;

      this.$http.get(`${this.apiUrl}ability-subjects`)
        .then((response) => {
          this.ability_subjects = response.data.data;
          this.doneLoading = true;
          if (typeof this.$route.params.ability_subject_id === 'undefined' && this.ability_subjects.length) {
            this.$router.push({
              name: 'subject-profiles-edit',
              params: { ability_subject_id: this.ability_subjects[0].id },
            });
          }
        })
        .catch(error => console.error(error));
    },
    nextStage() {
      axios.post(`${BASE_API}/v1/tutor/steps`, { step: 'academic_info' })
        .then(() => this.$store.dispatch('getUserTutor'))
        .then(() => {
          this.$router.push({ name: 'how-it-works-setup' });
        })
        .catch(err => console.error(err));
    },
  },
  filters: {
    truncate(text, length, suffix) {
      return text.substring(0, length) + suffix;
    },
  },
};
</script>

<style lang="scss" scoped>
  .hide {display: none;}
  .ho {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 !important;
    padding: 0 40px;

    .le {
      height: 493px;
      border: 1px solid #f3f3f4;
      border-left: none;
      border-top: none;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-top: 40px;

      h5 {
        font-size: 18px;
        font-weight: bold;
      }
      a {
        margin: 15px;
        cursor: pointer;
        font-weight: 600;
        color: #333333;

        &.active { color: #639440 !important; }
      }
    }
    .ri {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
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
