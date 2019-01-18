import axios from 'axios';

const API = `${BASE_API}/v1`;

export default {
  getSubjects({ commit }) {
    axios.get(`${API}/global/subjects`)
      .then(response => commit('SET_SUBJECTS', response.data.data))
      .catch(error => console.trace(error));
  },
  getClassGroups({ commit }) {
    axios.get(`${API}/global/class-groups`)
      .then((response) => {
        console.log(response);
        commit('SET_CLASSGROUPS', response.data.data);
      })
      .catch(error => console.trace(error));
  },
};
