import { shallowMount } from '@vue/test-utils';
import ProgressBar from '../ProgressBar.vue';

describe('ProgressBar.vue', () => {
  test('ProgressBar should be hidden by default', () => {
    const wrapper = shallowMount(ProgressBar);

    expect(wrapper.classes()).toContain('progress-bar--hidden');
  });

  test('ProgressBar should initialize with 0% width', () => {
    const wrapper = shallowMount(ProgressBar);

    expect(wrapper.element.style.width).toBe('0%');
  });
});
