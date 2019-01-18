export default {
  test_progress: state => state.test_progress,
  tests: state => state.tests,
  active_test: state => state.activeTest,
  /* eslint-disable */
  active_test_question_count: ({ activeTest }) => {
    return activeTest && activeTest.questions && activeTest.questions.length;
  },
  active_test_question_index: ({ activeTest }) => (id) =>  {
    return activeTest && activeTest.questions && activeTest.questions.findIndex(question => question.id === id);
  },
  test_has_subject: ({ tests }) => (id, cgid) => {
    console.log(tests, id, cgid);
    const ab = tests.find(t => t.subject.id === id && (t.ability.class_group && t.ability.class_group.id === cgid));
    return ab && ab.test !== null;
  },
  /* eslint-enable */
  test_time_left: state => state.time_left,
  test_answers: state => state.test_answers,
  test_answers_by_id: state => id => state.test_answers.id,
};
