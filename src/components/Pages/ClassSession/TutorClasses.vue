<template>
  <div class="container-material hold">
    <div class="top">
      <div class="tp">
        <div class="flt">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 971.986 971.986" style="enable-background:new 0 0 971.986 971.986;" xml:space="preserve" class=""><g><g><path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3   c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873   c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z" data-original="#000000" class="active-path" data-old_color="##4D4F5" fill="rgba(77, 79, 92, 0.5)"/></g></g> </svg>
          Filter
        </div>
        <div class="srch">
          <input type="search" placeholder="Search Classes" class="form-control" v-model="query">
        </div>
      </div>
      <div class="input-group input-daterange">
        <div class="col-sm-6">
          <datepicker v-model="from" placeholder="From" id="exampleInputEmail3" input-class="date-picker" :clear-button="true"></datepicker>
        </div>
        <div class="col-sm-6">
          <datepicker v-model="to" placeholder="To" id="exampleInputEmail4" input-class="date" :clear-button="true"></datepicker>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="tp">
        <p>Classes <span>{{ filtered.length }}</span></p>
        <div class="sasasa"></div>
      </div>
      <div class="table-responsive" v-if="doneLoading">
        <table class="table">
          <thead>
            <tr>
              <td>Tutor Name </td>
              <td>Tutor ID</td>
              <td>Status 
                <span v-b-tooltip.hover title="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        1. Active: Blah Blah Blahship
                        2. Launching: Yada Yada Yada
                        3. Thunder fire the evil">
                  <i id="cia" class="fal fa fa-info-circle"></i>
                </span>
                  <!-- <i id="cia" class="fal fa fa-info-circle"></i>
                  <b-tooltip v-b-tooltip.hover target="cia" placement="bottom">
                      <small style="text-align:left"> 
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br>
                        1. Active: Blah Blah Blahship<br>
                        2. Launching: Yada Yada Yada<br>
                        3. Thunder fire the evil
                      </small>
                  </b-tooltip> -->
              </td>
              <td>Tutors's Phone Number</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c of filtered" :key="c.id">
              <td><router-link :to="{ name: 'tutor-class', params: { id: c.id }}">{{ c.tutor !== null && c.tutor.name !== null ? c.tutor.name : 'Not Available' }}</router-link></td>
              <td>{{ c.tutor !== null && c.tutor.id !== null ? c.tutor.id : 'Not Available' }}</td>
              <td class="status">
                <span :class="c.status ? c.status.name.toLowerCase() : 'default'"></span> 
                {{ c.level && c.level == 1 ? 'Launching' : c.level == 2 ? 'Pending' : 'Active' }}
              </td>
              <td>{{ c.tutor !== null && c.tutor.phone !== null ? c.tutor.phone : 'Not Available' }}</td>
              <td>
                <div class="row">
                  <div class="col-sm-6 col-lg-6">
                     <router-link :to="{ name: 'tutor-class', params: { id: c.id }}">
                      <button class="btn btn-sm btn-sml btn-primary">View Class </button>
                    </router-link>
                  </div>
                  <div class="col-sm-6 col-lg-6">
                     <button @click.prevent="showModal(c.id)" class="btn btn-sm btn-danger btn-td">Make Complaint </button>
                  </div>
                </div>
                <!-- <router-link :to="{ name: 'tutor-class', params: { id: c.id }}">
                  <button class="btn btn-sm btn-sml btn-primary">View Class </button>
                </router-link>
                <button @click.prevent="showModal(c.id)" class="btn btn-sm btn-danger btn-td">Make Complaint </button> -->
                <!-- <b-dropdown variant="link" size="lg" no-caret id="dsdag">
                  <template slot="button-content">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve" class=""><g><g><g><circle cx="69.545" cy="306" r="69.545" data-original="#000000" class="active-path" data-old_color="#000000" fill="#3B86FF"/><circle cx="306" cy="306" r="69.545" data-original="#000000" class="active-path" data-old_color="#000000" fill="#3B86FF"/><circle cx="542.455" cy="306" r="69.545" data-original="#000000" class="active-path" data-old_color="#000000" fill="#3B86FF"/></g></g></g> </svg>
                  </template>
                  <b-dropdown-item :to="{ name: 'tutor-class', params: { id: c.id }}">
                     View Class 
                  </b-dropdown-item>
                  <b-dropdown-item href="#" @click.prevent="showModal(c.id)">Make Complaint</b-dropdown-item>
                  <b-dropdown-item href="#" @click.prevent="showCalendar(c.id)">Submit Lessson</b-dropdown-item> 
                </b-dropdown> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="row justify-content-center">
        <div class="col text-center">
          <spinner />
        </div>
      </div>
      <b-modal ref="myModalRef" hide-footer size="lg" centered class="mkmodal" title="Make Complaint">
        <div class="d-block text-center">
          <div class="form-group">
            <input type="text" placeholder="Summary" v-model="summary" class="form-control">
          </div>
          <div class="form-group">
            <select class="form-control" v-model="regarding">
              <option value="" selected required disabled>What is this ticket about</option>
              <option :value="category.id" v-for="category of categories" :key="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <editor v-model="content" :config="editorConfig"></editor>
          </div>
          <button class="btn btn-success btn-lg submit-button" @click.prevent="submit" :disabled="submitting">Submit <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i></button>
        </div>
      </b-modal>
      <b-modal ref="vcalendar" hide-footer centered class="mkmodal" title="Select your Lesson dates">
        <div class="d-block text-center">
          <v-date-picker mode="multiple" isInline v-model="selectedDates" :select-attribute="selectAttribute" :disabled-dates="disabledDates"></v-date-picker>
          <div class="labels">
            <p>
              <span style="background-color: #639440"></span>Uninvoiced Dates
            </p>
            <p>
              <span style="background-color: #d98c8c"></span> Invoiced Dates
            </p>
          </div>
          <button class="btn btn-success btn-lg submit-button" @click.prevent="saveDates" :disabled="submitting">Submit <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i></button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import swal from 'sweetalert';
