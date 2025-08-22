import { mockRoute, mockRouter, mockUseCollaborations } from "../../../__mocks__/collaborations";

import { createPinia, setActivePinia } from "pinia";
import { DOMWrapper, flushPromises, mount, type VueWrapper } from "@vue/test-utils";

import CollaborationModal from "../../../../src/modules/collaborations/components/CollaborationModal.vue";

describe("<CollaborationModal/>", () => {
  // setup
  let wrapper: VueWrapper;
  let error: DOMWrapper<Element>;
  let submit: DOMWrapper<HTMLButtonElement>;
  let radioButtons: DOMWrapper<Element>[];

  // helper functions
  const isValuePicked = (buttons: DOMWrapper<Element>[]): boolean => {
    buttons.map((button) => console.log(button.element.nodeValue));

    return true;
  };

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = mount(CollaborationModal, {
      props: { onToggleModal: () => {} },
      global: { stubs: ["RouterLink"] },
    });

    error = wrapper.find("div.error-alert");
    submit = wrapper.find("button.submit");
    radioButtons = wrapper.findAll("input[type=radio");

    vi.clearAllMocks();
  });

  // TEST TODO:
  // ✔️ ⭕
  // ✔️ El botón de enviar debería estar deshabilitado si no se escogió ninguna opción en el form
  // ⭕ El botón de enviar debería estar deshabilitado si se acaba de enviar una petición
  // ⭕ Ninguna alerta (ni de error ni de éxito) debe renderizar si no hubo ni error ni éxito
  // ⭕ La alerta de error debe contener el mensaje de error enviado por el composable, no otro
  // ⭕ handleSubmit debe mandar un error si por algún motivo no se escogió colaboración
  // ⭕ Debería llamarse handleSubmit sin problema is el botón está habilitado y se hizo click en el. Además, debe tener los argumentos correctos.
  // ⭕ El modal debe cerrarse solo después de un tiempo
  // TDD NUEVO: Que no se puedan enviar más solicitudes a la creation si ya le has enviado una previamente, independientemente de su estado de aprobación

  test("should have submit disabled if no collaboration was picked", async () => {
    //at first render nothing is picked
    radioButtons.forEach((button) => {
      expect(button.element.nodeValue).toBe(null);
    });
    expect(submit.element.disabled).toBe(true);

    // user picks an option
    await radioButtons[0].setValue(); // CAREFUL!! for RADIO BUTTONS to register as selected you can't use "triggle('click')"
    await wrapper.vm.$nextTick();

    expect(submit.element.disabled).toBe(false);
  });

  test("should have submit disabled right after sending a collaboration", async () => {
    mockUseCollaborations.sendCollaboration.mockResolvedValueOnce(true);

    await radioButtons[0].setValue();
    expect(submit.element.disabled).toBe(false);

    await submit.trigger("click");
    await flushPromises();

    expect(mockUseCollaborations.success.value).toBe(true);
  });
});
