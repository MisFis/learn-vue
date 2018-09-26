<template>
<!--  <div class="col-full">
  <h1>Добро пожаловать на форум</h1>
    <ForumList :forums="forums"/>
  </div>-->
  <div class="col-full push-top">
    <h1>Обсуждения</h1>
    <CategoryList />
  </div>
</template>

<script>
import CategoryList from '../components/CategoryList'

export default {
  components: {CategoryList},
  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
