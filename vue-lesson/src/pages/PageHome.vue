<template>
  <!--  <div class="col-full">
    <h1>Добро пожаловать на форум</h1>
      <ForumList :forums="forums"/>
    </div>-->
  <div class="col-full push-top">
    <h1>Обсуждения</h1>
    <CategoryList/>
  </div>
</template>

<script>
  import CategoryList from '../components/CategoryList'

  export default {
    components: {CategoryList},
    computed: {
      categories() {
        return Object.values(this.$store.state.categories)
      }
    },
    beforeCreate() {
      this.$store.dispatch('fetchAllCategories')
        .then(categories => {
          categories.forEach(category => this.$store.dispatch('fetchForums', {ids: Object.keys(category.forums)}))
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
