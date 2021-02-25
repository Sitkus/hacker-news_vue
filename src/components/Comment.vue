<template>
  <li v-if="comment" class="comment">
    <div class="comment__by">
      <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
      {{ comment.time | timeAgo }} ago
    </div>

    <div class="comment__text" v-html="comment.text"></div>
    <div class="comment__toggle" :class="{ open }" v-if="comment.kids && comment.kids.length">
      <a @click="open = !open">{{ open ? '[-]' : `[+] ${pluralize(comment.kids.length)} collapsed` }}</a>
    </div>

    <ul class="comment__children" v-show="open">
      <Comment v-for="id in comment.kids" :key="id" :id="id"></Comment>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Comment',
  props: ['id'],
  data() {
    return {
      open: true
    };
  },
  computed: {
    comment() {
      return this.$store.state.comments[this.id];
    }
  },
  methods: {
    pluralize: (num) => num + (num === 1 ? ' reply' : ' replies')
  }
};
</script>

<style scoped lang="scss">
.comment {
  border-top: 1px solid #eee;
  position: relative;

  &__by,
  &__text,
  &__toggle {
    font-size: 0.9em;
    margin: 1em 0;
  }

  &__by {
    color: #828282;

    a {
      color: #828282;
      text-decoration: underline;
    }
  }

  &__text {
    overflow-wrap: break-word;

    a:hover {
      color: #f60;
    }

    pre {
      white-space: pre-wrap;
    }
  }

  &__toggle {
    background-color: #fffbf2;
    padding: 0.3em 0.5em;
    border-radius: 4px;

    a {
      color: #828282;
      cursor: pointer;
    }

    &.open {
      padding: 0;
      background-color: transparent;
      margin-bottom: -0.5em;
    }
  }

  &__children {
    margin-left: 1.5em;
  }
}
</style>
