export const titleMixin = {
  mounted() {
    const title = getTitle(this);

    if (title) {
      document.title = `Hacker News | ${title}`;
    }
  }
};

function getTitle(vm) {
  const { title } = vm.$options;

  if (title) {
    return typeof title === 'function' ? title.call(vm) : title;
  }
}
