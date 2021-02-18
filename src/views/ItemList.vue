<template>
  <ul class="item-list">
    <Item v-for="item in displayItems" :key="item.id" :item="item" />
  </ul>
</template>

<script>
import { Item } from '@/components';
// import api from '../api/api';

export default {
  name: 'ItemList',
  components: {
    Item
  },
  data() {
    return {
      displayItems: window.items
    };
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
