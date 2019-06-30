import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = true

Vue.use(Vuetify, {
  iconfont: 'fa'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
