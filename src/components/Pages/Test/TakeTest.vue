<template>
  <div class="hold">
    <div class="row">
      <div v-if="doneLoading">
        <h5 style="color: green;">{{ subject && subject.name }} Test</h5>
        <br>
        <h6>Test Instructions:</h6>
        <p>You have <b>{{ testDuration }}</b> to complete the test, during which you won't be allowed to pause or leave the test screen. Choose your answers to the questions and click <b>'Next'</b> to see the next set of questions. You can skip questions if you would like to come back to them later with the yellow <b>'Go to First Skipped Question'</b> button. When you have completed the practice exam, you can click on the submit button at the bottom of the test screen. Your results would be updated automatically. <br> <b>Good Luck!</b></p>
        <button class="btn btn-success submit-button" @click="startTest">Start Test</button>
      </div>
      <div v-else class="row justify-content-center">
        <div class="col text-center">
          <spinner />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';
import Spinner from "@/components/Preloaders/Spinner";

const API = `${BASE_API}/v1`;

export default {
  props: ['abilitySubject'],
  components: {
    Spinner,
  },
  data() {
    return {
      doneLoading: false,
    };
  },
  beforeCreate() {
    if (this.$store.getters.subjects && this.$store.getters.subjects.length === 0) {
      this.$store.dispatch('getSubjects');
    }
  },
  mounted() {
    if (typeof this.abilitySubject !== 'undefined') {
      this.$store.dispatch('getSubjectTest', { abilitySubject: this.abilitySubject })
        .then(response => this.doneLoading = true)
        .catch((error) => {
          if (error.data && error.data.status) {
            return (
              swal(error.data.status, error.data.message, 'error')
                .then(value => value && this.$router.push({ name: 'test-status' }))
            );
          }
          return (
            swal('error', 'something went wrong', 'error')
              .then(value => value && this.$router.push({ name: 'test-status' }))
          );
        });
    }
  },
  computed: {
    subject() {
      return this.test.ability_subject && this.test.ability_subject.subject;
    },
    test() {
      return this.$store.getters.active_test;
    },
    testDuration() {
      return moment.duration(this.test.duration, 'seconds').humanize();
    },
  },
  methods: {
    startTest() {
      axios.get(`${API}/tutor/tests/${this.abilitySubject}/${this.test.id}/start`)
        .then((response) => {
          this.$store.dispatch('startCountdown', response.data.time_left);
          this.$store.commit('SET_TEST_SUBJECT', this.abilitySubject);
          this.$router.push({ name: 'test', params: { test: this.test.id } });
        })
        .catch(error => swal(error.response && error.response.message));
    },
  },
};
</script>

<style lang="scss" scoped>
  .hold {margin: 25px;}
  .card {
    padding: 40px;
    margin-top: 10px;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);
  }
  h6 {font-size: 18px; font-weight: bold;}
  p {width: 100%; max-width: 550px;}
  button {
    height: 40px;
    width: 140px;
    line-height: 40px;
    padding: 0 10px;
    text-transform: uppercase;
    background-color: #639440;
    color: #fff;
    font-weight: 300;
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
  &.btn-default {
    box-shadow: 0 2px 2px 0 rgba(112, 112, 112, 0.14), 0 3px 1px -2px rgba(112, 112, 112, 0.12), 0 1px 5px 0 rgba(112, 112, 112, 0.2);
  }
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
  .row { margin: 0; margin-bottom: 20px; }
</style>