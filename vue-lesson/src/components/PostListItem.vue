<template>
  <div class="post">

    <div class="user-info">
      <a href="#">{{user.name}}</a>
      <a href="#">
        <img :src="user.avatar" class="avatar-large" alt="">
      </a>
      <p class="dekstop-only text-small">{{userPostsCount}} posts</p>
    </div>
    <div class="post-content">
      <template v-if="!editing">
        <div >
          {{post.text}}
        </div>
        <a @click.prevent="editing = true" href="#" class="link-unstyled" style="margin-left: auto"><i class="fa fa-pencil">image pencil</i></a>
      </template>
      <div v-else>
        <PostEditor
          :post="post"
          @save="editing = false"
          @cancel="editing = false"
        />
      </div>

    </div>
    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <AppDate :timestamp="post.publishedAt"></AppDate>
    </div>
  </div>
</template>

<script>
import PostEditor from "./PostEditor";

export default {
  components: {PostEditor},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },
    userPostsCount () {
      return this.$store.getters.userPostsCount(this.post.userId)
    }

  },

  name: 'PostListItem'
}
</script>

<style scoped>

</style>
