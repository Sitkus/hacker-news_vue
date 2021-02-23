import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import routerConfig from './router/router-config';
import storeConfig from './store/store-config';
import { ProgressBar } from '@/components';

Vue.use(Vuex);
Vuex.use(Router);

const router = new Router(routerConfig);
const store = new Vuex.Store(storeConfig);

sync(store, router);

Vue.config.productionTip = false;

const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount());
document.body.appendChild(bar.$el);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
