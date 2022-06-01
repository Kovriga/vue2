import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '6c0b34cce44846eb9675c8a8d814ec78'
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
