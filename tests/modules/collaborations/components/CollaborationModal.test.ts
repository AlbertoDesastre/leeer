import { mockRouter, mockRoute } from "../../../__mocks__/auth"; // aunque no se usa se importe para que no tire error en la suite de test

import { createPinia, setActivePinia } from "pinia";
import { DOMWrapper, mount, type VueWrapper } from "@vue/test-utils";
import CollaborationModal from "../../../../src/modules/collaborations/components/CollaborationModal.vue";

describe("<CollaborationModal/>", () => {
  let wrapper: VueWrapper;
  let error: DOMWrapper<Element>;

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = mount(CollaborationModal, {
      props: { onToggleModal: () => {} },
      global: { stubs: ["RouterLink"] },
    });
    error = wrapper.find("div.error-alert");

    vi.clearAllMocks();
  });

  test("shouldn't display error interface if no error is present", () => {
    expect(error.exists()).toBeFalsy();
  });
});
