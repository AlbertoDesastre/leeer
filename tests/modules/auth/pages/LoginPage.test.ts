import { mockRouter, mockUseAuth, mockSetUser, mockCleanUser, mockError } from "../../../__mocks__/auth";

import { vi } from "vitest";
import { DOMWrapper, flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

import LoginPage from "../../../../src/modules/auth/pages/LoginPage.vue";
import { useUserStore } from "../../../../src/modules/auth/store/user.store";

describe("<LoginPage/>", () => {
  const validEmail = "myemail@gmail.com";
  const validPassword = "mysupEr_password!";
  let wrapper: VueWrapper;
  let email: DOMWrapper<Element>;
  let password: DOMWrapper<Element>;
  let submit: DOMWrapper<Element>;
  let error: DOMWrapper<Element>;

  // Helpers functions
  const fillForm = async (email: DOMWrapper<Element>, password: DOMWrapper<Element>) => {
    await email.setValue(validEmail);
    await password.setValue(validPassword);
  };
  const submitForm = async () => {
    await submit.trigger("click");
    await flushPromises(); // this line resolves all promises immediately. This is good since I depend on "login", which has a fetch, to end it's promises
  };

  // mounts and searchs for all relevant DOM Elements
  beforeEach(() => {
    // This must be made in every component Pinia is being used or an error will be throw
    setActivePinia(createPinia());

    const userStore = useUserStore();
    userStore.setUser = mockSetUser;
    userStore.cleanUser = mockCleanUser;

    wrapper = mount(LoginPage, {
      global: {
        stubs: ["RouterLink"],
      },
    });

    email = wrapper.find("input[placeholder='Introduce tu email']");
    password = wrapper.find("input[placeholder='Introduce tu contraseña']");
    submit = wrapper
      .findAll("span.n-button__content")
      .find((span) => span.text() === "Iniciar sesión") as DOMWrapper<Element>;
    error = wrapper.find("div.n-alert-body__content");

    vi.clearAllMocks();
  });

  test("should show and hide error messages after triggering blurr when input is invalid", async () => {
    await email.setValue("bademail");
    await email.trigger("blur");
    await password.trigger("blur");

    const errors = wrapper.findAll("div.n-form-item-feedback__line");
    expect(errors.length).toBeGreaterThan(0);

    await fillForm(email, password);
    await email.trigger("blur");
    await password.trigger("blur");

    const remainingErrors = wrapper.findAll("div.n-form-item-feedback__line");
    expect(remainingErrors.length).toBe(0);
  });

  test("should call redirect to home after making a succesful login", async () => {
    await fillForm(email, password);
    await submitForm();

    expect(submit.exists()).toBeTruthy();
    expect(mockUseAuth.login).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledWith({ name: "home" });
  });

  test("should save user information on localStorage after successful login", async () => {
    // setup
    const mockedUserData = { email: "validemail@mail.com", token: "supertoken" };
    mockUseAuth.login.mockResolvedValueOnce(mockedUserData);

    // action
    await fillForm(email, password);
    await submitForm();

    // login assert
    expect(mockUseAuth.login).toBeCalledWith({ email: validEmail, password: validPassword });
    expect(mockUseAuth.login).toBeCalledTimes(1);
    // user store assert
    expect(mockSetUser).toBeCalledTimes(1);
    expect(mockSetUser).toBeCalledWith(mockedUserData);
    // redirection
    expect(mockRouter.push).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledWith({ name: "home" });
    // after all succesful operations user should not be cleaned
    expect(mockCleanUser).not.toBeCalled();
  });

  test("should not save user information or redirect if login failed", async () => {
    mockUseAuth.login.mockImplementationOnce(() => {
      mockError.value = {
        message: "El email enviado es incorrecto. Verifique que el correo está bien.",
        error: "Unauthorized",
        statusCode: 401,
      };
      return null;
    });
    await fillForm(email, password);
    await submitForm();

    // error instance is not the same anymore after re-rendering the wrapper so it has to be found again
    error = wrapper.find("div.n-alert-body__content");

    // assert: login was tried and error exists
    expect(mockUseAuth.login).toBeCalledTimes(1);
    expect(error?.exists()).toBeTruthy();
    expect(error?.text()).toContain(
      "El email enviado es incorrecto. Verifique que el correo está bien."
    );

    // assert: no redirection or user information was saved
    expect(mockSetUser).not.toBeCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();

    // assert: user cleanse was done
    expect(mockCleanUser).toBeCalledTimes(1);
  });

  test("should show a loader when 'login' is performing an action", async () => {
    await fillForm(email, password);
    mockUseAuth.isLoading.value = true;
    await submit.trigger("click");
    let loading = wrapper.find("p.loading");

    expect(loading?.exists()).toBeTruthy();
    expect(loading?.text()).toContain("CARGANDO");

    mockUseAuth.isLoading.value = false;
    await wrapper.vm.$nextTick(); // is not enough to change the value of a ref, it must be re-rendered in the component to reflect the new state. vm.$nextTick() does that
    loading = wrapper.find("p.loading"); // and to search *again* for the element
    expect(loading?.exists()).toBeFalsy();
  });
});
