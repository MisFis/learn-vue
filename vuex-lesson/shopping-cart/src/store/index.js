import Vuex from 'vuex'

import Vue from 'vue'
import actions from '@/store/actions'
import cart from './module/cart'
import products from './module/product'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    cart,
    products
  },
  state: { // data
  },
  getters: {//computed properties

  },
  actions,
  mutations: {

  }
})
