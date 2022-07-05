import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    // redirect: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/Find')
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/News')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/favorate',
    name: 'favorate',
    component: () => import('@/views/Favorate')
  },
  {
    path: '/rent',
    name: 'rent',
    component: () => import('@/views/Rent')
  },
  {
    path: '/area',
    name: 'area',
    component: () => import('@/views/area')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/house')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/map')
  },
  {
    path: '/rent/add',
    name: 'add',
    component: () => import('@/views/add')
  },
  {
    path: '/rent/search',
    name: 'search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
