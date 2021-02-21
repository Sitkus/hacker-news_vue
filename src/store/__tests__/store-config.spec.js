import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import cloneDeep from 'lodash.clonedeep';
import flushPromises from 'flush-promises';
import storeConfig from '../store-config';
import { fetchListData } from '@/api/api';

jest.mock('../../api/api');

const localVue = createLocalVue();
localVue.use(Vuex);

function createItems() {
  const array = Array(22)
    .fill()
    .map((item, index) => ({ id: `a${index}`, name: 'item' }));

  return array;
}

describe('store-config', () => {
  test('dispatching fetchListData updates displayItems getter', async () => {
    expect.assertions(1);

    const items = createItems();

    const clonedStoreConfig = cloneDeep(storeConfig);
    const store = new Vuex.Store(clonedStoreConfig);
    const type = 'top';

    fetchListData.mockImplementation((calledType) => {
      return calledType === type ? Promise.resolve(items) : Promise.resolve();
    });

    store.dispatch('fetchItems', { type });

    await flushPromises();

    expect(store.getters.displayItems).toEqual(items.slice(0, 20));
  });
});
