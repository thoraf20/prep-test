export default {
  subjects_loaded: state => state.subjects_loaded,
  subjects: state => state.subjects,
  subjectById: state => id => state.subjects.find(subject => subject.id === id),
  subjectProfile: state => id => state.subject_profiles.find(profile => profile.abilitySubject.id === id),
  classgroups: state => state.classgroups,
  classgroupById: state => id => state.classgroups.find(classgroup => classgroup.id === id),
};
