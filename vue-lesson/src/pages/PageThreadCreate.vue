<template>
  <div class="col-full push-top">

    <h1>Create new thread in <i>{{forum.name}}</i></h1>

    <ThreadEditor @save="save"
                  @cancel="cancel"
    />
  </div>
</template>

<script>
  import ThreadEditor from "../components/ThreadEditor";

  export default {
    name: 'PageThreadCreate',
    components: {ThreadEditor},
    props: {
      forumId: {
        type: String,
        required: true
      }
    },
    computed: {
      forum() {
        return this.$store.state.forums[this.forumId]
      }
    },
    methods: {
      save: function ({title, text}) {
        this.$store.dispatch('createThread', {
          forumId: this.forum['.key'],
          title,
          text
        }).then(thred => {
          this.$router.push({name: 'ThreadShow', params: {id: thred['.key']}})
        })

      },
      cancel: function () {
        this.$router.push({name: 'Forum', params: {id: this.forum['.key']}})
      }
    }
  }
</script>
