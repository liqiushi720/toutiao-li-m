import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由映射数组
const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}, {
  path: '/',
  component: () => import('@/views/layout')
}]
// 实例化路由对象
const router = new VueRouter({
  routes
})

export default router
