import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

import { ButtonPlugin } from 'bootstrap-vue'
Vue.use(ButtonPlugin)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
