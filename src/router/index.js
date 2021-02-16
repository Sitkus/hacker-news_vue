import Vue from 'vue';
import VueRouter from 'vue-router';
import ItemsList from '../views/ItemsList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ItemsList',
    component: ItemsList
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
