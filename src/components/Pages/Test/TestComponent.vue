<template>
  <div class="test">
    <p class="status">{{ questionIndex + 1 }}/{{ questionCount }}</p>
    <div class="review">
      <p>
        <label>
          <input type="checkbox"/>
          <span>mark for review</span>
        </label>
      </p>
    </div>
    <p class="question" v-html="questionObject.description"></p>
    <div class="answers f">
      <p v-for="answer in questionObject.answers" :key="answer.id">
        <label>
          <input type="radio" :name="questionObject.id" :value="answer.id" class="filled-in" v-model="ans[questionObject.id]" />
          <span v-html="answer.description"></span>
        </label>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question', 'test'],
  data() {
    return {
      ans: this.$store.getters.test_answers,
    };
  },
  beforeCreate() {
    console.info('just created');
  },
  computed: {
    testObject() {
      return this.$store.getters.active_test;
    },
    questionObject() {
      const q = parseInt(this.question, 10) - 1;
      const qi = (q >= 0 && q < this.testObject.questions.length) ? q : 0;
      return this.testObject.questions[qi];
    },
    questionIndex() {
      return this.$store.getters.active_test_question_index(parseInt(this.questionObject.id, 10));
    },
    questionCount() {
      return this.$store.getters.active_test_question_count;
    },
  },
  methods: {
    has(v, a) {
      if (v === a) {
        return 'checked';
      }
      return console.log(v, a);
    },
  },
  updated() {
    this.$store.commit('SET_TEST_ANSWER', this.ans);
    console.info('just updated');
    console.log(this.$refs.submit);
  },
  beforeDestroy() {
    console.log('finna destroy bitch');
  },
};
</script>

