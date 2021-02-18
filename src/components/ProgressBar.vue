<template>
  <div :style="{ width: `${percentage}%` }" class="progress-bar" :class="{ 'progress-bar--hidden': hidden }"></div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {
      hidden: true,
      percentage: 0
    };
  },
  methods: {
    start() {
      this.percentage = 0;
      this.hidden = false;
    },
    finish() {
      this.percentage = 100;
      this.hidden = true;
    }
  }
};
</script>

<style scoped lang="scss">
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  background-color: $orange;
  height: 0.5rem;

  &--hidden {
    // visibility: hidden;
  }
}
</style>
