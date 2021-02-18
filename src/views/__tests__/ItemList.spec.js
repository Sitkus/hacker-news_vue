import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import { fetchListData } from '@/api/api';
import ItemList from '../ItemList.vue';
import { Item } from '@/components';

jest.mock('@/api/api.js');

describe('ItemList.vue', () => {
  test('renders an Item with data for each item', async () => {
    expect.assertions(4);

    const $bar = {
      start: () => {},
      finish: () => {}
    };

    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    fetchListData.mockResolvedValueOnce(items);

    const wrapper = shallowMount(ItemList, { mocks: { $bar } });

    await flushPromises();

    const Items = wrapper.findAllComponents(Item);
    expect(Items).toHaveLength(items.length);

    Items.wrappers.forEach((wrapper, index) => {
      expect(wrapper.vm.item).toBe(items[index]);
    });
  });

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1);

    const $bar = {
      start: () => {},
      finish: jest.fn()
    };

    shallowMount(ItemList, {
      mocks: { $bar }
    });

    await flushPromises();

    expect($bar.finish).toHaveBeenCalled();
  });

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1);

    const $bar = {
      start: () => {},
      fail: jest.fn()
    };

    fetchListData.mockRejectedValueOnce();
    shallowMount(ItemList, {
      mocks: { $bar }
    });

    await flushPromises();

    expect($bar.fail).toHaveBeenCalled();
  });
});