<style lang="scss">
  .test {
    margin: 25px 0;
    padding: 0 25px;
    color: #ffffff;
    p.status {color: #4D4F5C; border: 1px solid #E8E9EC; font-weight: 600; margin: 5px; box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14), 0 3px 1px -2px rgba(200, 200, 200, 0.12), 0 1px 5px 0 rgba(200, 200, 200, 0.2); display: inline; padding: 5px 25px; border-radius: 4px;}
    p.question {font-weight: bold; margin: 10px; font-size: 1.4rem; width: 100%; max-width: 700px; color: #333333 !important;}
    .answers {
      width: 100%;
      height: auto;
      margin: 30px 7px;
      padding: 20px;
      border-radius: 7px;
      background: #fcfcfc;
      color: #333333;
      box-sizing: border-box;

      p { 
        width: 100%;
        max-width: 700px;
        &:not(:last-child) {border-bottom: 1px solid rgba(200, 200, 200, 0.4); padding-bottom: 15px;}
        &:first-child {padding-top: 10px;}
        &:not(:first-child) {padding-top: 20px;}
        label span { display: flex; align-items: center;}
      }
    }
    .review {
      float: right;
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 0;

      p {
        width: 195px;
        margin: 0;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
        background-color: rgba(0, 0, 0, 0.4);
        label {display: flex; flex-direction: row; align-items: center; margin: 0; span {margin-left: 10px;}}
      }
    }
  }
  $radio-fill-color: #639440 !default;
  $radio-empty-color: #cfcfcf !default;
  $input-disabled-solid-color: #949494 !default;
  $radio-border: 1px solid $radio-fill-color !default;
  $input-disabled-color: rgba(0,0,0, .42) !default;
  $input-background: #fff !default;
  $secondary-color: #639440;
  /* Checkboxes
   ========================================================================== */

  /* Remove default checkbox */
  [type="radio"]:not(:checked),
  [type="radio"]:checked {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  // Checkbox Styles
  [type="radio"] {
    // Text Label Style
    + span:not(.lever) {
      position: relative;
      padding-left: 35px;
      cursor: pointer;
      display: inline-block;
      height: 25px;
      line-height: 25px;
      font-size: 1rem;
      user-select: none;
    }

    /* checkbox aspect */
    + span:not(.lever):before,
    &:not(.filled-in) + span:not(.lever):after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 25px;
      height: 25px;
      z-index: 0;
      border: 1px solid $radio-empty-color;
      border-radius: 2.3px;
      margin-top: 3px;
      transition: .2s;
    }

    &:not(.filled-in) + span:not(.lever):after {
      border: 0;
      transform: scale(0);
    }

    &:not(:checked):disabled + span:not(.lever):before {
      border: none;
      background-color: $input-disabled-color;
    }

    // Focused styles
    &.tabbed:focus + span:not(.lever):after {
      transform: scale(1);
      border: 0;
      border-radius: 50%;
      box-shadow: 0 0 0 10px rgba(0,0,0,.1);
      background-color: rgba(0,0,0,.1);
    }
  }

  [type="radio"]:checked {
    + span:not(.lever):before {
      top: -4px;
      left: -5px;
      width: 12px;
      height: 22px;
      border-top: 2px solid transparent;
      border-left: 2px solid transparent;
      border-right: $radio-border;
      border-bottom: $radio-border;
      transform: rotate(40deg);
      backface-visibility: hidden;
      transform-origin: 100% 100%;
    }

    &:disabled + span:before {
      border-right: 2px solid $input-disabled-color;
      border-bottom: 2px solid $input-disabled-color;
    }
  }

  /* Indeterminate checkbox */
  [type="radio"]:indeterminate {
    + span:not(.lever):before {
      top: -11px;
      left: -12px;
      width: 10px;
      height: 22px;
      border-top: none;
      border-left: none;
      border-right: $radio-border;
      border-bottom: none;
      transform: rotate(90deg);
      backface-visibility: hidden;
      transform-origin: 100% 100%;
    }

    // Disabled indeterminate
    &:disabled + span:not(.lever):before {
      border-right: 2px solid $input-disabled-color;
      background-color: transparent;
    }
  }

  // Filled in Style
  [type="radio"].filled-in {
    // General
    + span:not(.lever):after {
      border-radius: 50%;
    }

    + span:not(.lever):before,
    + span:not(.lever):after {
      content: '';
      left: 0;
      position: absolute;
      /* .1s delay is for check animation */
      transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;
      z-index: 1;
    }

    // Unchecked style
    &:not(:checked) + span:not(.lever):before {
      width: 0;
      height: 0;
      border: 3px solid transparent;
      left: 6px;
      top: 10px;
      transform: rotateZ(37deg);
      transform-origin: 100% 100%;
    }

    &:not(:checked) + span:not(.lever):after {
      height: 25px;
      width: 25px;
      background-color: transparent;
      border: 2px solid $radio-empty-color;
      top: 0px;
      z-index: 0;
    }

    // Checked style
    &:checked {
      + span:not(.lever):before {
        top: 2px;
        left: 3px;
        width: 8px;
        height: 13px;
        border-top: 2px solid transparent;
        border-left: 2px solid transparent;
        border-right: 2px solid $input-background;
        border-bottom: 2px solid $input-background;
        transform: rotateZ(37deg);
        transform-origin: 100% 100%;
      }

      + span:not(.lever):after {
        top: 0;
        width: 25px;
        height: 25px;
        border: 2px solid $secondary-color;
        background-color: $secondary-color;
        z-index: 0;
      }
    }

    // Focused styles
    &.tabbed:focus + span:not(.lever):after {
      border-radius: 2px;
      border-color: $radio-empty-color;
      background-color: rgba(0,0,0,.1);
    }

    &.tabbed:checked:focus + span:not(.lever):after {
      border-radius: 2px;
      background-color: $secondary-color;
      border-color: $secondary-color;
    }

    // Disabled style
    &:disabled:not(:checked) + span:not(.lever):before {
      background-color: transparent;
      border: 2px solid transparent;
    }

    &:disabled:not(:checked) + span:not(.lever):after {
      border-color: transparent;
      background-color: $input-disabled-solid-color;
    }

    &:disabled:checked + span:not(.lever):before {
      background-color: transparent;
    }

    &:disabled:checked + span:not(.lever):after {
      background-color: $input-disabled-solid-color;
      border-color: $input-disabled-solid-color;
    }
  }
</style>