import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/PageHome'
import PageThreadShow from '@/pages/PageThreadShow'
import Forum from '@/pages/PageForum'
import Category from '@/pages/PageCategory'
import Profile from '@/pages/PageProfile'
import PageNotFound from '@/pages/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/thread/:id',
      name: 'PageThreadShow',
      component: PageThreadShow,
      props: true
    },
    {
      path: '/me',
      name: 'PageProfile',
      component: Profile,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true
    },

    {
      path: '*',
      name: 'NotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'
})
