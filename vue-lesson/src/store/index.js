import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'
import {countObjectProperties} from "../utils";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'L664y3qZSubDbT1R6npC0EEybJ73'
  },
  getters: {
    authUser (state) {
      return state.users[state.authId]
    },
    userPostsCount: state => (id) => countObjectProperties(state.users[id].posts),
    userThreadsCount: state => (id) => countObjectProperties(state.users[id].threads),
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
      return Promise.resolve(state.posts[postId])
    },
    updatePost ({commit, state}, {id, text}) {
      return new Promise((resolve, reject) => {
          const post = state.posts[id]
          commit("setPost", {
            postId: id,
            post: {
              ...post,
              text,
              edited: {
                at: Math.floor(Date.now() / 1000),
                by: state.authId
              }
            },

          })
          resolve(post)
      })
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
          .then(post => {
            commit('setThread', {threadId, thread:  {...thread, firstPostId: post['.key']}})
          })
        resolve(state.threads[threadId])
      })

    },
    updateThread ({state, commit, dispatch }, {text, title, id}) {
        return new Promise (resolve => {
          const thread = state.threads[id]

          const newThread = {...thread, title}

          dispatch('updatePost', {id: thread.firstPostId, text: text})
            .then(()=> {
              resolve(newThread)
            })
          commit('setThread', ({thread: newThread, threadId: id}))

          resolve(newThread)
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
