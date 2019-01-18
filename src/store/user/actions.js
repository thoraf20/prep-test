import axios from 'axios';

const API = `${BASE_API}/v1`;

export default {
  getUserTutor({ commit }) {
    axios.get(`${API}/client/user`)
      .then(response => commit('SET_USER', response.data.data))
      .catch(error => console.trace(error));
  },
};
