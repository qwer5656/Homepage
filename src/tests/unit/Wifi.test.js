import { mount } from "@vue/test-utils";
import Wifi from "@/components/Wifi.vue";
import vuetify from "@/plugins/vuetify";

describe("Wifi", () => {
  it("renders properly", () => {
    const wrapper = mount(Wifi, {
      global: {
        plugins: [vuetify],
       
      },

    });
    expect(wrapper.text()).toContain("E-FANerxxxx-xxxxxWif");
  });
});
