import Vue from 'vue'
import VueRouter from 'vue-router'

import Weather from './components/Weather.vue'
import WeatherDetail from './components/Weather-Detail.vue'

Vue.use(VueRouter)

export default new VueRouter({

  routes: [
    {path: '/', component: Weather, name: 'Weather'},
    {path: '/WeatherDetail', component: WeatherDetail, name:'WeatherDetail'}
  ]
})