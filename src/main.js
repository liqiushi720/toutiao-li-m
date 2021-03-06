import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式  【增加这一句】
import './styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'
// 在main.js中加载执行flexible模块
import 'amfe-flexible'
import dayjs from './utils/dayjs'
Vue.use(Vant)
Vue.filter('relativeTime', values => dayjs().to(dayjs(values)))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
