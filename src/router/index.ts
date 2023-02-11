import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/write-tweet',
    name: 'writeTweet',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/writeTweetView.vue')
  },
  {
    path: '/:name',
    name: 'profile',
    //beforeEnter: [haveRoleGuard],
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    props: (route) => {
      const name = route.params.name
      return name ?  { name} : { name: null }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
