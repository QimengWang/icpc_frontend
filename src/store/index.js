import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: ''
  },
  mutations: {
    saveStatus(state, status) {
      state.status = status;
    }
  },
  actions: {
  },
  modules: {
  }
})
