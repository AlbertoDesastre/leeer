import { vi } from "vitest";

import LoginPage from "../../../../src/modules/auth/pages/LoginPage.vue";
import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";

// mock the vue router to check redirections
const mockRouter = { push: vi.fn(), replace: vi.fn(), go: vi.fn() };
const mockRoute = { name: "" };
vi.mock("vue-router", () => ({
  useRouter: () => mockRouter,
  useRoute: () => mockRoute,
}));
// mock useAuth()
const mockUseAuth = { login: vi.fn(), register: vi.fn(), error: vi.fn() };
vi.mock("../../../../src/modules/auth/composables/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

describe("<LoginPage/>", () => {
  const validEmail = "myemail@gmail.com";
  const validPassword = "mysupEr_password!";

  test("should show and hide error messages after triggering blurr when input is invalid", async () => {
    const wrapper = mount(LoginPage);

    // obtain the EMAIL input, place invalid data and blur
    const email = wrapper.find("input[placeholder='Introduce tu email']");
    await email.setValue("ifgewiogbew");
    await email.trigger("blur");

    // an error should appear after blur
    let emailError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "Introduce un email válido");
    expect(emailError?.exists()).toBeTruthy();
    expect(emailError?.text()).toBe("Introduce un email válido");

    // now correct data is placed
    await email.setValue(validEmail);
    await email.trigger("blur");

    // the error should appear no more
    emailError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "Introduce un email válido");
    expect(emailError?.exists()).toBeFalsy();

    // obtain the PASSWORD input, place invalid data and blur
    const password = wrapper.find("input[placeholder='Introduce tu contraseña']");
    await password.trigger("click");
    await password.trigger("blur");

    // an error should appear after blur
    let passwordError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "La contraseña es obligatoria");
    expect(passwordError?.exists()).toBeTruthy();
    expect(passwordError?.text()).toBe("La contraseña es obligatoria");

    // now correct data is placed
    await password.setValue(validPassword);
    await password.trigger("blur");

    // the error should appear no more
    passwordError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "La contraseña es obligatoria");
    expect(passwordError?.exists()).toBeFalsy();
  });

  test("should call redirect to home after making a succesful login", async () => {
    // TODO: Mockear el valor retornado de "login" para que sea un poco más realista el test
    const wrapper = mount(LoginPage);
    const email = wrapper.find("input[placeholder='Introduce tu email']");
    const password = wrapper.find("input[placeholder='Introduce tu contraseña']");
    const submit = wrapper
      .findAll("span.n-button__content")
      .find((span) => span.text() === "Iniciar sesión") as DOMWrapper<Element>;

    email.setValue(validEmail);
    password.setValue(validPassword);
    submit.trigger("click");
    await flushPromises(); // this line resolves all promises immediately. This is good since I depend on "login", which has a fetch, to end it's promises

    expect(submit.exists()).toBeTruthy();
    expect(mockUseAuth.login).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledWith({ name: "home" });
  });

  test("should do a redirection to another page if Login was succesful", () => {
    return true;
  });
});
