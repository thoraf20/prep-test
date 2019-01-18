import axios from "axios";
import Vue from "vue";

const API = BASE_API + "/v1/";

const store = {
  state: {
    progress: {
      edit: false,
      credentials: false,
      pic: false,
      subjects: false,
      availability: false
    },
    password_progress: {
      updated: false
    },
    locations: [],
    states: [],
    knowledgeGraph: [],
    schools: [],
    departments: [],
    degrees: [],
    gradeClasses: [],
    curricula: [],
    classGroups: [],
    fetched: {
      locations: false,
      states: false,
      knowledgeGraph: false,
      schools: false,
      departments: false,
      degrees: false,
      gradeClasses: false,
      curricula: false,
      classGroups: false
    },
    fetching: {
      locations: false,
      states: false,
      knowledgeGraph: false,
      schools: false,
      departments: false,
      degrees: false,
      gradeClasses: false,
      curricula: false,
      classGroups: false
    }
  },
  mutations: {
    START_GENERIC_LOAD_ARRAY(state, item) {
      state.fetching[item] = true;
    },
    STOP_GENERIC_LOAD_ARRAY(state, item) {
      state.fetching[item] = false;
    },
    GENERIC_SAVE_ARRAY_ITEM(state, payload) {
      state[payload.name] = payload.data;
      state.fetched[payload.name] = true;
      state.fetching[payload.name] = false;
    },
    SET_PROGRESS(state, payload) {
      state.progress = { ...state.progress, ...payload };
    },
    SET_PASSWORD_PROGRESS(state, payload) {
      state.password_progress = { ...state.password_progress, ...payload };
    },
    UPDATE_PROFILE: state => (state.progress.edit = true),
    UPDATE_CREDENTIALS: state => (state.progress.credentials = true),
    UPDATE_PIC: state => (state.progress.pic = true),
    UPDATE_SUBJECTS: state => (state.progress.subjects = true),
    UPDATE_AVAILABILITY: state => (state.progress.availability = true)
  },
  getters: {
    hasFetchedLocations: state => state.fetched.locations,
    hasFetchedStates: state => state.fetched.states,
    hasFetchedKnowledgeGraph: state => state.fetched.knowledgeGraph,
    hasFetchedSchools: state => state.fetched.schools,
    hasFetchedDepartments: state => state.fetched.departments,
    hasFetchedGradeClasses: state => state.fetched.gradeClasses,
    hasFetchedDegrees: state => state.fetched.degrees,
    isUpdatedPassword: state => state.password_progress,
    hasFetchedClassGroups: state => state.fetched.classGroups,
    hasFetchedCurricula: state => state.fetched.curricula,
    isFetchingLocations: state => state.fetching.locations,
    isFetchingStates: state => state.fetching.states,
    isFetchingKnowledgeGraph: state => state.fetching.knowledgeGraph,
    isFetchingSchools: state => state.fetching.schools,
    isFetchingDepartments: state => state.fetching.departments,
    isFetchingGradeClasses: state => state.fetching.gradeClasses,
    isFetchingDegrees: state => state.fetching.degrees,
    isFetchingClassGroups: state => state.fetching.classGroups,
    isFetchingCurricula: state => state.fetching.curricula,
    locationsByState: state => st => {
      if (st) return state.locations.filter(l => l.state_id == st.id);
      return [];
    },
    locationsByStateId: state => id => {
      if (id) return state.locations.filter(l => l.state_id == id);
      return [];
    },
  },
  actions: {
    getLocations({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "locations");
      return axios
        .get(API + "global/locations")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "locations", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "locations");
        });
    },
    getStates({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "states");
      return axios
        .get(API + "global/states")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "states", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "states");
        });
    },
    getDegrees({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "degrees");
      return axios
        .get(API + "global/degrees")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "degrees", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "degrees");
        });
    },
    getKnowledgeGraph({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "knowledgeGraph");
      return axios
        .get(API + "global/knowledge-tree")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "knowledgeGraph", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "knowledgeGraph");
        });
    },
    getSchools({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "schools");
      return axios
        .get(API + "global/schools")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "schools", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "schools");
        });
    },
    getDepartments({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "departments");
      return axios
        .get(API + "global/departments")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "departments", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "departments");
        });
    },
    getGradeClasses({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "gradeClasses");
      return axios
        .get(API + "global/grade-classes")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "gradeClasses", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "gradeClasses");
        });
    },
    getClassGroups({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "classGroups");
      return axios
        .get(API + "global/class-groups")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "classGroups", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "classGroups");
        });
    },
    getCurricula({ commit }) {
      commit("START_GENERIC_LOAD_ARRAY", "curricula");
      return axios
        .get(API + "global/curricula")
        .then(({ data: { data } }) => {
          commit("GENERIC_SAVE_ARRAY_ITEM", { name: "curricula", data });
        })
        .catch(() => {
          commit("STOP_GENERIC_LOAD_ARRAY", "curricula");
        });
    }
  },
  namespaced: true
};

export default store;
