<template>
  <ul class="item-list">
    <Item v-for="item in $store.getters.displayItems" :key="item.id" :item="item" />

    <nav v-if="$store.getters.maxPage" class="bot-nav">
      <router-link
        class="item-list__link"
        v-if="$route.params.page > 1"
        :to="`/${$route.params.type}/${$route.params.page - 1}`"
      >
        &lt; prev
      </router-link>
      <a class="item-list__link item-list__link--disabled" v-else>&lt; prev</a>

      <p class="item-list__page">{{ $route.params.page || 1 }}/{{ $store.getters.maxPage }}</p>

      <router-link
        class="item-list__link"
        v-if="($route.params.page || 1) < $store.getters.maxPage"
        :to="`/${$route.params.type}/${(Number($route.params.page) || 1) + 1}`"
      >
        next &gt;
      </router-link>
      <a class="item-list__link item-list__link--disabled" v-else>next &gt;</a>
    </nav>
  </ul>
</template>

<script>
import { Item } from '@/components';

export default {
  name: 'ItemList',
  components: {
    Item
  },
  methods: {
    loadItems() {
      this.$bar.start();
      this.$store
        .dispatch('fetchItems', {
          type: this.$route.params.type
        })
        .then(() => {
          this.$bar.finish();

          if (this.$route.params.page > this.$store.getters.maxPage) {
            this.$router.replace(`/${this.$route.params.type}/1`);
          } else if (this.$route.params.page < 1) {
            this.$router.replace(`/${this.$route.params.type}/1`);
          } else if (!/^\d+$/.test(this.$route.params.page)) {
            this.$router.replace(`/${this.$route.params.type}/1`);
          }
        })
        .catch(() => this.$bar.fail());
    }
  },
  beforeMount() {
    this.loadItems();
  }
};
</script>

<style scoped lang="scss">
.item-list {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  background-color: $pale-yellow;
  min-height: 50rem;

  &__page {
    //
  }

  .bot-nav {
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem 0.5rem 1.5rem;
  }

  &__link--disabled {
    user-select: none;
    color: #ccc;
    cursor: not-allowed;
  }
}
</style>
