import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { getToken } from './libs/util'

// importing globally css
import './assets/scss/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const start = async () => {
  try {
    // verify if has a token or not then redirect to login
    // or to home
    if (!getToken()) {
      router.replace('/login')
      store.commit('openMenu', true)
    } else {
      store.commit('user', getToken())
      router.replace('/')
    }
  } catch (error) {
    console.log(error)
    router.replace('/login')
  }
}

start()
