<template>
  <li>
    {{ item.url }}
    {{ item.author }}
    {{ item.score }}
    <a :href="item.url">{{ item.title }}</a>
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
