import { mockRouter, mockUseAuth, mockSetUser, mockCleanUser, mockError } from "../../../__mocks__/auth";

import { vi } from "vitest";
import { DOMWrapper, flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import RegisterPage from "../../../../src/modules/auth/pages/RegisterPage.vue";
import { useUserStore } from "../../../../src/modules/auth/store/user.store";

describe("<RegisterPage/>", () => {
  const validNickname = "user123";
  const validDescription = "Soy un escritor con muchas ideas";
  const validEmail = "user@mail.com";
  const validPassword = "strongPassword1";

  let wrapper: VueWrapper;
  let nickname: DOMWrapper<Element>;
  let description: DOMWrapper<Element>;
  let email: DOMWrapper<Element>;
  let password: DOMWrapper<Element>;
  let passwordRepeat: DOMWrapper<Element>;
  let submit: DOMWrapper<Element>;
  let error: DOMWrapper<Element>;

  const fillForm = async () => {
    await nickname.setValue(validNickname);
    await description.setValue(validDescription);
    await email.setValue(validEmail);
    await password.setValue(validPassword);
    await passwordRepeat.setValue(validPassword);
  };

  const submitForm = async () => {
    await submit.trigger("click");
    await flushPromises();
  };

  beforeEach(() => {
    // This must be made in every component Pinia is being used or an error will be throw
    setActivePinia(createPinia());

    const userStore = useUserStore();
    userStore.setUser = mockSetUser;
    userStore.cleanUser = mockCleanUser;

    wrapper = mount(RegisterPage, {
      global: {
        stubs: ["RouterLink"],
      },
    });

    nickname = wrapper.find("input[placeholder='Introduce tu nickname']");
    description = wrapper.find("textarea");
    email = wrapper.find("input[placeholder='Introduce tu email']");
    password = wrapper.find("input[placeholder='Introduce tu contrase\u00f1a']");
    passwordRepeat = wrapper.find("input[placeholder='Repite tu contrase\u00f1a']");
    submit = wrapper.find("span.n-button__content");
    error = wrapper.find(".error-tab");

    vi.clearAllMocks();
  });

  test("should show errors and then hide them after correcting inputs", async () => {
    await nickname.trigger("blur");
    await email.setValue("bademail");
    await email.trigger("blur");
    await password.trigger("blur");
    await passwordRepeat.setValue("no-match");
    await passwordRepeat.trigger("blur");

    const errors = wrapper.findAll("div.n-form-item-feedback__line");
    expect(errors.length).toBeGreaterThan(0);

    await fillForm();
    await nickname.trigger("blur");
    await email.trigger("blur");
    await password.trigger("blur");
    await passwordRepeat.trigger("blur");

    const remainingErrors = wrapper.findAll("div.n-form-item-feedback__line");
    expect(remainingErrors.length).toBe(0);
  });

  test("should save user information on localStorage after successful register", async () => {
    // setup
    const mockedUserData = { email: "newuser@mail.com", token: "validtoken123" };
    mockUseAuth.register.mockResolvedValueOnce(mockedUserData);

    await fillForm();
    await submitForm();

    // register assertions
    expect(mockUseAuth.register).toBeCalledTimes(1);

    // store assertions
    expect(mockSetUser).toBeCalledTimes(1);
    expect(mockSetUser).toBeCalledWith(mockedUserData);

    // redirection
    expect(mockRouter.push).toBeCalledWith({ name: "home" });

    // user should not be cleaned
    expect(mockCleanUser).not.toBeCalled();
  });

  test("should not save user and clean store if register fails", async () => {
    mockUseAuth.register.mockImplementationOnce(() => {
      mockError.value = {
        message: "Ese email ya está en uso.",
        error: "Conflict",
        statusCode: 409,
      };
      return null;
    });

    await fillForm();
    await submitForm();

    // error re-render
    error = wrapper.find(".error-tab");

    // assertions
    expect(mockUseAuth.register).toBeCalledTimes(1);
    expect(error.exists()).toBeTruthy();
    expect(error.text()).toContain("Ese email ya está en uso.");

    // no redirection or saving here
    expect(mockSetUser).not.toBeCalled();
    expect(mockRouter.push).not.toBeCalled();

    // user gets clean
    expect(mockCleanUser).toBeCalledTimes(1);
  });

  test("should show loader while submitting", async () => {
    mockUseAuth.isLoading.value = true;
    await fillForm();
    await submit.trigger("click");

    let loading = wrapper.find(".loading");
    expect(loading.exists()).toBeTruthy();
    expect(loading.text()).toContain("CARGANDO");

    mockUseAuth.isLoading.value = false;
    mockUseAuth.register.mockReturnValueOnce({ email: "email@mail.com", token: "21512521" });
    await wrapper.vm.$nextTick(); // is not enough to change the value of a ref, it must be re-rendered in the component to reflect the new state. vm.$nextTick() does that
    loading = wrapper.find("p.loading"); // and to search *again* for the element
    expect(loading.exists()).toBeFalsy();
  });
});
