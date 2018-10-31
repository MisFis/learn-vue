<template>
  <div class="forum-container">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <router-link :to="{name: 'ThreadCreate', params: {forumId: this.forum['.key']}}"
                     class="btn-green btn-small"
        >
          Start Thread
        </router-link>
      </div>
    </div>
    <div class="col-full push-top">
      <ThreadList :threads="threads"/>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data'
import ThreadList from '../components/ThreadList'
export default {
  name: 'PageForum',
  components: {ThreadList},
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forum () {
      return sourceData.forums[this.id]
    },
    threads () {
      return Object.values(sourceData.threads)
        .filter(thread => thread.forumId === this.id)
    }
  }
}
</script>

<style scoped>
  .forum-container{
    width: 100%
  }
</style>
