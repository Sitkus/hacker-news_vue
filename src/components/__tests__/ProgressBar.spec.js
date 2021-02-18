import { shallowMount } from '@vue/test-utils';
import ProgressBar from '../ProgressBar.vue';

describe('ProgressBar.vue', () => {
  test('displays the bar when start is called', async () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain('progress-bar--hidden');

    await wrapper.vm.start();

    expect(wrapper.classes()).not.toContain('progress-bar--hidden');
  });

  test('initialize the bar with 0% width', () => {
    const wrapper = shallowMount(ProgressBar);

    expect(wrapper.element.style.width).toBe('0%');
  });

  test('sets the bar to 100% width when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar);

    await wrapper.vm.start();
    await wrapper.vm.finish();

    expect(wrapper.element.style.width).toBe('100%');
  });

  test('hides the bar when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar);

    await wrapper.vm.start();
    await wrapper.vm.finish();

    expect(wrapper.classes()).toContain('progress-bar--hidden');
  });

  test('resets to 0% width when start is called', async () => {
    const wrapper = shallowMount(ProgressBar);

    await wrapper.vm.start();
    await wrapper.vm.finish();
    await wrapper.vm.start();

    expect(wrapper.element.style.width).toBe('0%');
  });
});
