<template>
  <div>
    <div class="col-full">
      <CategoryListItem
        v-for="category in categories"
        :category="category"
        :key="category['.key']"></CategoryListItem>
    </div>
  </div>
</template>

<script>

  import CategoryListItem from './CategoryListItem'

  export default {
    name: 'CategoryList',
    components: {CategoryListItem},
    computed: {
      categories() {
        return Object.values(this.$store.state.categories)
      }
    }
  }
</script>

<style scoped>

</style>
