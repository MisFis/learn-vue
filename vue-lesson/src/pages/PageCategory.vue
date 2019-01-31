<template>
  <div class="category-container">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{category.name}}</h1>
          <p class="text-lead">{{category.slug}}</p>
        </div>
      </div>
    </div>
    <div class="col-full push-top">
      <CategoryListItem :category="category"/>
    </div>
  </div>
</template>

<script>
  import CategoryListItem from '../components/CategoryListItem'

  export default {
    name: 'PageCategory',
    components: {CategoryListItem},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      category() {
        return this.$store.state.categories[this.id]
      }
    }
  }
</script>

<style scoped>
  .category-container {
    width: 100%
  }
</style>
