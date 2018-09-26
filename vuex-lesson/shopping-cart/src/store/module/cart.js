import shop from "@/api/shop"
export default {
  namespaced:true,
  state:{
    items: [],
    checkoutStatus:null
  },
  getters:{
    cartProduct(state,getters,rootState,rootGetters) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters) {
      return getters.cartProduct.reduce((total, product) => total += product.price * product.quantity, 0)
    },
  },
  mutations:{
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },

    setCheckoutStatus(state, status){
      state.checkoutStatus = status
    },
    emptyCart(state){
      state.items= []
    }
  },
  action:{
    checkout({state, commit,rootState,rootGetters})
    {
      shop.buyProducts(
        state.items,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  }

}
