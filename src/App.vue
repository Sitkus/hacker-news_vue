<template>
  <div id="app">
    <ItemList />
    <router-view />
  </div>
</template>

<script>
import ItemList from '@/views/ItemList.vue';

export default {
  name: 'App',
  components: {
    ItemList
  }
};
</script>

<style lang="scss">
//
</style>
