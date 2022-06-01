import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
  },
  mutations: {
    getToken(state, token: string) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
