import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')

