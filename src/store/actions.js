import { fetchListData } from '@/api/api';

export default {
  fetchItems({ commit }, { type }) {
    return fetchListData(type).then((items) => commit('setItems', { items }));
  }
};
