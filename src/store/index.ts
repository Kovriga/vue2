import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'd72e61958109419485d4a9f72190e9d5',
    locationArray: [],
    dataArray: []
  },
  getters: {
  },
  mutations: {
    getToken(state, token: string) {
      state.token = token
    },

    getLocationArray(state, array: any) {
      state.locationArray = array
    },

    getDataArray(state, array: any) {
      state.dataArray = array
    }
  },
  actions: {
  },
  modules: {
  }
})
