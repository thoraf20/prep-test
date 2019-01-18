import axios from 'axios';

const API = `${BASE_API}/v1`;

export default {
  getInvoices({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/invoices`)
        .then(({ data: { data } }) => {
          commit('SET_TUTOR_INVOICES', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
};
