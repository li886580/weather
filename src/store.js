import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 定義一個新的 Vue Store
const store = new Vuex.Store({
    state: {
      isLoading: false,
      city: {id: 7, cityName: "高雄市", sid: 15},
      citys: require('../static/citys.json'),
      time: {
        year: null,
        month: null,
        selectDate: {
          year: null,
          month: null,
          day: null
        }
      },
      info: null,
      star: require('../static/star.json'),
    },
    mutations: {
      // 將state設定為參數
      Loaded(state) {
        // state的isLoading true/false 互轉
        state.isLoading = !state.isLoading
      }
    }

})
export default store;