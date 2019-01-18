<template>
  <div class="w-100">
    <h5 v-show="doneLoading" class="titled">Edit {{ subjectSlug || 'Subject Profile' }}</h5>
    <div class="card-body" v-if="doneLoading" style="padding-top: 5px;">
      <div class="row">
        <div class="col-md-12 preview" v-if="previewing">
          <div class="row head">
            <div class="profile-image" :style="{backgroundImage: `url(${this.$auth.user().profile_pic || '../../assets/skq.jpg'})`}"></div>
            <div class="profile-details">
              <h3>{{ u.name }}</h3>
              <p>Home tutor in {{ u.location.name }}</p>
            </div>
          </div>
          <div class="row tail">
            <div class="item">
              <div class="heading">
                About
              </div>
              <div class="content">
                <div class="subtitle">Prepclass Tutor Since: {{ moments(u.created_at) }}</div>
                <p v-html="u.about_tutor"></p>
              </div>
            </div>
            <div class="item">
              <div class="heading">
                Experiences
              </div>
              <div class="content">
                <span v-for="ex of u.experiences">
                  <div class="title">{{ ex.title }}</div>
                  <div class="subtitle">{{ ex.place }}</div>
                  <p v-html="ex.roles"></p>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="heading">
                Education
              </div>
              <div class="content">
                <span v-for="ed of u.educations">
                  <div class="title">{{ ed.department.name }} <span>{{ `${ed.start.month} ${ed.start.year}` }} - {{ ed.end.month ? `${ed.end.month} ${ed.end.year}` : 'Present' }}</span></div>
                  <p v-html="ed.school.name"></p>
                </span>
              </div>
            </div>
          </div>
          <button class="btn submit-button btn-success" @click="() => previewing = false" style="float: right">Done</button>
        </div>
        <div class="col-md-12" v-else>
          <div class="">
            <div id="subject-form">
              <div class="row">
                <div class="col-sm-12">
                  <input type="text" @input="slugify" placeholder="Enter title of Profile" name="title" v-model="title" class="form-control">
                </div>

                <br><br>
                <div class="col-sm-12 margin-top">
                  <input type="text" name="slug" v-model="slug"   readonly="true" class="form-control">
                </div>

                <div class="col-sm-12 margin-top">
                  <editor v-model="content" :config="editorConfig"></editor>
                </div>

                <div class="col-sm-12">
                  <button class="btn btn-info btn-lg submit-button pull-right" @click="nextStage">Move to next stage</button>
                  <button class="btn btn-success btn-lg submit-button pull-right" @click="saveProfile" :disabled="submitting">Save and preview<i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body" v-else>
      <div class="row">
        <div class="col-12 text-center">
          <spinner></spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Preloaders/Spinner';
