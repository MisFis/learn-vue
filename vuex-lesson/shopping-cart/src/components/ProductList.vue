<template>
  <div>
    <h1>Продукты</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/jfPpw0A.gif " alt="">
    <ul v-else>
      <li v-blur-div v-for="(product,index) in products" :key="index">{{product.title}} - {{product.price | currency}}-
        {{product.inventory}}
        <button
          :disabled="!productsInStock(product)"
          @click="addToProductToCart(product)">Add to cart
        </button>
      </li>
    </ul>

  </div>
</template>

<script>

  import {mapState,mapGetters, mapActions} from 'vuex'

  export default {
    directives: {
      'blur-div': {
        inserted: function (el, value) {
          el.setAttribute('tabindex', -1);
          el.addEventListener("focusin", () => el.classList.add('focused'));
          el.addEventListener("focusout", () => el.classList.remove('focused'));
        }
      }
    },
    data() {
      return {
        loading: false
      }
    },
    computed:{
    ...mapState('products',{
      products: state => state.items

    }),
      ...mapGetters('products',{
        productsInStock:'productInStock'
      })
    },
    methods: {
      ...mapActions({
        fetchProducts:'products/fetchProducts',
        addToProductToCart:'addProductToCard',
      })
    },
    created() {
      this.loading = true
      this.fetchProducts()
        .then(() => this.loading = false)
    },
    name: "ProductList"
  }
</script>

<style scoped>
  .focused {
    color: red
  }

  .focused:focus {
    outline: none;
  }
</style>
