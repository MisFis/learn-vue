import shop from "@/api/shop"

export default {
  addProductToCard({state, getters, commit,rootState,rootGetters}, product)
  {
    if (rootGetters['products/productInStock'](product)) {
      const cartItem = rootState.cart.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('cart/pushProductToCart', product.id)
      } else {
        commit('cart/incrementItemQuantity', cartItem)
      }
      commit('products/decrementProductInventory', product)
    }

  }

}
