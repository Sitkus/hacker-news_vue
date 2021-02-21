import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import ItemList from '../ItemList.vue';
import { Item } from '@/components';

const localVue = createLocalVue();
localVue.use(Vuex);

let storeOptions = null;
let store = null;

beforeEach(() => {
  storeOptions = {
    getters: {
      displayItems: jest.fn()
    },
    actions: {
      fetchItems: jest.fn(() => Promise.resolve())
    }
  };

  store = new Vuex.Store(storeOptions);
});

describe('ItemList.vue', () => {
  test('renders an Item with data for each item in displayItems', () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    };

    const items = [{}, {}, {}];
    storeOptions.getters.displayItems.mockReturnValue(items);

    const wrapper = shallowMount(ItemList, {
      mocks: { $bar },
      localVue,
      store
    });

    const Items = wrapper.findAllComponents(Item);
    expect(Items).toHaveLength(items.length);

    Items.wrappers.forEach((wrapper, index) => {
      expect(wrapper.vm.item).toBe(items[index]);
    });
  });

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    };

    shallowMount(ItemList, {
      mocks: { $bar },
      localVue,
      store
    });

    expect($bar.start).toHaveBeenCalled();
  });

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1);

    const $bar = {
      start: jest.fn(),
      finish: jest.fn()
    };

    shallowMount(ItemList, {
      mocks: { $bar },
      localVue,
      store
    });

    await flushPromises();

    expect($bar.finish).toHaveBeenCalled();
  });

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1);

    const $bar = {
      start: jest.fn(),
      fail: jest.fn()
    };

    storeOptions.actions.fetchItems.mockRejectedValueOnce();

    shallowMount(ItemList, {
      mocks: { $bar },
      localVue,
      store
    });

    await flushPromises();

    expect($bar.fail).toHaveBeenCalled();
  });

  test('dispatches fetchItems with top', async () => {
    expect.assertions(1);

    const $bar = {
      start: () => {},
      finish: () => {}
    };

    store.dispatch = jest.fn(() => Promise.resolve());

    shallowMount(ItemList, {
      mocks: { $bar },
      localVue,
      store
    });

    expect(store.dispatch).toHaveBeenCalledWith('fetchItems', {
      type: 'top'
    });
  });
});
