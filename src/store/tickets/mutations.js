export default {
  SET_TUTOR_TICKETS(state, array) {
    state.tickets = array;
  },
  SET_CLASS_TICKETS(state, array) {
    state.class_tickets = array;
  },
  SET_TICKET(state, object) {
    state.ticket = object;
  },
  SET_TICKET_COMMENT(state, object) {
    state.ticket.comments.push(object);
  },
  ADD_TO_CLASS_TICKETS(state, object) {
    state.class_tickets.push(object);
  },
  SET_CATEGORIES(state, array) {
    state.categories = array;
  },
};
