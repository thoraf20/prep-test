<template>
  <div class="test--container">
    <div class="top">
      <p class="time">{{ time_left }}</p>
      <a class="right" title="Quit Test" @click="quit">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve" width="512px" height="512px" class=""><g><g><path d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M7,3c0-0.5,0.5-1,1-1s1,0.5,1,1v4   c0,0.5-0.5,1-1,1S7,7.5,7,7V3z M8,13c-2.762,0-5-2.238-5-5c0-2.051,1.234-3.812,3-4.584v2.348C5.387,6.313,5,7.111,5,8   c0,1.657,1.343,3,3,3s3-1.343,3-3c0-0.889-0.387-1.687-1-2.236V3.416C11.766,4.188,13,5.949,13,8C13,10.762,10.762,13,8,13z" data-original="#030104" class="active-path" data-old_color="#8cb5d4" fill="#fafafa"/></g></g></svg>
      </a>
    </div>
    <router-view></router-view>
    <div class="actions">
      <a @click="previous" :class="{ disabled: !this.previousable }">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px" class=""><g><g><g><path d="M491.318,235.318H20.682C9.26,235.318,0,244.578,0,256c0,11.423,9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M49.932,256L211.795,94.136c8.077-8.077,8.077-21.172,0-29.249c-8.077-8.076-21.172-8.076-29.249,0L6.058,241.375    c-8.077,8.077-8.077,21.172,0,29.249l176.488,176.488c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.625-6.058    c8.077-8.077,8.077-21.172,0-29.249L49.932,256z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></g></svg>
        Previous
      </a>
      <div class="divider"></div>
      <a @click="next" :class="{disabled: !this.nextable }">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px" class=""><g><g><g><path d="M491.318,235.318H20.682C9.26,235.318,0,244.578,0,256c0,11.423,9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M505.942,241.375L329.454,64.887c-8.077-8.076-21.172-8.076-29.249,0c-8.076,8.077-8.076,21.172,0,29.249L462.069,256    L300.205,417.863c-8.076,8.077-8.076,21.172,0,29.249c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.625-6.058    l176.488-176.488C514.019,262.547,514.019,249.452,505.942,241.375z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></g></svg>
      </a>
    </div>
    <div class="submit" ref="submit" id="dslakfjdlsa">
      <a class="btn btn-success submit-button" @click="submitAnswers">Submit Test</a>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import swal from 'sweetalert';

export default {
  props: ['test'],
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.getters.active_test.id || vm.$router.push({ name: 'test-status' }));
  },
  beforeDestroy() {
    this.$store.commit('RESET_TEST');
  },
  mounted() {
    if (!this.$route.params.question) {
      this.$router.push({ name: 'test-question', params: { question: this.first_question } });
    }
    if (!this.active_test) {
      this.$router.push({ name: 'tests' });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$refs.submit.scrollIntoView(true);
    next();
  },
  computed: {
    active_test() {
      return this.$store.getters.active_test;
    },
    first_question() {
      return 1;
    },
    time_left() {
      const t = this.$store.getters.test_time_left;
      if (t === 0) {
        return this.submitAnswers();
      }
      return `${this.pad(moment.duration(t, 'seconds').minutes())}:${this.pad(moment.duration(t, 'seconds').seconds())}`;
    },
    r() {
      return this.$route.params.question;
    },
    nextable() {
      return this.r && (this.r + 1) <= this.active_test.questions.length;
    },
    previousable() {
      return this.r && (this.r - 1) > 0;
    },
  },
  methods: {
    previous() {
      if (this.previousable) {
        return this.$router.push({ name: 'test-question', params: { question: (this.r - 1) } });
      }
      console.log(this.previousable);
      return null;
    },
    next() {
      if (this.nextable) {
        return this.$router.push({ name: 'test-question', params: { question: (this.r + 1) } });
      }
      console.log(this.nextable);
      return null;
    },
    quit() {

    },
    submit() {
      return this.$store.dispatch('submitAnswers');
    },
    submitAnswers() {
      return this.$store.dispatch('submitAnswers')
        .then(response => this.$router.push({ name: 'test-status', query: { test: this.test } }))
        .catch(error => this.$router.push({ name: 'test-status' }));
    },
    pad(n) {
      return n < 10 ? `0${n}` : n;
    },
  },
  updated() {
    this.$refs.submit.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  },
};
</script>

<style lang="scss">
  .test--container {
    padding: 10px;
    min-heigth: 100%;

    .right {float: right;}
    .top { width: 100%; height: 20px; padding:10px; svg {width: 20px; height: 20px;} p.time {float: right; margin-left: 20px; font-size: 18px; margin-bottom: 0; color: #639440; font-weight: 900; letter-spacing: 2px;}}
    
    .actions {
      width: 100%;
      max-width: 280px;
      height: 64px;
      margin-top: 25px;
      margin-bottom: 20px;
      padding: 0 25px;
      color: #639440;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      padding: 5px;
      border-radius: 7px;

      a {
        font-size: 14px;
        color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #639440;
        cursor: pointer;
        &:hover {text-decoration: underline;}
        svg { height: 14px; width: 14px; margin: 0 15px;}
      }
      div.divider {height: 100%; width: 1px; background-color: rgba(0, 0, 0, 0.25);}
    }
    .submit {
      display: flex;
      flex-direction: flex-start;
      padding: 0 25px;
      .submit-button {
        width: 130px;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        text-align: center;
        border-radius: 4px;
        color: #ffffff;
        font-size: 12px;
        vertical-align: middle;
        box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
        &:focus {
          outline: 0 !important;
          box-shadow: none !important;
          &:active {box-shadow: none !important;}
        }
      }
    }
  }
</style>