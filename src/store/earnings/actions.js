import axios from 'axios';

const API = `${BASE_API}/v1`;

export default {
  getEarnings({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/earnings`)
        .then(({ data: { data } }) => {
          commit('SET_TUTOR_EARNINGS', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
};
