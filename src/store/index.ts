import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '3c0b22cd29b143c38d8eee69527b1985',
    locationArray: []
  },
  getters: {
  },
  mutations: {
    getToken(state, token: string) {
      state.token = token
    },
    getLocationArray(state, array: any) {
      state.locationArray = array
    }
  },
  actions: {
  },
  modules: {
  }
})
