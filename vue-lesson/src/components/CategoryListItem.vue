<template>
  <div class="forum-list">

    <h2 class="list-title">
      <router-link :to="{name:'Category',params:{id:category['.key'] }}" class="text-xlarge">
        {{category.name}}
      </router-link>
    </h2>
    <ForumList :forums="categoryForums"></ForumList>

  </div>
</template>

<script>

  import ForumList from './ForumList'

  export default {
    components: {ForumList},
    props: {
      category: {
        required: true,
        type: Object
      }
    },
    computed: {
      categoryForums() {
        return Object.values(this.$store.state.forums)
          .filter(forums => forums.categoryId === this.category['.key'])
      }
    },
    name: 'CategoryListItem'
  }
</script>

<style scoped>

</style>
