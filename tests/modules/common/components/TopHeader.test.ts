import { mount } from "@vue/test-utils";

import TopHeader from "../../../../src/modules/common/components/TopHeader.vue";
import { useRoute } from "vue-router";

const mockRouter = { push: vi.fn() };
let mockRoute = { name: "desk" };

// What I'm doing here is mocking the entire MODULE (or file) and saying "the exported members called 'useRouter' and 'useRoute' are going to be THIS INSTEAD"
vi.mock("vue-router", () => ({
  useRouter: () => mockRouter, // useRouter will be invoked and replaced by the testing framework (vitest in this case) and be replaced by a function that RETURNS mockrouter (a function)
  useRoute: () => mockRoute, // the same here, useRoute will be invoked and be replaced by a function that returns and object with a property 'name' and value "desk"
}));
// explanation on how I know how mocking works: https://vitest.dev/api/vi.html#vi-mock

describe("<TopHeader/>", () => {
  test("should hide search input if user is in the route 'desk'", () => {
    const wrapper = mount(TopHeader);

    expect(wrapper.find("nav.dropdown-wrapper").exists()).toBeFalsy();
    expect(useRoute().name).toBe(mockRoute.name);
  });

  test("should show explorer search if user is in any other route", async () => {
    let otherRoute = "other-page";
    mockRoute.name = otherRoute;
    // careful!! I have to mount the component AFTER changing the route name since once it mount's it will pick up the one that was instanciated before.
    const wrapper = mount(TopHeader);

    await new Promise((r) => setTimeout(r, 200));
    expect(useRoute().name).toBe(otherRoute);
    expect(wrapper.find("nav.dropdown-wrapper").exists()).toBeTruthy();
  });
});
