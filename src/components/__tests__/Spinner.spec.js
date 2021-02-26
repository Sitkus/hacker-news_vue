import { shallowMount } from '@vue/test-utils';
import { Spinner } from '../';

describe('Spinner.vue snapshots', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Spinner);

    expect(wrapper.element).toMatchSnapshot();
  });
});
