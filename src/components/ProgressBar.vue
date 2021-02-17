<template>
  <div :style="{ width: '0%' }" class="progress-bar progress-bar--hidden"></div>
</template>

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
