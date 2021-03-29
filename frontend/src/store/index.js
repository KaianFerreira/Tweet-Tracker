import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { setToken } from '../libs/util'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    openMenu: false
  },
  mutations: {
    user (state, value) { state.user = value },
    openMenu (state, value) { state.openMenu = value }
  },
  actions: {
    // save user data on state for future uses and then redirect to homepage
    async signIn (store, data) {
      store.commit('user', data.user)
      setToken(data.token)
      router.replace('/')
    }
  },
  modules: {
  }
})