import moment from 'moment';
import Editor from 'vue-ckeditor2';
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: 'edit-subject-profile',
  props: ['ability_subject_id'],
  components: { Editor, Spinner },
  data() {
    return {
      slug: '',
      subjectSlug: '',
      content: '',
      title: '',
      submitting: false,
      apiUrl: `${BASE_API}/v1/tutor/`,
      doneLoading: false,
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
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
      previewing: false,
    };
  },
  computed: {
    u() {
      return this.$auth.user();
    },
  },
  mounted() {
    this.getBusy();
    this.doneLoading = false;
    this.$http.get(`${this.apiUrl}ability-subjects/profiles`)
      .then((response) => {
        this.$store.commit('SET_SUBJECT_PROFILES', response.data.data);
        this.doneLoading = true;
      })
      .catch(error => console.error(error));
  },
  beforeRouteUpdate(to, from, next) {
    this.slug = null;
    this.content = null;
    this.title = null;
    const t = this.$store.getters.subjectProfile(to.params.ability_subject_id);
    this.slug = t && t.abilityProposals && t.abilityProposals.slug;
    this.title = t && t.abilityProposals && t.abilityProposals.title;
    this.content = (t && t.abilityProposals && t.abilityProposals.content) || '';
    this.subjectSlug = t && t.abilitySubject.subject && t.abilitySubject.subject.slug;
    next();
  },
  methods: {
    moments(val) {
      return moment(val).format('MMM D, YYYY');
    },
    getBusy() {
      return axios.get(`${this.apiUrl}ability-subjects/${this.ability_subject_id}`)
        .then((response) => {
          const { data: { data } } = response;
          this.title = data.abilityProposals.title;
          this.slug = data.abilityProposals.slug;
          this.content = data.abilityProposals.content;
          this.subjectSlug = data.abilitySubject.subject && data.abilitySubject.subject.slug;
          this.doneLoading = true;
        })
        .catch(error => console.error(error));
    },
    saveProfile() {
      if (this.title === '' || this.title == null || this.content === '' || this.content == null) {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Please fill in all fields',
          footer: '',
        });
      } else {
        const url = this.apiUrl + 'subject-profile';
        const data = {
          'ability_subject_id' : this.ability_subject_id,
          'title' : this.title,
          'content' : this.content,
          'tutor_id' : this.$auth.user().id
        };
        this.submitting = true;
        this.$http.post(url, data)
          .then((response) => {
            if(response.data.status == false) {
              swal({
                type: 'error',
                title: 'Oops...',
                text: `${response.data.message} You can make an edit to a profile instead`,
                footer: ''
              })
              .then((value) => {
                if (value) {
                  this.$router.push({ name: 'subject-profiles' });
                }
              });
            } else {
              this.getBusy().then(() => {
                axios.post(`${BASE_API}/v1/tutor/steps`, { step: 'academic_info' })
                  .then(() => this.$store.dispatch('getUserTutor'))
                  .then(() => {
                    swal({
                      title: "Success",
                      text: `Saved the Profile successfully`,
                      icon: "success",
                      buttons: ["Cancel", "Preview ⌗"]
                    })
                      .then(() => this.$router.push({ name: 'preview-profile', params: { tutor: this.$auth.user().id }, query: { subject: this.subjectSlug, redirect: window.location.href } }));
                  });
              });
            }
            this.submitting = false;
          })
          .catch((error) => {
            console.log(error)
            this.submitting = false
          })
      }
    },
    slugify() {
      let slugInput = this.title.toLowerCase();
      slugInput = slugInput.replace(/\s*$/g, '');
      slugInput = slugInput.replace(/\s+/g, '-');

      this.slug = slugInput;
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
  beforeDestroy() {
    console.log('finna destroy bitch');
  },
};
</script>

<style lang="scss" scoped>
h5.titled {
    font-size: 18px;
    font-weight: 800;
    width: 100%;
    border-bottom: 1px solid #ededed;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
  .card-body { padding-bottom: 0; }
  label
  {
    font-size: 17px;
  }
  div#subject-form
  {
    padding-top: 20px;
  }
  .margin-top
  {
    margin-top: 20px;
  }
  .margin-left
  {
    margin-left: 20px;
  }
  input {
    border: 1px solid #ecedef !important;
  }
  .ql-toolbar.ql-snow {
    border: 1px solid #ecedef !important;
  }
  .ql-container.ql-snow {
    border: 1px solid #ecedef !important;
    border-top: 0 !important;
  }
  .submit-button {
    margin-top: 25px;
    width: 130px;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
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
  .preview {
    width: 100%;

    .head {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 15px;
      .profile-image {
        width: 150px;
        height: 150px;
        border-radius: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        content: ' ';
        display: block;
        margin-right: 25px;
      }
      .profile-details {
        h3 {font-weight: 26px; color: #333333; font-weight: 600;}
      }
    }
    .tail {
      margin-top: 15px;
      .item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        margin-top: 15px;
        .heading {
          width: 125px;
          min-width: 125px;
          height: 100%;
          font-weight: 600;
          font-size: 20px;
        }
        .content {
          span {margin-bottom: 10px;}
          .title {font-weight: 600; font-size: 18px; margin-bottom: 5px; width: 100%; span {font-size: 12px; font-weight: 300; color: #333333; margin-left: 25px;}}
          .subtitle {font-weight: 600; font-size: 16px; margin-bottom: 5px;}
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
  }
</style>