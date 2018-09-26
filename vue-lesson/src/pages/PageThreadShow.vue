<template>
  <div class="col-large push-top">
    <h1>{{thread.title}}</h1>
    <p>
      <a href=""></a> <AppDate :timestamp="thread.publishedAt"/>
      <span></span>
    </p>

    <PostList :posts="posts"></PostList>
    <PostEditor :threadId="id"></PostEditor>
  </div>
</template>

<script>
import sourceData from '@/data'
import PostList from '@/components/PostList'
import PostEditor from '../components/PostEditor'

export default {
  components: {
    PostEditor,
    PostList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      thread: sourceData.threads[this.id]

    }
  },
  computed: {
    posts () {
      const postsIds = Object.values(this.thread.posts)
      return Object.values(sourceData.posts)
        .filter(post => postsIds.includes(post['.key']))
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
