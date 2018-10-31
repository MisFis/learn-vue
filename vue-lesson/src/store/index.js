import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'L664y3qZSubDbT1R6npC0EEybJ73'
  },
  getters: {
    authUser (state) {
      return state.users[state.authId]
    }
  },
  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', {post, postId})
      commit('appendPostToThread', {threadId: post.threadId, postId})
      commit('appendPostToUser', {userId: post.userId, postId})
    },
    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise ((resolve) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const thread = {forumId, title, publishedAt, userId, '.key': threadId}

        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {forumId, threadId})
        commit('appendThreadToUser', {userId, threadId})

        dispatch('createPost', {text, threadId})
        resolve(state.threads[threadId])
      })

    },
    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user})
    }
  },
  mutations: {
    setPost (state, {postId, post}) {
      Vue.set(state.posts, postId, post)
    },
    setUser (state, {userId, user}) {
      Vue.set(state.user, userId, user)
    },
    setThread (state, {threadId, thread}) {
      Vue.set(state.threads, threadId, thread)
    },
    appendPostToThread (state, {threadId, postId}) {
      const thread = state.threads[threadId]
      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }
      Vue.set(thread.posts, postId, postId)
    },
    appendPostToUser (state, {userId, postId}) {
      const user = state.users[userId]
      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }
      Vue.set(user.posts, postId, postId)
    },
    appendThreadToForum (state, {forumId, threadId}) {
      const forum = state.forums[forumId]
      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }
      Vue.set(forum.threads, threadId, threadId)
    },
    appendThreadToUser (state, {userId, threadId}) {
      const user = state.users[userId]
      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }
      Vue.set(user.posts, threadId, threadId)
    }
  }
})
