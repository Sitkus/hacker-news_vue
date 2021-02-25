import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { Item } from '../';
import merge from 'lodash.merge';

function createWrapper(overrides) {
  const defaultMountingOptions = {
    stubs: {
      routerLink: RouterLinkStub
    },
    propsData: {
      item: {}
    }
  };
  return shallowMount(Item, merge(defaultMountingOptions, overrides));
}

describe('Item.vue', () => {
  test('renders the hostname', () => {
    const item = {
      url: 'https://some-url.com/with-paths/multiple'
    };

    const wrapper = createWrapper({
      propsData: {
        item
      }
    });

    expect(wrapper.text()).toContain('(some-url.com)');
  });

  test('renders an item.by from item prop', () => {
    const item = {
      by: 'some author'
    };

    const wrapper = createWrapper({
      propsData: {
        item
      }
    });

    expect(wrapper.text()).toContain(item.by);
  });

  test('renders item.score from item prop', () => {
    const item = {
      score: 10
    };

    const wrapper = createWrapper({
      propsData: {
        item
      }
    });

    expect(wrapper.text()).toContain(item.score);
  });

  test('render a link to the item.url with item.title as text', () => {
    const item = {
      url: 'https://google.com',
      title: 'some title'
    };

    const wrapper = createWrapper({
      propsData: {
        item
      }
    });

    const a = wrapper.find('a');

    expect(a.text()).toContain(item.title);
    expect(a.attributes().href).toBe(item.url);
  });

  test('renders the time since the last post', () => {
    const dateNow = jest.spyOn(Date, 'now');
    const dateNowTime = new Date('2020');

    dateNow.mockImplementation(() => dateNowTime);

    const item = {
      time: dateNowTime / 1000 - 600
    };
    const wrapper = createWrapper({
      propsData: {
        item
      }
    });

    dateNow.mockRestore();

    expect(wrapper.text()).toContain('10 minutes ago');
  });
});
