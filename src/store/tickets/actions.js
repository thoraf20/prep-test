import axios from 'axios';

const API = `${BASE_API}/v1`;
export default {
  getTickets({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/tickets`)
        .then(({ data: { data } }) => {
          commit('SET_TUTOR_TICKETS', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
  getClassTickets({ commit }, classId) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/tickets/class/${classId}`)
        .then(({ data: { data } }) => {
          commit('SET_CLASS_TICKETS', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
  getTicket({ commit }, ticketId) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/tickets/${ticketId}`)
        .then(({ data: { data } }) => {
          commit('SET_TICKET', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
  addComment({ commit }, object) {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/client/tickets/${object.ticket}`, { message: object.comment })
        .then(({ data: { message } }) => {
          commit('SET_TICKET_COMMENT', message);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
  makeTicket({ commit }, object) {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/client/tickets`, { ...object })
        .then(({ data: { data } }) => {
          commit('ADD_TO_CLASS_TICKETS', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
  getCategories({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API}/client/tickets/categories`)
        .then(({ data: { data } }) => {
          commit('SET_CATEGORIES', data);
          resolve();
        })
        .catch(error => reject(error.response));
    });
  },
};
