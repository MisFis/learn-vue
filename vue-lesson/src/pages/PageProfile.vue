<template>
  <div class="flex-grid">
    <UserProfileCard
      :user="user"
      v-if="!editing"
      @edit="editing = !editing"
    />
    <UserProfileCardEditor
      :user="user"
      v-else
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
  import UserProfileCard from '../components/UserProfileCard'
  import UserProfileCardEditor from '../components/UserProfileCardEditor'

  export default {
    name: 'PageProfile',
    components: {UserProfileCard, PostList, UserProfileCardEditor},
    data: () => {
      return {
        editing: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'authUser'
      }),
      userPosts() {
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
