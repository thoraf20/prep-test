<template>
  <div class="cont">
    <div class="row" v-if="doneLoading">
      <div class="col-md-2 left-nav">
        <ul>
          <li v-for="g of groups" :key="g.id" :class="{active: activeGroup === g.id}">{{ g.value }}</li>
        </ul>
      </div>
      <div class="col-md-10">
        <div class="hold" v-if="!questionsActive">
          <h3 class="title">{{ agc.title }}</h3>
          <p>{{ agc.body }}</p>
          <button class="btn btn-success submit-button" @click="checkNext">Next</button>
        </div>
        <div class="hold questions" v-else>
          <h3 class="title">{{ agq.title }}</h3>
          <p v-for="option of agq.options" :key="option.id">
            <label>
              <input type="radio" :name="agq.id" :value="option.id" class="filled-in" v-model="selectedOption" />
              <span>{{ option.value }}</span>
            </label>
          </p>
          <button class="btn btn-success submit-button" @click="checkNext">Next</button>
        </div>
      </div>
    </div>
    <div class="row card" v-else>
      <div class="col card-body text-center">
        <spinner></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import Spinner from '@/components/Preloaders/Spinner';

export default {
  name: 'how-it-works',
  components: { Spinner },
  data() {
    return {
      API: `${BASE_API}/v1`,
      groups: [],
      groupContent: [],
      activeGroup: '',
      activeGroupContent: '',
      activeQuestion: '',
      questionsActive: false,
      selectedOption: '',
      doneLoading: false,
    };
  },
  computed: {
    grc() {
      if (this.activeGroup === '') {
        this.activeGroup = this.groups[0].id;
      }
      return this.groupContent.find(gc => gc.id === this.activeGroup);
    },
    agc() {
      if (this.activeGroupContent === '') {
        this.activeGroupContent = this.grc.contents[0].id;
      }
      return this.grc.contents.find(grcc => grcc.id === this.activeGroupContent);
    },
    agq() {
      if (this.activeQuestion === '') {
        this.activeQuestion = this.grc.questions[0].id;
      }
      return this.grc.questions.find(grcq => grcq.id === this.activeQuestion);
    },
  },
  methods: {
    checkNext() {
      // Is it a text or a question
      if (this.questionsActive) {
        this.checkQuestion();
      } else {
        this.checkGroupContent();
      }
    },
    checkQuestion() {
      // check if correct
      const opt = this.agq.options.find(grcqo => grcqo.id === this.selectedOption);
      if (opt && opt.correct) {
        return this.nextQuestion();
      }
      return swal('Wrong', 'Sorry that wasn\'t the right answer. Try again!', 'error')
        .then(() => {
          this.questionsActive = false;
          this.activeGroupContent = this.grc.contents[0].id;
        });
    },
    checkGroupContent() {
      const groupContentIndex = this.grc.contents.findIndex(gcc => gcc.id === this.activeGroupContent);

      if (this.grc.contents.length > groupContentIndex + 1) {
        // if theres another show it
        console.log('checks grc correctly');
        return this.nextGroupContent();
      }
      // if there isn;t
      // check if theres a question
      if (this.grc.questions.length) {
        // if there's a question move to it and set queston active
        console.log('checks questions correctly');
        this.questionsActive = true;
        this.reset();
        return this.nextQuestion();
      }
      // if there's no question move to the next group
      return this.nextGroup();
    },
    nextQuestion() {
      if (this.activeQuestion === '') {
        this.activeQuestion = this.grc.questions[0].id;
        return true;
      }
      // if it's a question  check if ther's another one
      const questionIndex = this.grc.questions.findIndex(grcq => grcq.id === this.activeQuestion);
      if (this.grc.questions.length > questionIndex + 1) {
        this.activeQuestion = this.grc.questions[questionIndex + 1].id;
        this.selectedOption = '';
        return true;
      }
      // if there's no other one move to text and set active false
      this.questionsActive = false;
      return this.nextGroup();
    },
    nextGroup() {
      const groupIndex = this.groups.findIndex(g => g.id === this.activeGroup);
      if (this.groups.length > groupIndex + 1) {
        this.activeGroup = this.groups[groupIndex + 1].id;
        this.reset();
        return true;
      }
      return this.$router.push({ name: 'home-dashboard' });
    },
    nextGroupContent() {
      const groupContentIndex = this.grc.contents.findIndex(gcc => gcc.id === this.activeGroupContent);
      if (this.grc.contents.length > groupContentIndex + 1) {
        console.info(groupContentIndex);
        this.activeGroupContent = this.grc.contents[groupContentIndex + 1].id;
        return true;
      }
      return this.nextGroup();
    },
    reset() {
      this.activeGroupContent = '';
      this.activeQuestion = '';
      this.selectedOption = '';
    }
  },
  mounted() {
    axios.get(`${this.API}/tutor/how-it-works`)
      .then(({ data: { data } }) => {
        this.groupContent = data;
        const group = [];

        for (const g of data) {
          group.push({ id: g.id, value: g.value });
        }
        
        this.groups = group;
        this.doneLoading = true;
      })
      .catch((err) => {
        swal('Error', 'Something went wrong. Please reload the page', 'error');
      });
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.cont {
  padding: 15px 0;
}
h3.title {
  font-size: 20px;
  font-weight: 800;
  margin: 10px 0;
}
p.subtitle {
  margin: 5px 0;
  color: #2A2A2A;
  font-size: 16px;
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
.mx { margin: 0 10px; }
.foot {
  margin-top: 30px;
}
.left-nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
  min-height: 350px;
  border-right: 1px solid rgba(0, 0, 0, .25);
  ul {
    li {
      padding: 10px 0;
      cursor: pointer;
      font-size: 16px;
      &:hover{color: #639440;}
      &.active {list-style-image: url(../../../assets/tick.svg); color: #639440;}
    }
  }
}
.hold {
  padding: 0 50px;
}
</style>