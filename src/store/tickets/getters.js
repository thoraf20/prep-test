export default {
  tutor_tickets: state => state.tickets,
  tutor_ticket_by_id: ({ tickets }) => id => tickets.find(t => t.id === id),
  class_tickets: state => state.class_tickets,
  ticket: state => state.ticket,
  ticket_same_id: ({ ticket }) => id => ticket.id === id,
  ticket_categories: state => state.categories,
};
