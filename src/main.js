import Vue from 'vue'
import store from './store'

import App from './App.vue'
import Snotify, {SnotifyPosition} from 'vue-snotify'
import 'vue-snotify/styles/material.css'

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Snotify, options)

Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
