/* eslint-disable no-new */
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueAuth from "@websanova/vue-auth";
import VeeValidate from "vee-validate";
import VCalendar from 'v-calendar';
import Echo from 'laravel-echo';

Vue.router = router;

window.Pusher = require('pusher-js');

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'v-calendar/lib/v-calendar.min.css';
import "./assets/css/global.css";
import Vuex, { Store } from "vuex";
import configureStore from "@/store";
import { getParameterByName, setCookie } from "./lib/utils";
import VueAnalytics from "vue-analytics";

Vue.use(VueAnalytics, {
  id: "UA-42664626-1",
  router
});
Vue.use(VCalendar, {
  firstDayOfWeek: 1
})
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
window.setCookie = setCookie;
if (getParameterByName("__token", window.location.href)) {
  window.localStorage.setItem(
    "default_auth_token",
    getParameterByName("__token", window.location.href)
  );
  setCookie("rememberMe", false, 30);
}

Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.use(VueAuth, {
  auth: require("@websanova/vue-auth/drivers/auth/bearer"),
  rolesVar: "roles_list",
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x"),
  loginData: {
    url: BASE_API + "/v1/client/login",
    fetchUser: true,
    method: "POST"
  },
  logoutData: {
    url: BASE_API + "/v1/client/logout",
    method: "GET"
  },
  refreshData: {
    url: BASE_API + "/v1/tutor/refresh",
    method: "GET",
    enabled: true,
    error: err => {
      $vm.$auth.logout();
    },
    success: data => {
    },
    done: data => {

    },
    interval: 30
  },
  registerData: {
    url: BASE_API + "/v1/tutor/register",
    autoLogin: true,
    method: "POST"
  },
  fetchData: {
    url: BASE_API + "/v1/client/user",
    method: "GET",
    enabled: true,
    success({
      data: {
        data: { client_password_status }
      }
    }) {
      $vm.$store.commit("profile/SET_PROGRESS", client_password_status);
    }
  },
  forbiddenRedirect: "/403",
  parseUserData: res => res.data
});

Vue.use(Vuex);

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: PUSHER_APP_KEY,
  cluster: 'eu',
  encrypted: true
});

const $vm = new Vue({
  el: "#app",
  router,
  store: new Store(configureStore),
  template: "<App/>",
  components: { App }
});
