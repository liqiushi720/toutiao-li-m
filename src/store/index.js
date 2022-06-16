import Vue from 'vue'
import Vuex from 'vuex'
import { setItems, getItems } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_TOUTIAO = 'TOKEN_LOGIN'
export default new Vuex.Store({
  state: {
    // token: JSON.parse(window.localStorage.getItem(TOKEN_TOUTIAO))
    token: getItems(TOKEN_TOUTIAO)
  },
  getters: {
  },
  mutations: {
    setItem (state, playload) {
      state.token = playload
      // localStorage.setItem(TOKEN_TOUTIAO, JSON.stringify(state.token))
      setItems(TOKEN_TOUTIAO, state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
