import axios from 'axios';

const API = `${BASE_API}/v1`;

export default {
  getAllTests({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/tutor/tests`)
        .then((response) => {
          commit('SET_TEST_STATUS', response.data.data);
          resolve();
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  getSubjectTest({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/tutor/tests/${data.abilitySubject}/take`)
        .then((response) => {
          commit('SET_ACTIVE_TEST', response.data.data);
          commit('SET_TEST_ANSWERS', response.data.data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
  submitAnswers({ state }) {
    const keys = Object.keys(state.test_answers);
    const values = Object.values(state.test_answers);
    const answers = {};

    for (let i = keys.length - 1; i >= 0; i -= 1) {
      answers[keys[i]] = { answer_id: values[i] };
    }

    return new Promise((resolve, reject) => {
      axios.post(`${API}/tutor/tests/${state.test_subject}/${state.activeTest.id}/submit`, { answers })
        .then(response => resolve(response.data.message))
        .catch(error => reject(error.response));
    });
  },
  startCountdown({ state, commit }, data) {
    function updateTime(data) {
      commit('SET_TIME_LEFT', data);
      setTimeout(function () {
        if (data > 0 && state.time_left != 0) {
          updateTime(data - 1);
        }
      }, 1000);
    }
    updateTime(data);
  },
  updateNotifications({ state }, notifications) {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/tutor/notifications/read`, { notifications })
        .then(response => resolve(response.data.message))
        .catch(error => reject(response.error));
    });
  },
};
