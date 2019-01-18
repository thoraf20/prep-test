export default {
  SET_USER(state, object) {
    state.user_tutor = object;
  },
  TOGGLE_VISIBILITY(state) {
    state.sidebar_visible = Boolean(!state.sidebar_visible);
  },
  OFF_VISIBILITY(state) {
    state.sidebar_visible = false;
  },
};
