<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="(product,index) in products" :key="index">
        {{product.title}} - {{product.price | currency}}- {{product.quantity}}
      </li>
    </ul>
    <p>Всего: {{total | currency}}</p>
    <button @click="checkout">Проверить наличие</button>
    <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'

  export default {
    name: "ShoppingCart",
    computed:{
      ...mapGetters('cart',{
        products: 'cartProduct',
        total:'cartTotal'
      }),
      ...mapState('cart',{
        checkoutStatus:state=> state.items.checkoutStatus
      })
    },
    methods:{
      ...mapActions(['checkout'])
    }
  }
</script>

<style scoped>

</style>
