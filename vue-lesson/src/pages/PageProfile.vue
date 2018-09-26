<template>
  <div class="flex-grid">
<!--    <UserProfileCard
    :user-posts-count="userPostsCount"
    :user-threads-count="userThreadsCount"
    :user="user"
    />-->
    <UserProfileCardEditor
    :user-posts-count="userPostsCount"
    :user-threads-count="userThreadsCount"
    :user="user"
    />

    <div class="col-7 push-top">

      <div class="profile-header">
                  <span class="text-lead">
                      Joker's recent activity
                  </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <PostList :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import PostList from '../components/PostList'
import {mapGetters} from 'vuex'
import {countObjectProperties} from '@/utils/index'
import UserProfileCard from '../components/UserProfileCard'
import UserProfileCardEditor from '../components/UserProfileCardEditor'

export default {
  name: 'PageProfile',
  components: {UserProfileCard, PostList, UserProfileCardEditor},
  computed: {
    ...mapGetters({
      user: 'authUser'
    }),
    userThreadsCount () {
      return countObjectProperties(this.user.threads)
    },
    userPostsCount () {
      return countObjectProperties(this.user.posts)
    },
    userPosts () {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
          .filter(post => post.userId === this.user['.key'])
      }
    }
  }
}
</script>

<style scoped>

</style>
