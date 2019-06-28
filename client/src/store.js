import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    getUser (state, payload) {
      state.name = localStorage.getItem('name');
      state.playerId = localStorage.getItem('playerId');
    },
    register (state, payload) {
      console.log('test')
      state.name = payload;
      state.playerId = state.name + String(Math.floor(Math.random() * 100000));
      localStorage.setItem('name', state.name);
      localStorage.setItem('playerId', state.playerId);
    },
  },
  actions: {

  }
})
