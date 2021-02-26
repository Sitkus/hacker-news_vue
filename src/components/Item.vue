<template>
  <li class="item">
    <h2 class="item__title">
      <a :href="item.url" target="_blank" rel="noopener" class="item__link">
        {{ item.title }}
        <span class="item__title-url"> ({{ item.url | host }}) </span>
      </a>
    </h2>

    <div class="meta">
      <span class="meta__score">{{ item.score }}</span>
      <span v-if="item.type !== 'job'" class="meta__by">
        by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
      </span>
      <span v-if="item.type !== 'job'" class="meta__comments-link">
        | <router-link :to="'/item/' + item.id">{{ item.descendants }} comments</router-link>
      </span>
      <span> {{ item.time | timeAgo }} ago </span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;

  &__title {
    font-weight: 500;
    font-size: 1.6rem;
  }

  &__title-url {
    color: grey;
    font-size: 1.4rem;
    font-weight: 400;
  }
}

.meta {
  color: grey;
  font-size: 1.2rem;
}
</style>
