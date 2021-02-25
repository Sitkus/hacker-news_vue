<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view__header">
        <a :href="item.url" target="_blank">
          <h1>{{ item.title }}</h1>
        </a>

        <span v-if="item.url" class="item-view__host"> ({{ item.url | host }}) </span>

        <p class="item-view__meta">
          {{ item.score }} points | by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
          {{ item.time | timeAgo }} ago
        </p>
      </div>

      <div class="comments">
        <p class="comments__header">
          {{ item.kids ? item.descendants + ' comments' : 'No comments yet.' }}
          <Spinner v-if="loading && item.kids"></Spinner>
        </p>

        <ul v-if="!loading" class="comments__children">
          <Comment v-for="id in item.kids" :key="id" :id="id"></Comment>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { Spinner, Comment } from '../components';

export default {
  name: 'ItemView',
  components: {
    Spinner,
    Comment
  },
  data: () => ({
    loading: true
  }),
  computed: {
    item() {
      return this.$store.state.item;
    }
  },
  title() {
    return 'Item';
  },
  beforeMount() {
    this.$store.dispatch('fetchItem', { id: this.$route.params.id });
  },
  watch: {
    item: 'fetchComments'
  },
  methods: {
    fetchComments(item) {
      this.$store.dispatch('fetchComments', { item }).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.item-view {
  &__header {
    padding: 1.8em 2em 1em;

    h1 {
      display: inline;
      font-size: 1.5em;
      margin: 0;
      margin-right: 0.5em;
    }
  }

  &__host,
  &__meta,
  &__meta a {
    color: #828282;
  }

  &__meta a {
    text-decoration: underline;
  }
}

.comments {
  margin-top: 10px;
  padding: 0 2em 0.5em;

  &__header {
    margin: 0;
    font-size: 1.1em;
    padding: 1em 0;
    position: relative;

    & .spinner {
      display: inline-block;
      margin: -15px 0;
    }
  }

  &__children {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

@media (max-width: 600px) {
  .iteam-view__header h1 {
    font-size: 1.25em;
  }
}
</style>
