import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'
import RepoView from '../views/RepoView.vue'

const routes = [
   {
      path: '/',
      name: 'Search',
      component: SearchView
   },
   {
      // Paramaters are passed from button click event
      path: '/viewrepo/:ownersName/:name',
      name: 'ViewRepo',
      component: RepoView,
      props: true
   }
]

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
})

export default router
