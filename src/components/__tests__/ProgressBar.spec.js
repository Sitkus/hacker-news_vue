import { shallowMount } from '@vue/test-utils';
import { ProgressBar } from '../';

let wrapper = null;

beforeEach(() => {
  jest.useFakeTimers();

  wrapper = shallowMount(ProgressBar);
});

afterEach(() => {
  wrapper.destroy();
});

describe('ProgressBar.vue', () => {
  test('displays the bar when start is called', async () => {
    expect.assertions(2);

    expect(wrapper.classes()).toContain('progress-bar--hidden');

    await wrapper.vm.start();

    expect(wrapper.classes()).not.toContain('progress-bar--hidden');
  });

  test('deletes error class when the bar start is called', async () => {
    expect.assertions(2);

    await wrapper.vm.start();
    await wrapper.vm.fail();

    expect(wrapper.classes()).toContain('progress-bar--error');

    await wrapper.vm.start();

    expect(wrapper.classes()).not.toContain('progress-bar--error');
  });

  test('initialize the bar with 0% width', () => {
    expect(wrapper.element.style.width).toBe('0%');
  });

  test('sets the bar to 100% width when finish is called', async () => {
    expect.assertions(1);

    await wrapper.vm.start();
    await wrapper.vm.finish();

    expect(wrapper.element.style.width).toBe('100%');
  });

  test('hides the bar when finish is called', async () => {
    expect.assertions(1);

    await wrapper.vm.start();
    await wrapper.vm.finish();

    expect(wrapper.classes()).toContain('progress-bar--hidden');
  });

  test('resets to 0% width when start is called', async () => {
    expect.assertions(1);

    await wrapper.vm.start();
    await wrapper.vm.finish();
    await wrapper.vm.start();

    expect(wrapper.element.style.width).toBe('0%');
  });

  test('increases width by 1% every 100ms after start call', async () => {
    expect.assertions(3);

    await wrapper.vm.start();

    await jest.runTimersToTime(100);
    expect(wrapper.element.style.width).toBe('1%');

    await jest.runTimersToTime(900);
    expect(wrapper.element.style.width).toBe('10%');

    await jest.runTimersToTime(4000);
    expect(wrapper.element.style.width).toBe('50%');
  });

  test('clears timer when finish is called', async () => {
    expect.assertions(1);

    jest.spyOn(window, 'clearInterval');
    setInterval.mockReturnValue(123);

    await wrapper.vm.start();
    await wrapper.vm.finish();

    expect(window.clearInterval).toHaveBeenCalledWith(123);
  });

  test('adds error class after fail function is called', async () => {
    expect.assertions(1);

    await wrapper.vm.fail();

    expect(wrapper.classes()).toContain('progress-bar--error');
  });

  test('sets the bar to width 100% when fail is called', async () => {
    expect.assertions(1);

    await wrapper.vm.start();
    await wrapper.vm.fail();

    expect(wrapper.element.style.width).toBe('100%');
  });
});
