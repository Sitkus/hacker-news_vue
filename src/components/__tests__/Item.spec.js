import { shallowMount } from '@vue/test-utils';
import Item from '../Item.vue';

describe('Item.vue', () => {
  test('render a URL, an author and a score from item prop', () => {
    const item = {
      url: 'https://google.com',
      author: 'Bill',
      score: 20
    };

    const wrapper = shallowMount(Item, {
      propsData: { item }
    });

    expect(wrapper.text()).toContain(item.url);
    expect(wrapper.text()).toContain(item.author);
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

    expect(link.text()).toBe(item.title);
    expect(link.attributes().href).toBe(item.url);
  });
});
