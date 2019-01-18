import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const tests = {
  state: {
    tests: [],
    test_progress: false,
    activeTest: {},
    time_left: null,
    test_answers: {},
    test_subject: null,
  },
  actions,
  getters,
  mutations,
};
