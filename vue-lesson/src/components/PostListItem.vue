<template>
  <div class="post">

    <div class="user-info">
      <a href="#">{{user.name}}</a>
      <a href="#">
        <img :src="user.avatar" class="avatar-large" alt="">
      </a>
      <p class="dekstop-only text-small">{{userPostsCount}}</p>
    </div>
    <div class="post-content">
      <div>
        {{post.text}}
      </div>
    </div>
    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt"></AppDate>
    </div>
  </div>
</template>

<script>
import {countObjectProperties} from '@/utils/index'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },
    userPostsCount () {
      return countObjectProperties(this.user.posts)
    }

  },

  name: 'PostListItem'
}
</script>

<style scoped>

</style>
