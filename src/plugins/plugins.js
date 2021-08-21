import 'es6-promise/auto'
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueTailwind from 'vue-tailwind'
import tailwind from './tailwind'

Vue.use(VueTailwind, tailwind)
// State/Store
Vue.use(Vuex)
// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.VUE_API_URL}`