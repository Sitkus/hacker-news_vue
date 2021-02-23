<template>
  <div>Yo</div>
</template>

<script>
export default {
  props: {
    injectedMethod: {
      type: Function
    }
  },
  beforeMount() {
    this.injectedMethod(this.$route.path);
  }
};
</script>

<style></style>
