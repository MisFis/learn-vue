<template>
  <div class="thread">
    <div>
      <p>
        <router-link :to="{name: 'PageThreadShow',params:{id: thread['.key']}}">
          {{thread.title}}
        </router-link>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{user.name}}</a>,<AppDate :timestamp="thread.publishedAt"/>
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{repliesCount}} ответов
      </p>
  <!--    <img :src="thread.img" alt="avatar-medium">-->

    </div>
  </div>
</template>

<script>
  import {countObjectProperties} from '@/utils/index'
export default {
  name: 'ThreadListItem',
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  computed: {
    repliesCount () {
      return countObjectProperties(this.thread.posts) - 1
    },
    user () {
      return this.$store.state.users[this.thread.userId]
    }
  }
}
</script>

<style scoped>

</style>
