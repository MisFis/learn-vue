<template>
  <div v-if="thread && user" class="col-large push-top">
    <h1>
      {{thread ? thread.title : ''}}
      <router-link :to="{name:'ThreadEdit',params:{id: this.id }}"
                   class="btn-green btn-small"
                   tag="button">
        Edit Thread
      </router-link>
    </h1>

    <p>
      By <a href="" class="link-unstyled">{{user ? user.name : ''}}</a>
      <AppDate :timestamp="thread ? thread.publishedAt : 0"/>
      <span
        class="hide-mobile text-faded text-small"> {{repliesCount}} replies by {{contributorsCount}} contributors</span>
    </p>

    <PostList :posts="posts"></PostList>
    <PostEditor :threadId="id"></PostEditor>
  </div>
</template>

<script>
  import firebase from 'firebase'

  import PostList from '../components/PostList'
  import PostEditor from '../components/PostEditor'
  import {countObjectProperties} from "../utils";

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
    data() {
      return {}
    },
    computed: {
      thread() {
        return this.$store.state.threads[this.id]
      },
      posts() {
        const postsIds = Object.values(this.thread.posts)
        return Object.values(this.$store.state.posts)
          .filter(post => postsIds.includes(post['.key']))
      },

      user() {

        return this.$store.state.users[this.thread.userId]
      },

      contributorsCount() {
        /*        indexOf
const replaces = Object.keys(this.thread.posts)
          .filter(postId => postId !== this.thread.firstPostId)
          .map(postId => this.$store.state.posts[postId])

        const userIds = replaces.map(post => post.userId)
        return userIds.filter((item, index) => userIds.indexOf(item) === index).length*/
        return countObjectProperties(this.thread.contributors)
      },
      repliesCount() {
        return this.$store.getters.threadRepliesCount(this.thread['.key'])
      },
    },
    methods: {},
    created() {
      // fetch thread
      this.$store.dispatch('fetchThread', {id: this.id})
        .then(thread => {
          // fetch user
           this.$store.dispatch('fetchPosts', {ids: Object.keys(thread.posts)})
             .then(posts => {
               posts.forEach(post => {
                 this.$store.dispatch('fetchUser', {id: post.userId})
               })
             })
        })


    }
  }
</script>

<style scoped>

</style>
