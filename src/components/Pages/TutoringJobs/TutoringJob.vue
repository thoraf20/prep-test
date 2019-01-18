<template>
  <div class="hold">
    <div class="">
      <div class="spinner" :style="hideSpinner">
        <spinner />
      </div>
      <div class="row job_section">
        <div class="col-sm-12 col-lg-3 float-left ls" style="width:100%">
          <div class="">
            <span>Know someone who might be interested in this Job?<br> Share the job below</span>
            <br><br>
            <button class="social"><i class="zmdi zmdi-facebook"></i></button>
            <button class="social"><i class="zmdi zmdi-twitter"></i></button>
            <button class="social"><i class="zmdi zmdi-linkedin"></i></button>
          </div>
          <hr>
          <div>
            <span>Eligible for this Role ? <br></span>
            <br>
            <button class="apply">Apply for this role <i class="zmdi zmdi-long-arrow-right"></i></button>
          </div>
        </div>
        <div class="col-sm-12 col-lg-1">
          <div class="vl"></div>
        </div>
        <div class="col-sm-12 col-lg-8 rs">
          <div class="tp">
            <h4>
              {{job.preferred_tutor_gender | toUpper}} 
              <span v-if="job.subjects.length > 1">Home Tutor</span>
              <span v-else-if="job.subjects.length == 1">&nbsp;{{job.subjects[0].name}} Tutor</span>
              <span v-else></span>
              &nbsp;in
              <span v-if="job.location_id !== null">
                <span v-if="job.location !== null">&nbsp;{{job.location.name}}</span>
                <span v-else>&nbsp;No Listed</span>
              </span>
              <span v-else>
                  <span v-if="job.client.state_id !== null">
                    {{job.client.state_id}}
                  </span>
                  <span v-else></span>
              </span>
            </h4>
            <div class="sasasa"></div>
          </div>
          <div class="job-container container">
            <span class="job-container-posted">Posted: {{job.created_at.date | moment}}</span><br>
            <span>Earning: &#8358;{{job.monthly_tutoring_fee | multiply}}</span>
            <div class="float-right">
              <button class="btn btn-default">
                <small class="float-left">Start Date</small><br>
                <span v-if="job.resumption !== null">{{job.resumption | moment }}</span>
                <span v-else>Not Listed</span>
              </button>
              <button class="btn btn-default">
                <small class="float-left">Job Status</small><br>
                <span v-if="checkTime == false">
                  <b style="color:green">Still Open</b>
                </span>
                <span v-else>
                  <b style="color:red">Closed</b>
                </span>
              </button>
            </div>
            <div>
              <br>
              <span id="job-remarks">Client's Remarks</span>
              <br><br>
              <span v-if="job.remark !==  null">{{job.remark}}</span>
              <span v-else>There is no remark for this role yet. </span>
            </div>
            <div>
              <br>
              <span id="job-remarks">Lession Details</span>
              <br>
              <div class="row">
                <div class="col-sm-12 col-lg-6">
                  <div>
                    <span>
                      <br>
                      <b>Student Information</b><br>
                      <div class="student_block" v-for="learner in job.learners">
                        Student Level: {{learner.school_class.name}}<br>
                        Curriculum used: 
                        <span v-if="learner.curricula.length == 0">Not Available</span>
                        <span v-else>
                          <ul>
                            <li v-for="curricula in learner.curricula">{{curricula.name}}</li>
                          </ul>
                        </span>
                        Student's Gender: {{learner.gender}}<br>
                        Subjects Needed:<br>
                        <span v-if="job.subjects.length == 0">Not Available</span>
                        <span v-else>
                          <ul>
                            <li v-for="subject in job.subjects">{{subject.name}}</li>
                          </ul>
                        </span>
                        <hr>
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col-sm-12 col-lg-6">
                  <div>
                    <span>
                      <br>
                      <b>Lesson Information</b><br>
                      Earning: ₦{{job.monthly_tutoring_fee | multiply }} for 1 month<br>
                      <b>*Days and Time</b><br>
                      <span v-if="job.days.length == 0">Not Available<br></span>
                      <ul v-else>
                        <li v-for="(day,index) in job.days">
                          {{day.name}} : <span > {{day.time.start}} to {{day.time.end}}  </span>
                        </li>
                      </ul>
                     <!--  Days: Monday, Wednesday and Friday<br>
                      Time: 4:00 PM<br> -->
                      Venue: Client's Location<br>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Spinner from "@/components/Preloaders/Spinner";

