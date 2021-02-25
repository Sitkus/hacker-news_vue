<template>
  <div class="user-view">
    <template v-if="user">
      <h1>User : {{ user.id }}</h1>

      <ul class="user-view__meta">
        <li><span class="user-view__label">Created:</span> {{ user.created | timeAgo }} ago</li>
        <li><span class="user-view__label">Karma:</span> {{ user.karma }}</li>
        <li v-if="user.about" v-html="user.about" class="user-view__about"></li>
      </ul>

      <p class="user-view__links">
        <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a> |
        <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
      </p>
    </template>

    <template v-else-if="user === false">
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  beforeCreate() {
    const id = this.$route.params.id;
    return this.$store.dispatch('fetchUser', { id });
  },
  title() {
    return this.$route.params.id;
  }
};
</script>

<style scoped lang="scss">
.user-view {
  box-sizing: border-box;
  padding: 2em 3em;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }

  &__meta {
    list-style-type: none;
    padding: 0;
  }

  &__label {
    display: inline-block;
    min-width: 4em;
  }

  &__about {
    margin: 1em 0;
  }

  &__links a {
    text-decoration: underline;
  }
}
</style>
