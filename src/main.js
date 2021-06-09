import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.$axios = axios;

import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

import store from './store';
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


