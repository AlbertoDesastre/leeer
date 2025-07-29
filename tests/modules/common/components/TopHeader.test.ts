import { mockRoute } from "../../../__mocks__/auth";

import { mount, VueWrapper } from "@vue/test-utils";

import TopHeader from "../../../../src/modules/common/components/TopHeader.vue";
import { useRoute } from "vue-router";

describe("<TopHeader/>", () => {
  let wrapper: VueWrapper;
  mockRoute.name = "desk";

  beforeEach(() => {
    wrapper = mount(TopHeader, {
      global: {
        stubs: ["RouterLink"],
      },
    });
  });

  test("should hide search input if user is in the route 'desk'", () => {
    expect(wrapper.find("nav.dropdown-wrapper").exists()).toBeFalsy();
    expect(useRoute().name).toBe(mockRoute.name);
  });

  test("should show explorer search if user is in any other route", async () => {
    let otherRoute = "other-page";
    mockRoute.name = otherRoute;
    // careful!! I have to mount the component AFTER changing the route name since once it mount's it will pick up the one that was instanciated before.
    wrapper = mount(TopHeader, {
      global: {
        stubs: ["RouterLink"],
      },
    });

    await new Promise((r) => setTimeout(r, 200));
    expect(useRoute().name).toBe(otherRoute);
    expect(wrapper.find("nav.dropdown-wrapper").exists()).toBeTruthy();
  });
});
