<template>
  <div class="hold">
    <div class="">
      <div class="spinner" :style="hideSpinner">
        <spinner />
      </div>
      <div class="row job_section" :style="hideJobSection">
        <div class="col-sm-12 col-lg-3 float-left ls" style="width:100%">
          <div class="top row">
            <div class="srch">
              <input type="search" placeholder="Search Jobs" class="form-control">
            </div>
          </div>
          <div class="bttm">
            <div class="form-group">
              <label>Choose Subject</label>
              <select class="form-control job-search" v-model="subject">
                <option :value="subject.id" v-for="(subject,index) in subjects">{{subject.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Select Location</label>
              <select class="form-control job-search" v-model="location">
                <option :value="location.id"  v-for="(location,index) in locations">{{location.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <button class="btn submit-button btn-success" @click="searchJobs">Filter</button>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-1">
          <div class="vl"></div>
        </div>
        <div class="col-sm-12 col-lg-8 rs">
          <div class="tp">
            <p>Jobs <span>{{ jobs.length }}</span></p>
            <div class="sasasa"></div>
          </div>
          <h5 class="container" v-if="isEmpty">Sorry<br>There are no results for your search</h5>
          <div v-else class="job-container container" v-for="(job, index) in jobs">
            <router-link tag="h4" :to="{name: 'tutoring-job', params: {id: job.id} }" class="job-title">
              {{job.preferred_tutor_gender | toUpper}} 
              <span v-if="job.subjects.length > 1">Home Tutor</span>
              <span v-else-if="job.subjects.length == 1">{{job.subjects[0].name}} Tutor</span>
              <span v-else></span>
              in
              <span v-if="job.location_id !== null">
                <span v-if="job.location !== null">{{job.location.name}}</span>
                <span v-else>No Listed</span>
              </span>
              <span v-else>
                  <span v-if="job.client.state_id !== null">
                    {{job.client.state_id}}
                  </span>
                  <span v-else></span>
              </span>
            </router-link>
            <span class="job-sub">
            <span v-if="job.remark !== null">
              {{job.remark}}
            </span>
            <span v-else>No remarks added for this role yet</span>...<router-link :to="{name: 'tutoring-job',params: {id: job.id}}" class="job-link">View Job</router-link>
            </span>
            <span>
            <b style="color:#639440; font-size: 12px">Posted:</b> <span style="opacity:.5; font-size: 12px;">{{ job.created_at.date | moment }}</span>
            </span>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation ml-10" style="margin-left:20px">
        <ul class="pagination">
          <li class="page-item pagination-link">
            <div v-if="currentPage == 1">
            </div>
            <a  @click="fetchPreviousData" v-else class="page-link" href="#"><i class="zmdi zmdi-long-arrow-left" style="margin-right:5px"></i> <small>Previous</small></a>
          </li>
          <li class="page-item pagination-link" v-for="index in lastPage" :key="index">
            <router-link class="page-link" :to="{name: 'tutoring-jobs', query:{page: index}}">{{index}}</router-link>
            <!-- <a @click="fetchWithNumber(index)"  :href="'?page='+index">{{index}}</a> -->
          </li>
          <div v-if="currentPage == jobsPages">
          </div>
          <li v-else class="page-item pagination-link"><a @click="fetchNextData" class="page-link" href="#"><small>Next</small><i style="margin-left:5px" class="zmdi zmdi-long-arrow-right"></i></a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Spinner from "@/components/Preloaders/Spinner";

export default {
  name: 'TutoringJobs',
  components: { Spinner },
  data() {
    return {
      jobs: [],
      url: `${BASE_API}/v1/tutor/tutoring-jobs`,
      jobsPages: '',
      currentPage: '',
      nextPage: '',
      lastPage: undefined,
      hideSpinner: 'display:true',
      hideJobSection: 'display:flex',
      prevPage: '',
      locations: [],
      subject: '',
      location: '',
      subjects: [],
      isEmpty: false,
    };
  },
  methods: {
    fetchJobs(page) {
      let { url } = this;

      url += '?';
      // if there's a value for the page set url to be page
      if (page.page !== undefined) {
        url += `page=${page.page}&`;
      }

      const search = page.subject || '';
      const location = page.location || '';

      url += `subjects=${search}&locations=${location}`;

      this.hideSpinner = 'display:inline-block';
      this.hideJobSection = 'display:none';

      this.$http.get(url)
        .then(response => this.buildData(response))
        .catch(error => console.error(error));
    },
    fetchNextData() {
      var url = this.nextPage
      this.hideSpinner = 'display:inline-block'
      this.hideJobSection = 'display:none'
      this.$http.get(url)
      .then((response) => {
        this.buildData(response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    searchJobs(){
      var subject = this.subject
      var location = this.location
      this.$router.push({name: 'tutoring-jobs',query: {subject:subject,location:location}})
      //then run search
      this.fetchJobs(this.$route.query)
    },
    fetchLocations(){
      var url = BASE_API + '/v1/global/locations'
      this.$http.get(url)
      .then((response) => {
        this.locations = response.data.data
      })
    },
    fetchSubjects(){
      var url = BASE_API + '/v1/global/subjects'
      this.$http.get(url)
      .then((response) => {
        this.subjects = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    buildData(response){
        this.jobs = response.data.data;
        this.jobsPages = response.data.meta.last_page
        this.currentPage = response.data.meta.current_page
        this.nextPage = response.data.links.next
        this.lastPage = response.data.meta.last_page
        this.hideSpinner = 'display:none',
        this.hideJobSection = 'display:flex'
        this.prevPage = response.data.links.prev
        if(response.data.data.length == 0)
        {
          this.isEmpty = true;
        }
    },
    fetchPreviousData() {
      var url = this.prevPage
      this.hideSpinner = 'display:inline-block'
      this.hideJobSection = 'display:none'
      this.$http.get(url)
      .then((response) => {
        this.buildData(response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    fetchWithNumber(index) {
      var url = BASE_API + '/v1/tutor/tutoring-jobs?page=' + index
      this.hideSpinner = 'display:inline-block'
      this.hideJobSection = 'display:none'
      this.$http.get(url)
      .then((response) => {
        this.buildData(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).fromNow()
    },
    toUpper: function(string) {
      return string && string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.fetchJobs(this.$route.query)
    this.fetchSubjects()
    // this.runSearch(this.$route.query)
    this.fetchLocations()
  },
  beforeRouteUpdate(to,from, next){
    this.fetchJobs(to.query)
    next()
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

.job-search,select {
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
.submit-button {
  width: 100%;
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  vertical-align: middle;
  float: right;
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
        width: 100%;
        height: 100%;
        padding: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        input {
          font-size: 14px;
          width: 90%;
          height: 40px;
          box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14), 0 3px 1px -2px rgba(200, 200, 200, 0.12), 0 1px 5px 0 rgba(200, 200, 200, 0.2);
          border: 1px solid rgba(112, 112, 112, 0.02);
          padding: 15px;
          transition: all 0.29s ease;
          border-radius: 4px;
          &:focus {
            width: 100%;
            box-shadow: 0 8px 17px 2px rgba(200, 200, 200,0.14), 0 3px 14px 2px rgba(200, 200, 200,0.12), 0 5px 5px -3px rgba(200, 200, 200,0.2);
          }
        }
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
      p {
        font-size: 22px;
        color: #576271;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          font-size: 12px;
          background-color: #639400;
          color: #ffffff;
          padding: 3px 16px;
          border-radius: 16px;
          margin-left: 10px;
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .vl {display: none;}
  div.float-left {margin-left: 0 !important; margin-bottom: 25px;}
  .job_section {
    .rs {
      .tp {
        .sasasa {width: calc(100% - 30px)}
      }
    }
  }
}

</style>
