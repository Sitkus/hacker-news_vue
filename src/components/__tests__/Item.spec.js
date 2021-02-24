import { shallowMount } from '@vue/test-utils';
import { Item } from '../';

describe('Item.vue', () => {
  test('render a URL, an author and a score from item prop', () => {
    const item = {
      url: 'https://google.com',
      by: 'Bill',
      score: 20
    };

    const wrapper = shallowMount(Item, {
      propsData: { item }
    });

    expect(wrapper.text()).toContain(item.url);
    expect(wrapper.text()).toContain(item.by);
    expect(wrapper.text()).toContain(item.score);
  });

  test('render a link to the item.url with item.title as text', () => {
    const item = {
      url: 'https://google.com',
      title: 'some title'
    };

    const wrapper = shallowMount(Item, {
      propsData: { item }
    });

    const link = wrapper.find('a');
    const h2 = wrapper.find('h2');

    expect(link.attributes().href).toBe(item.url);
    expect(h2.text()).toBe(item.title);
  });

  test('renders the time since the last post', () => {
    const dateNow = jest.spyOn(Date, 'now');
    const dateNowTime = new Date('2020');

    dateNow.mockImplementation(() => dateNowTime);

    const item = {
      time: dateNowTime / 1000 - 600
    };
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    });

    dateNow.mockRestore();

    expect(wrapper.text()).toContain('10 minutes ago');
  });
});
