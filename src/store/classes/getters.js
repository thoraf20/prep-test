export default {
  session_classes: state => state.classes,
  session_class_by_id: ({ classes }) => id => classes.find(c => c.id === id),
  cycle_logs: state => state.cycle_logs,
};
