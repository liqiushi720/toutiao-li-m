import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由映射数组
const routes = [
  {
    path: '/article/:articleId',
    // path: '/article',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }, {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]
// 实例化路由对象
const router = new VueRouter({
  routes
})

export default router
