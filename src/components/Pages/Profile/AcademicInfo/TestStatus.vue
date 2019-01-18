<template>
  <div class="col-sm-12 holder">
    <div class="control">
      <div class="row se">
        <div class="col-sm-12 col-md-4 col-md-push-8">
          <input type="search" class="search" id="search" placeholder="Search through subjects"  v-model="query">
        </div>
      </div>
      <div class="row se">
        <div class="form-inline">
          <select v-model="status" class="col-md-5 select">
            <option value="all" selected>All</option>
            <option value="PENDING">Pending</option>
            <option value="STARTED">Started</option>
            <option value="PASSED">Passed</option>
            <option value="FAILED">Failed</option>
          </select>
          <div class="input-group input-daterange col-md-7">
            <div class="col-sm-6">
              <datepicker v-model="from" placeholder="From" id="exampleInputEmail3" input-class="date-picker" :clear-button="true"></datepicker>
            </div>
            <div class="col-sm-6">
              <datepicker v-model="to" placeholder="To" id="exampleInputEmail4" input-class="date" :clear-button="true"></datepicker>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="doneLoading">
      <h2>Test History</h2>
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <td>S/N</td>
            <td>Subject</td>
            <td>Score</td>
            <td>Status</td>
            <td>Next Action</td>
            <td>Date written</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(test, index) in filtered">
            <td>{{ index + 1 }}</td>
            <td>
              {{ test.subject && test.subject.name}}
              <br>
              <span class="sub">({{ test.ability.class_group && test.ability.class_group.name }})</span>
            </td>
            <td><span :class="testbuttontype(test)">{{ test.test ? `${calculateScore(test)}%` : '-' }}</span></td>
            <td><span :class="testbuttontype(test)">{{ teststatustext(test) }}</span></td>
            <td><button class="btn" :class="testbuttontype(test)" @click="testbuttonaction(test)">{{ testbuttontext(test) }}</button></td>
            <td>{{ test.test && test.test.taken_at && test.test.taken_at.human ? test.test.taken_at.human : 'Nil' }}</td>
          </tr>
        </tbody>
      </table>
      <a href="#!" class="sm">Show More</a>
    </div>

    <div v-else class="row justify-content-center">
      <div class="col text-center">
        <spinner />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import swal from 'sweetalert';
import Datepicker from 'vuejs-datepicker';
import Spinner from '@/components/Preloaders/Spinner';

export default {
  components: {
    Datepicker, Spinner,
  },
  data() {
    return {
      doneLoading: false,
      query: '',
      status: 'all',
      from: null,
      to: null,
    };
  },
  mounted() {
    this.doneLoading = false;
    this.$store.dispatch('getAllTests').then(() => {
      this.doneLoading = true;
      if (this.$route.query.test) {
        const dtest = this.tests.find(t => t.test.id === parseInt(this.$route.query.test, 10));
        switch (dtest && dtest.test && dtest.test.status) {
          case 'PASSED':
            return swal({
              title: 'Passed!',
              text: 'You passed your test. What do you want to do next?',
              icon: 'success',
              buttons: ['Another Test', 'Edit Subject Profile ➜']
            }).then((value) => {
              if (value) {
                this.$router.push({ name: 'subject-profiles-edit', params: { ability_subject_id: parseInt(this.$route.query.test, 10) } });
              }
            });

          case 'FAILED':
            return swal({
              title: 'Failed!',
              text: 'You failed your test. You have to wait 3 months to retake it.',
              icon: 'error',
              buttons: ['Done', 'Take another test 🤞🏽']
            }).then((value) => {
              if (value) {
                this.$router.push({ name: 'test-status' });
              }
            });

          default:
            return swal('Done');
        }
      }
    });
  },
  computed: {
    tests() {
      return this.$store.getters.tests;
    },
    filtered() {
      return this.tests.filter((test) => {
        // filter for the search params
        if (test.subject && !test.subject.name.toLowerCase().match(this.query.toLowerCase())) {
          return false;
        }

        // date filter
        const dt = test.test && test.test.taken_at && test.test.taken_at.carbon && moment(test.test.taken_at.carbon.date);
        // datefrom
        if (this.from !== null && !moment(dt).isAfter(moment(this.from))) {
          return false;
        }
        // dateto
        if (this.to !== null && !moment(dt).isBefore(moment(this.to))) {
          return false;
        }

        // filter for the status
        if (this.status === 'all') {
          return true;
        }

        // if there's no test and we're looking for pending
        if (this.status === 'PENDING' && !test.test) {
          return true;
        }

        return test.test && this.status === test.test.status;
      });
    },
  },
  methods: {
    teststatustext(test) {
      switch (test.test && test.test.status) {
        case 'PENDING':
          return 'Not Written Test';

        case 'STARTED':
          return 'Test Satarted';

        case 'PASSED':
          return 'Passed';

        case 'FAILED':
          return 'Failed';

        default:
          return 'Not Written Test';
      }
    },
    testbuttontext(test) {
      switch (test.test && test.test.status) {
        case 'PENDING':
          return 'Write Test';

        case 'STARTED':
          return 'Go to Test';

        case 'PASSED':
          return 'Edit Profile';

        case 'FAILED':
          return 'Retake Test';

        default:
          return 'Write Test';
      }
    },
    testbuttontype(test) {
      switch (test.test && test.test.status) {
        case 'PENDING':
          return 'default';

        case 'STARTED':
          return 'info';

        case 'PASSED':
          return 'pass';

        case 'FAILED':
          return 'fail';

        default:
          return 'default';
      }
    },
    testbuttonaction(test) {
      switch (test.test && test.test.status) {
        case 'PENDING':
          return this.$router.push({ name: 'test-take', params: { abilitySubject: test.id } });

        case 'STARTED':
          return this.$router.push({ name: 'test-take', params: { abilitySubject: test.id } });

        case 'PASSED':
          return this.$router.push({ name: 'subject-profiles-edit', params: { ability_subject_id: test.id } });

        case 'FAILED':
          return this.retakeTest(test);

        default:
          return this.$router.push({ name: 'test-take', params: { abilitySubject: test.id } });
      }
    },
    calculateScore(test) {
      return Math.round(parseInt(test.test.score, 10) / parseInt(test.test.no_of_questions, 10) * 100);
    },
    retakeTest(test) {
      const datetaken = moment(test.test.taken_at.carbon.date);
      const retakedate = datetaken.add(3, 'M');
      console.log(test.id);
      if (moment().isAfter(retakedate)) {
        this.$router.push({ name: 'test-take', params: { abilitySubject: test.id } });
      } else {
        swal(
          'You can\'t retake this test',
          `You have to wait for ${moment.duration(retakedate.diff(moment())).humanize()}`,
          'error'
        );
      }
    },
  },
};
</script>

