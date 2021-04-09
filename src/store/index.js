import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: sessionStorage.getItem('status'),
    email: sessionStorage.getItem('email')
  },
  mutations: {
    saveStatus(state, status) {
      state.status = status;
      sessionStorage.setItem('status', status);
    },
    saveEmail(state, name) {
      state.email = name;
      sessionStorage.setItem('email', name);
    }
  },
  actions: {
  },
  modules: {
  }
})
