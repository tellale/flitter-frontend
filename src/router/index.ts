import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
