import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const user = {
  state: {
    user_tutor: {},
    sidebar_visible: false,
  },
  actions,
  getters,
  mutations,
};
