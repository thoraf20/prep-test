import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const tickets = {
  state: {
    ticket: {},
    tickets: [],
    categories: {},
    class_tickets: [],
  },
  actions,
  getters,
  mutations,
};
