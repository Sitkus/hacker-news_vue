<template>
  <div id="app">
    <main class="main">
      <header class="header">
        <router-link class="header__title-link" to="/top">
          <h1 class="header__title">
            Hacker News
          </h1>
        </router-link>

        <nav class="nav">
          <router-link class="nav__link" to="/top">top</router-link> |
          <router-link class="nav__link" to="/new">new</router-link> |
          <router-link class="nav__link" to="/show">show</router-link> |
          <router-link class="nav__link" to="/ask">ask</router-link> |
          <router-link class="nav__link" to="/job">job</router-link>
        </nav>
      </header>
      <router-view :key="$route.params.type" />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
.main {
  max-width: 100rem;
  width: 90%;
  margin: 5rem auto;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: $orange;
  padding: 0.5rem 1.5rem;

  &__title {
    margin-right: 1rem;
    font-size: 1.8rem;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }
}

.nav {
  &__link:hover {
    color: white;
  }
}

.nav__link.router-link-active {
  color: white;
}
</style>
