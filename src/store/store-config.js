import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  item: null,
  items: [],
  comments: {},
  user: null
};

export default {
  state,
  getters,
  actions,
  mutations
};
