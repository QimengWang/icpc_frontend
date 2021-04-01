import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    email: ''
  },
  mutations: {
    saveStatus(state, status) {
      state.status = status;
    },
    saveEmail(state, name) {
      state.email = name;
    }
  },
  actions: {
  },
  modules: {
  }
})
