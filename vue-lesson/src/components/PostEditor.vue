<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="text"></textarea></div>
    <div class="form-actions">
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Post submit'}}</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'PostEditor',
    props: {
      threadId: {
        require: false
      },
      post: {
        type: Object,
        validate: obj => {
          const keyIsValid = typeof obj['.key'] instanceof 'string'
          const textIsValid = typeof obj.text instanceof 'string'
          const valid = keyIsValid && textIsValid

          if (!keyIsValid) {
            console.error('the post object must need `key`  attribute')
          }
          if (!textIsValid) {
            console.error('the post object must need `text` attribute')
          }
          return valid
        }
      }
    },
    data() {
      return {
        text: this.post ? this.post.text : ''
      }
    },
    computed: {
      isUpdate() {
        return !!this.post
      }
    },
    methods: {
      save() {
        this.persist()
          .then(post => {
            this.$emit('save', {post})
          })
      },
      persist() {
        return (this.isUpdate ? this.update() : this.create())
      },
      create() {
        const post = {
          text: this.text,
          publishedAt: Math.floor(Date.now() / 1000),
          threadId: this.threadId,
          userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
        }

        this.text = ''
        return this.$store.dispatch('createPost', post)
      },
      update() {
        const payload = {
          id: this.post['.key'],
          text: this.text
        }
        return this.$store.dispatch('updatePost', payload)
      },
      cancel() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
