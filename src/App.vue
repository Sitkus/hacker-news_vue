<template>
  <div id="app">
    <ItemsList />
    <router-view />
  </div>
</template>

<script>
import ItemsList from '@/views/ItemsList.vue';

export default {
  name: 'App',
  components: {
    ItemsList
  }
};
</script>

<style lang="scss">
//
</style>
