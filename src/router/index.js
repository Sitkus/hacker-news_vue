import Vue from 'vue';
import VueRouter from 'vue-router';
import ItemList from '../views/ItemList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:type(top|new|show|ask|job)/:page?',
    component: ItemList
  },
  {
    path: '/',
    redirect: '/top'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
