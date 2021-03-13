// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './icons' // icon 引入icons文件夹下所有的icon


import '@/mockjs' // mock数据

import '@/permission' // permission control

import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})




// i18n国际化
import i18n from "@/lang";


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n, // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  components: { App },
  template: '<App/>'
})
