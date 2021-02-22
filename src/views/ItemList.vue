<template>
  <ul class="item-list">
    <Item v-for="item in $store.getters.displayItems" :key="item.id" :item="item" />
    <p v-if="$store.getters.maxPage" class="item-list__page">
      {{ $route.params.page || 1 }}/{{ $store.getters.maxPage }}
    </p>
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
  background-color: $pale-yellow;
  padding: 1rem 0;
  min-height: 50rem;
}
</style>
