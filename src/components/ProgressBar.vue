<template>
  <div
    :style="{ width: `${percentage}%` }"
    class="progress-bar"
    :class="{ 'progress-bar--hidden': hidden, 'progress-bar--error': error }"
  ></div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {
      hidden: true,
      percentage: 0,
      error: false
    };
  },
  methods: {
    start() {
      this.percentage = 0;
      this.hidden = false;
      this.error = false;

      this.timer = setInterval(() => {
        this.percentage++;
      }, 100);
    },
    finish() {
      this.percentage = 100;
      this.hidden = true;

      clearInterval(this.timer);
    },
    fail() {
      this.percentage = 100;
      this.error = true;

      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped lang="scss">
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: $orange;
  height: 0.5rem;

  &--hidden {
    visibility: hidden;
  }

  &--error {
    background-color: red;
  }
}
</style>
