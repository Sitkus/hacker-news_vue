<template>
  <li class="item">
    <a :href="item.url" class="item__link">
      <h2 class="item__title">
        {{ item.title }}
      </h2>
      <span class="item__title-url">
        {{ item.url }}
      </span>
    </a>
    <p class="item__meta-data">{{ metaData }}</p>
  </li>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {
      metaData: `${this.item.score} points by ${this.item.author}`
    };
  },
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
  margin-bottom: 0.5rem;
  padding: 0.5rem 1.5rem;

  &__link {
    //
  }

  &__title {
    font-weight: 500;
    font-size: 1.6rem;
  }

  &__title-url {
    //
  }

  &__meta-data {
    color: grey;
    font-size: 1.2rem;
  }
}
</style>
