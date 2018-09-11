
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import i18n from '@/utils/i18n'
import ElementUI from 'element-ui'
import store from '@/store'
import axios from '@/axios'
import '@/assets/css/theme-default.scss'


Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
	store,
	axios,
  router,
  components: { App },
  template: '<App/>'
})
