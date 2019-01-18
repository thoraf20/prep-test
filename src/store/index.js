import profile from './profile';

import { user } from './user/store';
import { tests } from './tests/store';
import { classes } from './classes/store';
import { tickets } from './tickets/store';
import { earnings } from './earnings/store';
import { subjects } from './subjects/store';
import { invoices } from './invoices/store';

export default {
  modules: {
    user, profile, tests, subjects, classes, tickets, earnings, invoices,
  },
};
