import { shallowMount } from '@vue/test-utils';
import TestComponent from '../TestComponent.vue';

describe('TestComponent.vue', () => {
  test('calls injectedMethod with correct $route.path parameter', () => {
    const wrapper = shallowMount(TestComponent, {
      propsData: {
        injectedMethod: jest.fn()
      },
      mocks: {
        $route: {
          path: '/top/'
        }
      }
    });

    expect(wrapper.vm.injectedMethod).toHaveBeenCalledWith('/top/');
  });
});
