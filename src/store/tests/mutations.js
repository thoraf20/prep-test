export default {
  SET_TEST_STATUS(state, array) {
    state.tests = array;
  },
  SET_ACTIVE_TEST(state, object) {
    state.activeTest = object;
  },
  SET_TEST_ANSWERS(state, object) {
    object.questions.forEach((question) => {
      state.test_answers[question.id] = '';
    });
  },
  SET_TEST_ANSWER(state, object) {
    state.test_answers = object;
  },
  SET_ANSWER(state, object) {
    state.test_answers[object.question] = object.answer;
  },
  SET_TIME_LEFT(state, seconds) {
    state.time_left = seconds;
  },
  SET_TEST_SUBJECT(state, value) {
    state.test_subject = value;
  },
  RESET_TEST(state) {
    state.activeTest = {};
    state.time_left = 0;
    state.test_answers = {};
    state.test_subject = null;
  },
};
