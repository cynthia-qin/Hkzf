import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    currentCity: {
      label: '北京',
      value: '"AREA|88cff55c-aaa4-e2e0"'
    }
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.token = payload
    },
    setCurrentCity (state, payload) {
      state.currentCity = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]

})