<style lang="scss">
  .holder {
    padding: 20px 40px;
    .control {
      .se {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin: 20px;
      }
      .search {
        height: 50px;
        width: 100%;
        border-radius: 25px;
        background-color: #edf3e9;
        border: none;
        outline: none;
        padding: 10px 25px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: #535561;
        &::placeholder { color: #a3a6b4; }
      }
      .select {
        height: 35px;
        width: 100%;
        border-radius: 18px;
        outline: none;
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14), 0 3px 1px -2px rgba(200, 200, 200, 0.12), 0 1px 5px 0 rgba(200, 200, 200, 0.2);
        color: #535561;
        transition: all .3s ease;
        font-size: 13px;
        &:active, &:hover { 
          box-shadow: 0 8px 17px 2px rgba(200, 200, 200,0.14), 0 3px 14px 2px rgba(200, 200, 200,0.12), 0 5px 5px -3px rgba(200, 200, 200,0.2);
        }
      }
    }
    .card {
      padding: 15px;
      margin-top: 10px;
      border-radius: 2px;
      box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);

      h2 { font-size: 1.6rem; margin: 10px 0; }
      table.table {
        margin: 20px 0;
        thead {
          background-color: #edf3e9;
          tr td {
            border: none;
            text-transform: uppercase;
            color: #a3a6b4;
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            padding: 15px 0;
          }
        }
        tbody {
          tr td {
            border: none;
            border-bottom: 1px solid rgba(200, 200, 200, .4);
            color: #535561;
            font-size: 13px;
            text-align: center;
            padding: 30px 0;
            vertical-align: middle;
            span.sub {font-size: 11px; color: #a3a6b4;}
            span.pass { color: #3e6f40; }
            span.fail { color: #ff798b; }
            span.default { color: #878787; }
            span:not(.sub) { font-weight: bold; }
            button {
              height: 30px;
              width: 100%;
              max-width: 130px;
              border-radius: 15px;
              line-height: 30px;
              padding: 0;
              font-size: 12px;
              font-weight: bold;
              &.pass { background-color: #e0f9ec; color: #707c76; }
              &.fail { background-color: #ffe2e6; color: #8a7b7d; }
              &.default { background-color: #cfdec4; color: #6c7466; }
            }
          }
        }
      }
      a.sm {
        margin-right: auto;
        margin-left: auto;
        color: #91b478;
        &:hover {text-decoration: underline;}
      }
    }
  }
  #exampleInputEmail3, #exampleInputEmail4 {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-radius: 18px;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 11px;
    box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14), 0 3px 1px -2px rgba(200, 200, 200, 0.12), 0 1px 5px 0 rgba(200, 200, 200, 0.2);
    text-align: center;
    transition: all .3s ease;
    &:active, &:hover { 
      box-shadow: 0 8px 17px 2px rgba(200, 200, 200,0.14), 0 3px 14px 2px rgba(200, 200, 200,0.12), 0 5px 5px -3px rgba(200, 200, 200,0.2);
    }
  }
  .vdp-datepicker__clear-button { position: absolute; top: 0; right: 0; }
  .control {margin-bottom: 25px;}
  table thead td { font-weight: bold; }
  table tbody td button { width: 100%; }
  .hide {display: none !important;}
</style>