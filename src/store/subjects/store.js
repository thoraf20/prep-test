import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const subjects = {
  state: {
    subjects: [],
    classgroups: [],
    subject_profiles: [],
    subjects_loaded: false,
  },
  actions,
  getters,
  mutations,
};
