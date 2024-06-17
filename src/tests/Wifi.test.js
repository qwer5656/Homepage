import { mount } from '@vue/test-utils';
import Wifi from '@/components/Wifi.vue'; // Update with your component path
import axios from 'axios';

// Mocking Axios
vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe('Wifi', () => {
  it('fetches data on mount', async () => {
    // Mock the Axios response
 //   const mockData = { data: { message: 'success' } };
 //   axios.get.mockResolvedValue(mockData);

  //  const wrapper = mount(Wifi);

    // Wait for any pending promises to resolve
   // await wrapper.vm.$nextTick();

    // Assert that Axios was called correctly
    //expect(axios.get).toHaveBeenCalledWith('https://api.example.com/data');

    // Assert the component's state
   // expect(wrapper.vm.data).toBe(mockData.data);
  });
});