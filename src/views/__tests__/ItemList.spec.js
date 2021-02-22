import { shallowMount, createLocalVue } from '@vue/test-utils';
import mergeWith from 'lodash.mergewith';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import ItemList from '../ItemList.vue';
import { Item } from '@/components';

const localVue = createLocalVue();
localVue.use(Vuex);

function customizer(objValue, srcValue) {
  if (Array.isArray(srcValue)) {
    return srcValue;
  }

  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue;
  }
}

function createStore(overrides) {
  const defaultStoreConfig = {
    getters: {
      displayItems: jest.fn()
    },
    actions: {
      fetchItems: jest.fn(() => Promise.resolve())
    }
  };

  return new Vuex.Store(mergeWith(defaultStoreConfig, overrides, customizer));
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    mocks: {
      $bar: {
        start: jest.fn(),
        finish: jest.fn(),
        fail: jest.fn()
      },
      $route: {
        params: {
          type: 'top'
        }
      }
    },
    localVue,
    store: createStore()
  };

  return shallowMount(ItemList, mergeWith(defaultMountingOptions, overrides, customizer));
}

describe('ItemList.vue', () => {
  test('renders an Item with data for each item in displayItems', () => {
    const items = [{}, {}, {}];
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    });

    const wrapper = createWrapper({ store });
    const Items = wrapper.findAllComponents(Item);

    expect(Items).toHaveLength(items.length);

    Items.wrappers.forEach((wrapper, index) => {
      expect(wrapper.vm.item).toBe(items[index]);
    });
  });

  test('calls $bar start on load', () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    };

    createWrapper({ mocks });

    expect(mocks.$bar.start).toHaveBeenCalled();
  });

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1);

    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    };

    createWrapper({ mocks });

    await flushPromises();

    expect(mocks.$bar.finish).toHaveBeenCalled();
  });

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1);

    const store = createStore({
      actions: {
        fetchItems: jest.fn(() => Promise.reject())
      }
    });
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    };

    createWrapper({ mocks, store });

    await flushPromises();

    expect(mocks.$bar.fail).toHaveBeenCalled();
  });

  test('dispatches fetchItems with $route.params.type', async () => {
    expect.assertions(1);

    const store = createStore();
    const type = 'some type';
    const mocks = {
      $route: {
        params: {
          type
        }
      }
    };

    store.dispatch = jest.fn(() => Promise.resolve());

    createWrapper({ store, mocks });

    expect(store.dispatch).toHaveBeenCalledWith('fetchItems', {
      type
    });
  });

  test('renders 1/5 when on page 1 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    });

    const wrapper = createWrapper({ store });

    expect(wrapper.text()).toContain('1/5');
  });

  test('renders 2/5 when on page 2 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    });
    const mocks = {
      $route: {
        params: {
          page: 2
        }
      }
    };

    const wrapper = createWrapper({ store, mocks });

    expect(wrapper.text()).toContain('2/5');
  });

  test('calls $router.replace when the page parameter is greater than the max page count', async () => {
    expect.assertions(1);

    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    });
    const mocks = {
      $route: {
        params: {
          page: '1000'
        }
      },
      $router: {
        replace: jest.fn()
      }
    };

    createWrapper({ store, mocks });

    await flushPromises();

    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1');
  });
});
