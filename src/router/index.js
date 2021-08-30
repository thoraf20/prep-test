import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/components/404';
import LandingPage from '@/components/LandingPage/LandingPage';
import LandingPage1 from '@/components/LandingPage/LandingPage1';
import LandingPage2 from '@/components/LandingPage/LandingPage2';
import Login from '@/components/Auth/Login';
import Forgot from '@/components/Auth/Forgot';
import Layout from '@/components/Layout/Index';
import Test from '@/components/Pages/Test/Test';
import Register from '@/components/Auth/Register';
import Setup from '@/components/Pages/Setup/Index';
import ResetPassword from '@/components/Auth/Reset';
import TestIndex from '@/components/Pages/Test/Index';
import Status from '@/components/Pages/Profile/Status';
import Profile from '@/components/Pages/Profile/Index';
import TakeTest from '@/components/Pages/Test/TakeTest';
import BasicSetup from '@/components/Pages/Setup/Basic';
import ReviewTutor from '@/components/Pages/Review/Tutor';
import Dashboard from '@/components/Pages/Dashboard/Index';
import EditWork from '@/components/Pages/Profile/EditWork';
import EditBasic from '@/components/Pages/Profile/EditBasic';
import EditAbout from '@/components/Pages/Profile/EditAbout';
import AcademicSetup from '@/components/Pages/Setup/Academic';
import Media from '@/components/Pages/Profile/ProfilePicture';
import HomeDashboard from '@/components/Pages/Dashboard/Home';
import JobsDashboard from '@/components/Pages/Dashboard/Jobs';
import AllTickets from '@/components/Pages/Tickets/AllTickets';
import PreviewProfile from '@/components/Layout/PreviewProfile';
import EducationSetup from '@/components/Pages/Setup/Education';
import ClassTicket from '@/components/Pages/Tickets/ClassTicket';
import Credentials from '@/components/Pages/Profile/Credentials';
import EditSocials from '@/components/Pages/Profile/EditSocials';
import EditProfile from '@/components/Pages/Profile/EditProfile';
import TestComponent from '@/components/Pages/Test/TestComponent';
import CycleLogs from '@/components/Pages/ClassSession/CycleLogs';
import HowItWorksSetup from '@/components/Pages/Setup/HowItWorks';
import ClassTickets from '@/components/Pages/Tickets/ClassTickets';
import TutorTickets from '@/components/Pages/Tickets/TutorTickets';
import EditLocation from '@/components/Pages/Profile/EditLocation';
import Verification from '@/components/Pages/Profile/Verification';
import EditTeaching from '@/components/Pages/Profile/EditTeaching';
import TutorClass from '@/components/Pages/ClassSession/TutorClass';
import ClassesDashboard from '@/components/Pages/Dashboard/Classes';
import ProfileDashboard from '@/components/Pages/Dashboard/Profile';
import EditEducation from '@/components/Pages/Profile/EditEducation';
import VerificationSetup from '@/components/Pages/Setup/Verification';
import EarningsDashboard from '@/components/Pages/Dashboard/Earnings';
import InvoicesDashboard from '@/components/Pages/Dashboard/Invoices';
import TutorClasses from '@/components/Pages/ClassSession/TutorClasses';
import DayAvailability from '@/components/Pages/Profile/DayAvailabiltity';
import UpdatePassword from '@/components/Pages/Profile/UpdatePassword';
import UpdateProfile from '@/components/Pages/Profile/UpdateProfile';
import TestStatus from '@/components/Pages/Profile/AcademicInfo/TestStatus';
import TutoringJobs from '@/components/Pages/TutoringJobs/TutoringJobs';
import TutoringJob from '@/components/Pages/TutoringJobs/TutoringJob';
import PersonalInfo from '@/components/Pages/Dashboard/partials/PersonalInfo';
import AcademicInfo from '@/components/Pages/Dashboard/partials/AcademicInfo';
import EducationalInfo from '@/components/Pages/Dashboard/partials/EducationalInfo';
import SubjectAbility from '@/components/Pages/Profile/AcademicInfo/SubjectsAbility';
import AllSubjectProfiles from '@/components/Pages/Profile/AcademicInfo/AllSubjectProfiles';
import EditSubjectProfile from '@/components/Pages/Profile/AcademicInfo/EditSubjectProfile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/academy',
      name: 'landing-page',
      component: LandingPage,
    },
    {
      path: '/ltu',
      name: 'landing',
      component: LandingPage2,
    },
    {
      path: '/tmp',
      name: 'landing',
      component: LandingPage1,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: Forgot,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword,
    },
    {
      path: '',
      name: 'layout',
      meta: { auth: true },
      redirect: 'home-dashboard',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          redirect: 'dashboard/home',
          component: Dashboard,
          children: [
            {
              path: 'home',
              name: 'home-dashboard',
              component: HomeDashboard,
            },
            {
              path: 'payouts',
              name: 'earnings-dashboard',
              component: EarningsDashboard,
            },
            {
              path: 'invoices',
              name: 'invoices-dashboard',
              component: InvoicesDashboard,
            },
            {
              path: 'update-password',
              name: 'update-password',
              component: UpdatePassword,
            },
            {
              path: 'update-profile',
              name: 'update-profile',
              component: UpdateProfile,
            },
            {
              path: 'classes',
              name: 'classes-dashboard',
              component: ClassesDashboard,
              redirect: 'classes/all',
              children: [
                {
                  path: 'all',
                  name: 'tutor-classes',
                  component: TutorClasses,
                },
                {
                  path: ':id',
                  name: 'tutor-class',
                  component: TutorClass,
                  props: true,
                },
                {
                  path: ':id/logs',
                  name: 'class-logs',
                  component: CycleLogs,
                  props: true,
                },
              ],
            },
            {
              path: 'tickets',
              name: 'tickets-dashboard',
              component: TutorTickets,
              redirect: 'tickets/all',
              children: [
                {
                  path: 'all',
                  name: 'all-tickets',
                  component: AllTickets,
                },
                {
                  path: 'class/:id',
                  name: 'class-tickets',
                  component: ClassTickets,
                  props: true,
                },
                {
                  path: ':id',
                  name: 'class-ticket',
                  component: ClassTicket,
                  props: true,
                },
              ],
            },
            {
              path: 'jobs',
              name: 'jobs-dashboard',
              component: JobsDashboard,
              redirect: 'jobs/tutoring-jobs',
              children: [
                {
                  path: 'tutoring-jobs',
                  name: 'tutoring-jobs',
                  component: TutoringJobs,
                },
                {
                  path: 'tutoring-jobs/:id',
                  name: 'tutoring-job',
                  component: TutoringJob,
                },
              ],
            },
            {
              path: 'profile',
              name: 'profile-dashboard',
              component: ProfileDashboard,
              redirect: 'profile/personal-info',
              children: [
                {
                  path: 'personal-info',
                  name: 'personal-info-profile-dashboard',
                  component: PersonalInfo,
                },
                {
                  path: 'educational-info',
                  name: 'educational-info-profile-dashboard',
                  component: EducationalInfo,
                },
                {
                  path: 'verification',
                  name: 'verification-profile-dashboard',
                  component: VerificationSetup,
                },
                {
                  path: 'academic-info',
                  name: 'academic-info-profile-dashbard',
                  component: AcademicInfo,
                },
              ],
            },
          ],
        },
        {
          path: 'review/:t',
          name: 'review-tutor',
          component: ReviewTutor,
          props: true,
        },
      ],
    },
    {
      path: '/preview/:tutor',
      name: 'preview-profile',
      component: PreviewProfile,
      props: true,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
  // base: 'tutors/',
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
});