import Editor from 'vue-ckeditor2';
import Datepicker from 'vuejs-datepicker';
import Spinner from '@/components/Preloaders/Spinner';

export default {
  name: 'tutor-classes',
  components: { Datepicker, Spinner, Editor },
  data() {
    return {
      to: null,
      from: null,
      query: '',
      summary: '',
      content: '',
      class_id: '',
      regarding: '',
      submitting: false,
      doneLoading: false,
      toolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
      ],
      selectedDates: [],
      disabledDates: [],
      dates: [],
      selectAttribute: {
        highlight: {
          backgroundColor: '#639440',
          borderRadius: '3px',
          width: '80%',
        },
      },
      active_class: '',
      API: `${BASE_API}/v1`,
      editorConfig: {
        toolbar: [
          { name: 'clipboard', items: ['Undo', 'Redo'] },
          { name: 'styles', items: ['Styles', 'Format'] },
          {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat'],
          },
          {
            name: 'paragraph',
            items: [
              'NumberedList',
              'BulletedList',
              '-',
              'Outdent',
              'Indent',
              '-',
              'Blockquote',
            ],
          },
          { name: 'tools', items: ['Maximize'] },
        ],
      },
    };
  },
  computed: {
    classes() {
      return this.$store.getters.session_classes;
    },
    filtered() {
      return this.classes.filter((c) => {
        // date filter
        const dt = moment(c.updated_at.date);
        // datefrom
        if (this.from !== null && !moment(dt).isAfter(moment(this.from))) {
          return false;
        }
        // dateto
        if (this.to !== null && !moment(dt).isBefore(moment(this.to))) {
          return false;
        }

        // filter for the search params
        return !(c.client && !c.client.name.toLowerCase().match(this.query.toLowerCase()));
      });
    },
    categories() {
      return this.$store.getters.ticket_categories;
    },
  },
  methods: {
    moments(val) {
      return moment(val).format('MMM D, YYYY');
    },
    async fetchDates() {
      try {
        const { data: { data: dates } } = await this.$http
          .get(`${this.API}/tutor/session-classes/${this.active_class}/dates`);
        this.dates = dates;
        this.filterDates(dates);
      } catch (e) {
        console.error(e);
      }
    },
    filterDates(dates) {
      this.selectedDates = dates.filter(d => !d.hasInvoice).map(d => new Date(d.date));
      this.disabledDates = dates.filter(d => d.hasInvoice).map(d => new Date(d.date));
    },
    showModal(classId) {
      this.class_id = classId;
      this.$refs.myModalRef.show();
    },
    showCalendar(classId) {
      this.active_class = classId;
      this.fetchDates();
      this.$refs.vcalendar.show();
    },
    hideModal() {
      this.resetModalForm();
      this.$refs.myModalRef.hide();
    },
    hideCalendar() {
      this.selectedDates = [];
      this.disabledDates = [];
      this.active_class = '';
      this.$refs.vcalendar.hide();
    },
    resetModalForm() {
      this.summary = '';
      this.content = '';
      this.class_id = '';
      this.regarding = '';
    },
    itemType(val) {
      switch (val && val.name) {
        case 'active':
          return 'success';
        case 'ended':
          return 'fail';
        default:
          return 'default';
      }
    },
    submit() {
      this.submitting = true;

      const data = {
        class_id: this.class_id,
        title: this.summary,
        category: this.regarding,
        description: this.content,
      };
      this.$store.dispatch('makeTicket', data)
        .then(() => {
          this.submitting = false;
          this.hideModal();
        })
        .catch(error => console.error(error));
    },
    saveDates() {
      this.saving = true
      this.$http.post(`${this.API}/tutor/session-classes/${this.active_class}/dates`, {
        dates: this.selectedDates ? this.selectedDates.map(d => moment(d).format('YYYY-MM-DD')) : []
      }).then(({ data: { data } }) => {
        this.dates = data;
        this.filterDates(data);
        this.saving = false;
        this.hideCalendar();
      })
        .catch((err) => {
          console.error(err);
          this.saving = false;
        });
    },
  },
  mounted() {
    this.$store.dispatch('getClasses')
      .then(() => this.$store.dispatch('getCategories'))
      .then(() => this.doneLoading = true)
      .catch(error => swal('Something went wrong', error, 'error'));
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.hold {
  padding: 25px 0;
  height: 100%;
}

.btn-sm {
  height:30px;
  width: 110px;
  box-shadow: 0 2px 2px 0 hsla(0,0%,44%,.14), 0 3px 1px -2px hsla(0,0%,44%,.12), 0 1px 5px 0 hsla(0,0%,44%,.2);
  border-radius: 0px;
}
.btn-sml {
  width: 90px;
}
.btn-danger {
  background:#dc3545;
  border-color: #dc3545;
}
.btn-primary {
  background: #17a2b8;
  border-color: #17a2b8;
}

.container-material {
  display: block;
}

.top {
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
  .tp {
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    width: 30%;
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
      input {
        font-size: 14px;
        width: 185px;
        height: 40px;
        box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14), 0 3px 1px -2px rgba(200, 200, 200, 0.12), 0 1px 5px 0 rgba(200, 200, 200, 0.2);
        border: 1px solid rgba(112, 112, 112, 0.02);
        padding: 15px;
        transition: all 0.29s ease;
        border-radius: 4px;
        &:focus {
          width: 215px;
          box-shadow: 0 8px 17px 2px rgba(200, 200, 200,0.14), 0 3px 14px 2px rgba(200, 200, 200,0.12), 0 5px 5px -3px rgba(200, 200, 200,0.2);
        }
      }
    }
    &:hover {.flt {color: #639440;}}
  }
  .input-daterange {
    width: 30%;
  }
  #exampleInputEmail3, #exampleInputEmail4 {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-radius: 18px;
    border: 1px solid rgba(112, 112, 112, 0.04);
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
}

.bottom {
  margin-top: 25px;

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
        padding: 1px 12px;
        border-radius: 16px;
        margin-left: 15px;
      }
    }
  }
  .table {
    margin-top: 30px;
    padding: 15px;
    margin-left: 15px;
    thead {
      tr {
        td {
          border-top: none;
          color: #576271;
          text-transform: capitalize;
          font-size: 18px;
          font-weight: 300;
        }
      }
    }
    tbody {
      tr {
        &:hover {background-color: #fafafa;}
        td {
          color: #576271;
          text-transform: capitalize;
          font-size: 13px;
          padding: 25px 12px;
          border-top: 1px solid rgba(112, 112, 112, .12);
          a {
            color: #576271;
            text-transform: capitalize;
            font-size: 13px;
            &:hover {color: #639440; text-decoration: none;}
          }
          &.status {
            span {
              content: ' ';
              display: inline-block;
              margin-right: 5px;
              height: 10px;
              width: 10px;
              border-radius: 100%;
              background-color: #4D4F5C;
              &.active {background-color: #38ADB6;}
              &.ended {background-color: #F83B54;}
              &.paused {background-color: #FFBB03;}
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .btn-sm {
    font-size: 10px;
    text-align: left;
    width:100%;
  }
  .bottom {
    .tp {
      .sasasa {width: calc(100% - 30px)}
    }
    .table {
      width: 100%;
      margin-left: 0;
      overflow-x: auto;
      thead {
        tr {
          td {font-size: 12px;}
        }
      }
      tbody {
        tr {
          td {
            font-size: 10px;
            a {font-size: 10px;}
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.mkmodal {
  .labels {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    padding: 15px;
    p {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0;
      margin-right: 10px;
    }
    span {
      content: '';
      display: block;
      height: 12px;
      width: 12px;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
  .modal-backdrop {
    opacity: 1;
    background-color: #E2E8ED;
    filter: blur(9px) brightness(50) opacity(50%);
  }
  .modal-content {
    border: none;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    .modal-header {
      justify-content: center;
      position: relative;
      border-bottom: none;
      .modal-title {
        text-align: center;
      }
      .close {
        float: right;
        right: 0;
        top: 0;
        margin: 0;
        position: absolute;
      }
    }
    .modal-body {
      width: 85%;
      margin-left: auto;
      margin-right: auto;
      .form-control {
        border-radius: 4px;
        border: 1px solid #E8E9EC;
        padding: 5px 15px; 
        color: #4D4F5C;
        &::placeholder {color: #4D4F5C; opacity: 0.3;}
      }
      select.form-control {
        option {
          padding: 10px;
        }
      }
      .quillWrapper {
        .ql-toolbar.ql-snow {
          border: 1px solid #E8E9EC;
          border-top-right-radius: 4px;
          border-top-left-radius: 4px;
          text-align: left;
          padding: 4px 15px;
          .ql-formats {
            margin: 0;
          }
          .ql-picker-label {
            font-size: 13px;
          }
          button {
            svg {height: 16px; width: 16px}
          }
        }
        .ql-container.ql-snow {
          border: 1px solid #E8E9EC;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-top: none;
        }

      }
      .btn {
        width: 130px;
        height: 38px;
        line-height: 38px;
        padding: 0 10px;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        vertical-align: middle;
        box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
        &:focus {
          outline: 0 !important;
          box-shadow: none !important;
          &:active {box-shadow: none !important;}
        }
      }
      .c-pane-container {
        width: 100%;
        margin-top: 0px;
        margin-bottom: 20px;
        border: none !important;
        background-color: #ffffff !important;

        .c-header {
          padding: 15px 10px;
          padding-bottom: 35px;
          .c-arrow-layout {
            padding: 10px;
            border: 1px solid #E8E9EC;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
          }
          .c-title {
            font-size: 14px;
            color: #639440;
          }
        }
        .c-weekdays {
          .c-weekday {
            padding: 15px;
            font-size: 12px;
            font-weight: 600;
            background-color: rgba(221, 232, 213, 1);
          }
        }
        .c-week {
          .c-day-content {
            padding: 15px;
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>