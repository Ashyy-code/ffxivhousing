import { createRouter, createWebHistory } from 'vue-router'

//Views
import Landing from '../views/Landing.vue';
import ViewItem from '../views/ViewItem.vue';
import Search from '../views/Search.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/view/:id',
      name: 'viewItem',
      component: ViewItem
    },
    {
      path:'/search',
      name:'Search',
      component: Search
    }
  ]
})

export default router
