import Vue from 'vue'
import App from './App.vue'
import './plugins/plugins'
import './assets/main.css'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/index'

//router
Vue.use(VueRouter)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
