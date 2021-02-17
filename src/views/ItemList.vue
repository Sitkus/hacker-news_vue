<template>
  <ul>
    <Item v-for="item in displayItems" :key="item.id" :item="item" />
  </ul>
</template>

<script>
import Item from '@/components/Item.vue';
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