export default {
  name: 'TutoringJobs',
  components: {Spinner},
    data() {
    return {
      job: {},
      jobID: this.$route.params.id,
      hideSpinner: 'display:flex',
      currentTime: moment().format('YYYY-MM-DD h:mm:ss')
      }
    },
    methods: {
      fetchJob(){
        var url = BASE_API + '/v1/tutor/tutoring-job/'+ this.jobID
        this.$http.get(url)
        .then((response) => {
          console.log(response)
          this.hideSpinner = 'display:none'
          this.job = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
      },
      checkTime()
      {
        return moment().format('YYYY-MM-DD h:mm:ss').isSameOrAfter(string)
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      },
      toUpper: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      multiply: function(string) {
        return parseInt(string) * 0.7 == 0 ? 0 : (parseInt(string) * .7)
      }
    },
    mounted() {
      this.fetchJob()
    },
    watch: {
    '$route' (to, from) {
      // react to route changes...
      console.log('halo')
    }
  }
}
</script>

<style type="text/css" scoped>
h4.job-title {
  color: #639440;
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
}

span#job-remarks {
  padding-top: 30px;
  font-size: 18px;
  font-weight: 600;
}
button.apply
{
  width: 100%;
  background: #639440;
  border:1px solid #639440;
  color: white;
  padding:10px;
  cursor: pointer;
  -webkit-box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, .2)
}
button.apply:hover
{
  background:white;
  border:1px solid #639440;
  color: #639440;
  transition: background .5s ease-out;
}
.zmdi-long-arrow-right
{
  padding-left: 10px;
}
.social
{
  background: transparent;
  outline: 0px;
  width: 30px;
  border:1px solid #639440 !important;
  color: #638440;
  margin-right: 2px;
}

.job-container-posted {
  font-size: 18px;
  opacity: .6;
}

.spinner {
  float: center;
  margin: 0 auto;
}

a.job-link,
a.job-link:hover {
  color: #639440;
}

.pagination-link a,
.pagination-link>a:link {
  color: #639440 !important;
}

nav.ml-10 {
  margin-left: 10px !important;
  padding-left: 200px;
}

.job-search {
  height: 30px;
  width: 100%;
  border: 1px solid #639440;
}

.job-search-button {
  height: 35px;
  width: 100%;
}

.job-container {
  padding: 30px 15px;
  border-bottom: 1px solid rgba(112, 112, 112, 0.1);
  margin-bottom: 15px;
}

span.job-sub {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: justify;
  color: #626e7d;
  margin: 5px 0;
  display: block;
  font-size: 14px;
}

.vl {
  border-right: 1px solid rgba(77, 79, 92, 0.4);
  height: 100vh;
  margin-top: -40px;
  opacity: .2;
}

</style>

<style lang="scss" scoped>
.hold {
  margin: 25px;
}

.card {
  margin-top: 10px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(150, 150, 150, 0.14), 0 3px 1px -2px rgba(150, 150, 150, 0.12), 0 1px 5px 0 rgba(150, 150, 150, 0.2);

  .tabs {
    display: flex;
    padding: 0 40px;
    height: 48px;
    width: 100%;
    margin: 0;

    .tab {
      display: inline-block;
      text-align: center;
      line-height: 48px;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid #b2b2b2;
      color: #b2b2b2;
      position: relative;
      overflow: hidden;
      cursor: pointer;

      &.router-link-exact-active {
        &::after {
          background: #639440;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0%;
        }

        color: #333333;
      }
      // &.active { border-bottom: 2px solid #639440; }
    }
  }
}

.job_section {
  .ls {
    .top {
      height: 64px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: flex-start;
      margin-bottom: 35px;
      .flt {
        font-size: 14px;
        font-weight: 600;
        color: rgba(77, 79, 92, 0.5);
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        border-right: 1px solid rgba(112, 112, 112, 0.3);
        svg {margin-right: 5px;}
      }
      .srch {
        width: 70%;
        height: 100%;
        padding: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        input {font-size: 14px; width: 165px; height: 35px;}
      }
      &:hover {.flt {color: #639440;}}
    }
    .bttm {
      width: 100%;
      padding: 25px 0;
      .form-group {
        margin-bottom: 20px;
        label {
          font-size: 13px;
          color: #639440;
          font-weight: 600;
          text-transform: uppercase;
        }
        select {
          border: 1px solid #95989A;
          border-radius: 0 !important;
          height: 42px;
          font-size: 14px;
        }
      }
    }
  }
  .rs {
    .tp {
      width: 100%;
      padding: 15px;
      position: relative;
      font-size: 22px;
      color: #576271;
      font-weight: 600;
      .sasasa {
        position: absolute;
        height: 1px;
        width: 100%;
        box-shadow: 0 3px  6px rgba(0, 0, 0, 0.16);
        background-color: #E0E3DA;
        bottom: 0;
        margin-bottom: 15px;
      }
      h4 {
        font-size: 22px;
        color: #639440;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
  }
}
</style>
