import axios from 'axios';

const API = `${BASE_API}/v1`;

export default {
  getClasses({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/session-classes?sort=intended_start_date%7Casc,created_at%7Cdesc&per_page=20&simple=true&with=learners,learners.subjects,learners.learnerSubjects.goal,learners.learnerSubjects.subject,learners.schoolClass,learners.school,client,tutor,subjects,status,days`)
        .then(({ data: { data } }) => {
          commit('SET_SESSION_CLASSES', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
  getCycleLogs({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/cycles`)
        .then(({ data: { data } }) => {
          commit('SET_CYCLE_LOGS', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
};
