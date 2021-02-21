<template>
  <ul class="item-list">
    <Item v-for="item in $store.getters.displayItems" :key="item.id" :item="item" />
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
          type: 'top'
        })
        .then((items) => {
          this.displayItems = items;
          this.$bar.finish();
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
  max-width: 80rem;
  width: 90%;
  margin: 4rem auto;
}
</style>
